
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
          .update({
            "İŞYERİ TÜRÜ": workplace["İŞYERİ TÜRÜ"],
            "SORUMLU UZMAN": workplace["SORUMLU UZMAN"],
            "İŞYERİNİN BULUNDUĞU İL": workplace["İŞYERİNİN BULUNDUĞU İL"],
            "BAĞLI OLDUĞU ŞUBE": workplace["BAĞLI OLDUĞU ŞUBE"],
            "İŞYERİ ADI": workplace["İŞYERİ ADI"],
            "SGK NO": workplace["SGK NO"],
            "İŞÇİ SAYISI": workplace["İŞÇİ SAYISI"],
            "ÜYE SAYISI": workplace["ÜYE SAYISI"],
            "İŞVEREN SENDİKASI": workplace["İŞVEREN SENDİKASI"],
            "GREV YASAĞI DURUMU": workplace["GREV YASAĞI DURUMU"],
            "İHALE ADI": workplace["İHALE ADI"],
            "İHALE BAŞLANGIÇ TARİHİ": workplace["İHALE BAŞLANGIÇ TARİHİ"],
            "İHALE BİTİŞ TARİHİ": workplace["İHALE BİTİŞ TARİHİ"],
            "YETKİ TESPİT İSTEM TARİHİ": workplace["YETKİ TESPİT İSTEM TARİHİ"],
            "YETKİ BELGESİ TEBLİĞ TARİHİ": workplace["YETKİ BELGESİ TEBLİĞ TARİHİ"],
            "ÇAĞRI TARİHİ": workplace["ÇAĞRI TARİHİ"],
            "YER VE GÜN TESPİT TARİHİ": workplace["YER VE GÜN TESPİT TARİHİ"],
            "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": workplace["ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"],
            "İLK OTURUM TARİHİ": workplace["İLK OTURUM TARİHİ"],
            "MÜZAKERE SÜRESİ SON TARİH": workplace["MÜZAKERE SÜRESİ SON TARİH"],
            "UYUŞMAZLIK TARİHİ": workplace["UYUŞMAZLIK TARİHİ"],
            "ARABULUCU RAPORU TEBLİĞ TARİHİ": workplace["ARABULUCU RAPORU TEBLİĞ TARİHİ"],
            "GREV KARARI TARİHİ": workplace["GREV KARARI TARİHİ"],
            "FİİLİ GREV KARARI TARİHİ": workplace["FİİLİ GREV KARARI TARİHİ"],
            "GREV OYLAMASI TARİHİ": workplace["GREV OYLAMASI TARİHİ"],
            "YHK GÖNDERİM TARİHİ": workplace["YHK GÖNDERİM TARİHİ"],
            "TİS GELİŞ TARİHİ": workplace["TİS GELİŞ TARİHİ"],
            "TİS İMZA TARİHİ": workplace["TİS İMZA TARİHİ"],
            "TİS BAŞLANGIÇ TARİHİ": workplace["TİS BAŞLANGIÇ TARİHİ"],
            "TİS BİTİŞ TARİHİ": workplace["TİS BİTİŞ TARİHİ"]
          })
          .eq('ID', workplace.ID);
        
        if (error) throw error;
        
        await logAction(`"${workplace["İŞYERİ ADI"]}" işyeri bilgileri güncellendi.`);
      } else {
        // Insert new workplace
        const { error } = await supabase
          .from('isyerleri')
          .insert(workplace);
        
        if (error) throw error;
        
        await logAction(`"${workplace["İŞYERİ ADI"]}" adlı yeni işyeri kaydı oluşturuldu.`);
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
