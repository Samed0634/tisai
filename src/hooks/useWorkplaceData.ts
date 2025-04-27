
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
      const { data, error } = await supabase
        .from('isyerleri')
        .select('*');
      
      if (error) throw error;
      return data as Workplace[];
    }
  });

  const updateWorkplace = useMutation({
    mutationFn: async (workplace: Workplace) => {
      const { error } = await supabase
        .from('isyerleri')
        .update(workplace)
        .eq('ID', workplace.ID);
      
      if (error) throw error;
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
