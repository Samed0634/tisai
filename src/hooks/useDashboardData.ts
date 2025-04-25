
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const fetchDashboardData = async () => {
  try {
    // Fetch data from Supabase views
    const { data: grevKarariData, error: grevKarariError } = await supabase
      .from('grev_kararı_alınması_gereken_view')
      .select('*');

    if (grevKarariError) {
      throw new Error(`Error fetching grev karari data: ${grevKarariError.message}`);
    }

    // Continue with existing API for other data
    const response = await fetch('https://primary-production-dcf9.up.railway.app/webhook/terminsorgu');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const apiData = await response.json();
    
    // Transform the response into the expected format for dashboard cards
    const transformedData = {
      cagriYapilacakListesi: apiData.çağrı_yapılacak_view || [],
      yetkiTespitIstenenListesi: [],
      yetkiBelgesiTebligYapilanListesi: [],
      yerVeGunTespitListesi: [],
      oncedenBelirlenenIlkOturumListesi: [],
      ilkOturumGerekenListesi: [],
      muzakereSuresiDolanListesi: [],
      uyusmazlikGerekenListesi: [],
      grevKarariAlinmasiGerekenListesi: grevKarariData || [],
      grevOylamasiYapilmasiGerekenListesi: [],
      yhkGonderimGerekenListesi: [],
      imzalananTislerListesi: [],
      grevYasagiOlanListesi: []
    };

    console.log("Dashboard data loaded:", Object.keys(transformedData));
    return transformedData;
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
      errorHandler: (error: Error) => {
        toast({
          title: "Veri Yükleme Hatası",
          description: "Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
          variant: "destructive",
        });
      }
    }
  });
};
