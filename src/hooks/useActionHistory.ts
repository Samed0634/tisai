
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { formatInTimeZone } from 'date-fns-tz';

export const useActionHistory = () => {
  const logAction = useCallback(async (actionName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const now = new Date();
      const turkishDate = formatInTimeZone(now, 'Europe/Istanbul', 'yyyy-MM-dd');
      const turkishTime = formatInTimeZone(now, 'Europe/Istanbul', 'HH:mm:ss');

      const { error } = await supabase
        .from('İşlem Geçmişi')
        .insert({
          "İşlem Adı": actionName,
          "İşlem Yapan Kullanıcı": user.email,
          "Tarih": turkishDate,
          "Saat": turkishTime
        });

      if (error) throw error;
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
