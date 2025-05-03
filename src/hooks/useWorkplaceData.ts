
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
      const { data, error } = await supabase
        .from('isyerleri')
        .select('*');
      
      if (error) {
        console.error("Error fetching workplaces:", error);
        throw error;
      }
      
      console.log(`Fetched ${data?.length || 0} workplaces`);
      return data as Workplace[];
    }
  });

  const updateWorkplace = useMutation({
    mutationFn: async (workplace: Workplace) => {
      console.log("Updating workplace:", workplace);
      
      // Get kurum_id from the user's session
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get the user's kurum_id from kullanici_kurumlar
      const { data: userData, error: userError } = await supabase
        .from('kullanici_kurumlar')
        .select('kurum_id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (userError) {
        console.error("Error fetching kurum_id:", userError);
        throw userError;
      }

      const kurum_id = userData?.kurum_id;
      
      // Check if the workplace exists first
      const { data: existingWorkplace, error: checkError } = await supabase
        .from('isyerleri')
        .select('ID')
        .eq('ID', workplace.ID)
        .maybeSingle();
        
      console.log("Check if workplace exists:", existingWorkplace, checkError);
      
      if (checkError) throw checkError;
      
      let result;
      
      // Add kurum_id to the workplace object
      const workplaceWithKurumId = {
        ...workplace,
        kurum_id
      };
      
      if (existingWorkplace) {
        // Update existing workplace
        const { data, error } = await supabase
          .from('isyerleri')
          .update(workplaceWithKurumId)
          .eq('ID', workplace.ID)
          .select();
        
        if (error) throw error;
        result = data;
        
        await logAction(`"${workplace["İŞYERİ ADI"]}" işyeri bilgileri güncellendi.`);
      } else {
        // Insert new workplace
        const { data, error } = await supabase
          .from('isyerleri')
          .insert(workplaceWithKurumId)
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
