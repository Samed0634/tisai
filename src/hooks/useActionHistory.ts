
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { format } from 'date-fns';

export const useActionHistory = () => {
  const logAction = useCallback(async (actionName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No authenticated user found");
        return;
      }
      
      // Get the current date and time in Turkish timezone format
      const now = new Date();
      const turkishDate = format(now, 'yyyy-MM-dd');
      const turkishTime = format(now, 'HH:mm:ss');

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
        .eq('user_id', user.id)
        .maybeSingle();

      if (userError) {
        console.error('Error getting user kurum_id:', userError);
        throw userError;
      }

      const kurum_id = userData?.kurum_id;
      if (!kurum_id) {
        console.error("No kurum_id found for user");
        toast({
          title: "Hata",
          description: "Kullanıcı için kurum bilgisi bulunamadı.",
          variant: "destructive"
        });
        return;
      }

      // Format the action name to remove any kurum_id mentions
      let formattedActionName = actionName;
      if (formattedActionName.includes("kurum_id")) {
        // Replace the entire segment containing kurum_id information
        formattedActionName = formattedActionName.replace(/\s*"kurum_id".*?(?=\s*\w+|$)/g, '');
      }

      // Log action to İşlem Geçmişi table
      const { error } = await supabase
        .from('İşlem Geçmişi')
        .insert({
          "İşlem Adı": formattedActionName,
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
