
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { formatInTimeZone } from 'date-fns-tz';

export const useActionHistory = () => {
  const logAction = useCallback(async (actionName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const now = new Date();
      const turkishDate = formatInTimeZone(now, 'Europe/Istanbul', 'yyyy-MM-dd');
      const turkishTime = formatInTimeZone(now, 'Europe/Istanbul', 'HH:mm:ss');

      console.log("Logging action:", {
        action: actionName,
        user: user?.email || 'Sistem',
        date: turkishDate,
        time: turkishTime
      });

      // Get the current user's kurum_id
      const { data: userData, error: userError } = await supabase
        .from('kullanici_kurumlar')
        .select('kurum_id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (userError) {
        console.error('Error getting user kurum_id:', userError);
        throw userError;
      }

      const kurum_id = userData?.kurum_id || null;

      // Log action to İşlem Geçmişi table
      const { error } = await supabase
        .from('İşlem Geçmişi')
        .insert({
          "İşlem Adı": actionName,
          "İşlem Yapan Kullanıcı": user?.email || 'Sistem',
          "Tarih": turkishDate,
          "Saat": turkishTime,
          kurum_id: kurum_id
        });

      if (error) {
        console.error('Error logging action:', error);
        throw error;
      }
      
      console.log("Action logged successfully");
    } catch (error) {
      console.error('Error logging action:', error);
      toast({
        title: "Hata",
        description: "İşlem kaydı oluşturulurken bir hata oluştu.",
        variant: "destructive"
      });
    }
  }, []);

  return { logAction };
};
