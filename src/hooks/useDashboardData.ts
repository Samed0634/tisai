
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const fetchDashboardData = async () => {
  try {
    // Define all view names to fetch data from
    const viewNames = [
      'grev_kararı_alınması_gereken_view',
      'grev_oylaması_yapılması_gereken_view',
      'grev_yasağı_olan_view',
      'çağrı_yapılacak_view',
      'yetki_tespit_istenecek_view',
      'yetki_belgesi_tebliğ_yapılan_view',
      'yer_ve_gün_tespit_tarihli_view',
      'önceden_belirlenen_ilk_oturum_view',
      'ilk_oturum_tutulması_gereken_view',
      'müzakere_süresi_dolan_view',
      'uyuşmazlık_bildirimi_yapılması_gereken_view',
      'yhk_gönderim_gereken_view',
      'imzalanan_tisler_view'
    ];

    // Create an object to store all fetched data
    const result: Record<string, any[]> = {};
    
    // Fetch data from all views in parallel
    const fetchPromises = viewNames.map(async (viewName) => {
      const { data, error } = await supabase
        .from(viewName)
        .select('*');
        
      if (error) {
        console.error(`Error fetching ${viewName}:`, error);
        throw new Error(`${viewName} verisi alınırken hata: ${error.message}`);
      }
      
      return { viewName, data: data || [] };
    });
    
    // Wait for all fetches to complete
    const responses = await Promise.all(fetchPromises);
    
    // Process all responses into the result object
    responses.forEach(({ viewName, data }) => {
      result[viewName] = data;
    });

    console.log("Dashboard data loaded:", Object.keys(result));
    return result;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const useDashboardData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
    retry: 2,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Veri Yükleme Hatası",
          description: "Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
          variant: "destructive",
        });
      }
    }
  });
};
