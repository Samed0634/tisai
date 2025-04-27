
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Workplace } from "@/types/workplace";
import { useToast } from "@/hooks/use-toast";

export const useWorkplaceData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      
      // Check if the workplace exists first
      const { data: existingWorkplace, error: checkError } = await supabase
        .from('isyerleri')
        .select('ID')
        .eq('ID', workplace.ID)
        .maybeSingle();
        
      console.log("Check if workplace exists:", existingWorkplace, checkError);
      
      if (checkError) throw checkError;
      
      if (existingWorkplace) {
        // Update existing workplace
        const { error } = await supabase
          .from('isyerleri')
          .update(workplace)
          .eq('ID', workplace.ID);
        
        if (error) throw error;
      } else {
        // Insert new workplace
        const { error } = await supabase
          .from('isyerleri')
          .insert(workplace);
        
        if (error) throw error;
      }
      
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
