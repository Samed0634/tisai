
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ActionHistory } from "@/types/actionHistory";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useActivityHistory = () => {
  const [activities, setActivities] = useState<ActionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

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
        navigate("/login");
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
        navigate("/login");
        setLoading(false);
        return;
      }
      
      // Get the user's kurum_id
      const { data: userData, error: userError } = await supabase
        .from('kullanici_kurumlar')
        .select('kurum_id')
        .eq('user_id', sessionData.session.user.id)
        .maybeSingle();
        
      if (userError) {
        console.error('Error getting user kurum_id:', userError);
        toast({
          title: "Kurum Bilgisi Hatası",
          description: "Kurum bilgisi alınamadı.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      const kurum_id = userData?.kurum_id;
      if (!kurum_id) {
        console.error("No kurum_id found for user");
        toast({
          title: "Kurum Bilgisi Bulunamadı",
          description: "Kullanıcı için kurum bilgisi bulunamadı.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      let query = supabase
        .from('İşlem Geçmişi')
        .select('*')
        .order('id', { ascending: false });
        
      // If we have a kurum_id, filter by it
      if (kurum_id) {
        query = query.eq('kurum_id', kurum_id);
      }
      
      const { data, error } = await query;

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
  }, [toast, navigate]);

  const refreshActivities = useCallback(() => {
    fetchActivities();
  }, [fetchActivities]);

  useEffect(() => {
    fetchActivities();

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
