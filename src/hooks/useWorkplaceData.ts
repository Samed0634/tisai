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
      console.log("Updating workplace in isyerleri table:", workplace);
      
      const { data: existingWorkplace, error: checkError } = await supabase
        .from('isyerleri')
        .select('ID')
        .eq('ID', workplace.ID)
        .maybeSingle();
        
      if (checkError) throw checkError;
      
      if (existingWorkplace) {
        const { data, error } = await supabase
          .from('isyerleri')
          .update(workplace)
          .eq('ID', workplace.ID)
          .select();
        
        if (error) throw error;
        
        // Log the action
        await logAction(`"${workplace["İŞYERİ ADI"]}" işyeri bilgileri güncellendi.`);
        
        return data;
      } else {
        throw new Error("Workplace not found");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workplaces'] });
      toast({
        title: "Başarılı",
        description: "İşyeri bilgileri güncellendi.",
      });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast({
        title: "Hata",
        description: "İşyeri bilgileri güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  });

  return {
    workplaces,
    isLoading,
    updateWorkplace: updateWorkplace.mutate,
    refetch
  };
};
