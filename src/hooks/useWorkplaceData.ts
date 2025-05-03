
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
      console.log("Fetching workplaces data");
      
      // First get the current user's session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw sessionError;
      }
      
      if (!sessionData.session) {
        console.error("No active session found");
        throw new Error("No active session");
      }
      
      // Get the user's kurum_id
      const { data: userData, error: userError } = await supabase
        .from('kullanici_kurumlar')
        .select('kurum_id')
        .eq('user_id', sessionData.session.user.id)
        .single();
      
      if (userError) {
        console.error("Error fetching user institution:", userError);
        throw userError;
      }
      
      if (!userData?.kurum_id) {
        console.error("No kurum_id found for user");
        throw new Error("No institution found for user");
      }
      
      // Now fetch the workplaces for this kurum_id
      const { data, error } = await supabase
        .from('isyerleri')
        .select('*')
        .eq('kurum_id', userData.kurum_id);
      
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
      
      // Get the user's kurum_id to include it in the update
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        throw new Error("No active session");
      }
      
      const { data: userData, error: userError } = await supabase
        .from('kullanici_kurumlar')
        .select('kurum_id')
        .eq('user_id', sessionData.session.user.id)
        .single();
      
      if (userError || !userData) {
        throw new Error("Couldn't fetch user institution data");
      }
      
      // Add kurum_id to the workplace object
      const workplaceWithKurumId = {
        ...workplace,
        kurum_id: userData.kurum_id
      };
      
      // Check if the workplace exists first
      const { data: existingWorkplace, error: checkError } = await supabase
        .from('isyerleri')
        .select('ID')
        .eq('ID', workplace.ID)
        .eq('kurum_id', userData.kurum_id)
        .maybeSingle();
        
      console.log("Check if workplace exists:", existingWorkplace, checkError);
      
      if (checkError) throw checkError;
      
      let result;
      
      if (existingWorkplace) {
        // Update existing workplace
        const { data, error } = await supabase
          .from('isyerleri')
          .update(workplaceWithKurumId)
          .eq('ID', workplace.ID)
          .eq('kurum_id', userData.kurum_id)
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
