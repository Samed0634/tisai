
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Workplace } from "@/types/workplace";
import { useToast } from "@/hooks/use-toast";
import { useActionHistory } from "@/hooks/useActionHistory";

export const useWorkplaceData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { logAction } = useActionHistory();

  const { data: workplaces, isLoading, refetch } = useQuery({
    queryKey: ['workplaces'],
    queryFn: async () => {
      console.log("Fetching all workplaces data");
      
      // Ensure we have the latest session
      await supabase.auth.refreshSession();
      
      const { data, error } = await supabase
        .from('isyerleri')
        .select('*');
      
      if (error) {
        console.error("Error fetching workplaces:", error);
        throw error;
      }
      
      console.log(`Fetched ${data?.length || 0} workplaces`);
      return data as Workplace[];
    },
    // Refresh automatically every minute
    refetchInterval: 60000,
  });

  const updateWorkplace = useMutation({
    mutationFn: async (workplace: Workplace) => {
      console.log("Updating workplace:", workplace);
      
      // Check if the workplace exists first
      const { data: existingWorkplace, error: checkError } = await supabase
        .from('isyerleri')
        .select('ID, kurum_id')
        .eq('ID', workplace.ID)
        .maybeSingle();
        
      console.log("Check if workplace exists:", existingWorkplace, checkError);
      
      if (checkError) throw checkError;
      
      // Fetch a default kurum_id if needed
      let kurum_id = existingWorkplace?.kurum_id;
      if (!kurum_id) {
        const { data: kurumData } = await supabase
          .from('kurumlar')
          .select('id')
          .limit(1)
          .single();
        
        kurum_id = kurumData?.id || '00000000-0000-0000-0000-000000000000'; // Default UUID
      }
      
      // Add kurum_id to the data being saved
      const dataToSave = { ...workplace, kurum_id };
      
      let result;
      
      if (existingWorkplace) {
        // Update existing workplace
        const { data, error } = await supabase
          .from('isyerleri')
          .update(dataToSave)
          .eq('ID', workplace.ID)
          .select();
        
        if (error) throw error;
        result = data;
        
        await logAction(`"${workplace["İŞYERİ ADI"]}" işyeri bilgileri güncellendi.`);
      } else {
        // Insert new workplace
        const { data, error } = await supabase
          .from('isyerleri')
          .insert(dataToSave)
          .select();
        
        if (error) throw error;
        result = data;
        
        await logAction(`"${workplace["İŞYERİ ADI"]}" adlı yeni işyeri kaydı oluşturuldu.`);
      }
      
      console.log("Operation result:", result);
      return workplace;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workplaces'] });
      toast({
        title: "Başarılı",
        description: "Kayıt güncellendi.",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Kayıt güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
      console.error("Update error:", error);
    }
  });

  return {
    workplaces,
    isLoading,
    updateWorkplace: updateWorkplace.mutate,
    refetch
  };
};
