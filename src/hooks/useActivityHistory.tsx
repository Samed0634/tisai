
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ActionHistory } from "@/types/actionHistory";
import { useToast } from "@/hooks/use-toast";

export const useActivityHistory = () => {
  const [activities, setActivities] = useState<ActionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        toast({
          title: "Oturum Hatası",
          description: "Oturum bilgileri alınamadı. Lütfen tekrar giriş yapın.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      if (!sessionData.session) {
        console.error('No active session found. User might not be authenticated.');
        toast({
          title: "Oturum Bulunamadı",
          description: "Aktif bir oturum bulunamadı. Lütfen giriş yapın.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Force refresh connection with Supabase by explicitly setting the auth headers
      const { data, error } = await supabase
        .from('İşlem Geçmişi')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching activities:', error);
        toast({
          title: "Veri Hatası",
          description: "İşlem geçmişi verileri yüklenirken bir hata oluştu: " + error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      console.log('Fetched activities data:', data);
      setActivities(data || []);
    } catch (error) {
      console.error('Error in fetchActivities:', error);
      toast({
        title: "Hata",
        description: "İşlem geçmişi yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const refreshActivities = useCallback(() => {
    fetchActivities();
  }, [fetchActivities]);

  useEffect(() => {
    // Initialize fetch on component mount
    fetchActivities();

    // Set up realtime subscription to immediately reflect changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'İşlem Geçmişi'
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchActivities();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchActivities]);

  return { activities, loading, refreshActivities };
};
