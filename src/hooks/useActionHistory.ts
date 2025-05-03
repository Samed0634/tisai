
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { formatInTimeZone } from 'date-fns-tz';

export const useActionHistory = () => {
  const logAction = useCallback(async (actionName: string) => {
    try {
      // Get the latest user session
      const { data: { user } } = await supabase.auth.getUser();
      
      const now = new Date();
      const turkishDate = formatInTimeZone(now, 'Europe/Istanbul', 'yyyy-MM-dd');
      const turkishTime = formatInTimeZone(now, 'Europe/Istanbul', 'HH:mm:ss');

      // Fetch a default kurum_id if needed - this is a placeholder approach
      // In a real application, you might want to store the kurum_id in session/context
      const { data: kurumData, error: kurumError } = await supabase
        .from('kurumlar')
        .select('id')
        .limit(1)
        .single();
      
      if (kurumError && kurumError.code !== 'PGRST116') {
        console.error('Error fetching kurum_id:', kurumError);
        throw kurumError;
      }

      const kurum_id = kurumData?.id || '00000000-0000-0000-0000-000000000000'; // Default UUID

      // Log action to İşlem Geçmişi table
      const { error } = await supabase
        .from('İşlem Geçmişi')
        .insert({
          "İşlem Adı": actionName,
          "İşlem Yapan Kullanıcı": user?.email || 'Sistem',
          "Tarih": turkishDate,
          "Saat": turkishTime,
          "kurum_id": kurum_id
        });

      if (error) {
        console.error('Error logging action:', error);
        throw error;
      }
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
