
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useActionHistory = () => {
  const logAction = useCallback(async (actionName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('İşlem Geçmişi')
        .insert({
          "İşlem Adı": actionName,
          "İşlem Yapan Kullanıcı": user.email
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
