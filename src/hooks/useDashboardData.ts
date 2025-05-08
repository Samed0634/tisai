
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
    
    // Fetch data for grev oylaması
    const { data: grevOylamasiData, error: grevOylamasiError } = await supabase
      .from('grev_oylaması_yapılması_gereken_view')
      .select('*');
    
    if (grevOylamasiError) {
      throw new Error(`Error fetching grev oylaması data: ${grevOylamasiError.message}`);
    }
    
    // Fetch data for çağrı yapılacak
    const { data: cagriYapilacakData, error: cagriYapilacakError } = await supabase
      .from('çağrı_yapılacak_view')
      .select('*');
    
    if (cagriYapilacakError) {
      throw new Error(`Error fetching çağrı yapılacak data: ${cagriYapilacakError.message}`);
    }
    
    // Fetch data for yetki tespiti
    const { data: yetkiTespitData, error: yetkiTespitError } = await supabase
      .from('yetki_tespit_istenecek_view')
      .select('*');
    
    if (yetkiTespitError) {
      throw new Error(`Error fetching yetki tespit data: ${yetkiTespitError.message}`);
    }
    
    // Fetch data for yetki belgesi tebliğ
    const { data: yetkiBelgesiData, error: yetkiBelgesiError } = await supabase
      .from('yetki_belgesi_tebliğ_yapılan_view')
      .select('*');
    
    if (yetkiBelgesiError) {
      throw new Error(`Error fetching yetki belgesi data: ${yetkiBelgesiError.message}`);
    }
    
    // Fetch data for yer ve gün tespiti
    const { data: yerGunTespitData, error: yerGunTespitError } = await supabase
      .from('yer_ve_gün_tespit_tarihli_view')
      .select('*');
    
    if (yerGunTespitError) {
      throw new Error(`Error fetching yer gün tespit data: ${yerGunTespitError.message}`);
    }
    
    // Fetch data for önceden belirlenen ilk oturum
    const { data: oncedenBelirlenenData, error: oncedenBelirlenenError } = await supabase
      .from('önceden_belirlenen_ilk_oturum_view')
      .select('*');
    
    if (oncedenBelirlenenError) {
      throw new Error(`Error fetching önceden belirlenen ilk oturum data: ${oncedenBelirlenenError.message}`);
    }
    
    // Fetch data for ilk oturum
    const { data: ilkOturumData, error: ilkOturumError } = await supabase
      .from('ilk_oturum_tutulması_gereken_view')
      .select('*');
    
    if (ilkOturumError) {
      throw new Error(`Error fetching ilk oturum data: ${ilkOturumError.message}`);
    }
    
    // Fetch data for müzakere süresi
    const { data: muzakereSuresiData, error: muzakereSuresiError } = await supabase
      .from('müzakere_süresi_dolan_view')
      .select('*');
    
    if (muzakereSuresiError) {
      throw new Error(`Error fetching müzakere süresi data: ${muzakereSuresiError.message}`);
    }
    
    // Fetch data for uyuşmazlık
    const { data: uyusmazlikData, error: uyusmazlikError } = await supabase
      .from('uyuşmazlık_bildirimi_yapılması_gereken_view')
      .select('*');
    
    if (uyusmazlikError) {
      throw new Error(`Error fetching uyuşmazlık data: ${uyusmazlikError.message}`);
    }
    
    // Fetch data for yhk gönderim
    const { data: yhkGonderimData, error: yhkGonderimError } = await supabase
      .from('yhk_gönderim_gereken_view')
      .select('*');
    
    if (yhkGonderimError) {
      throw new Error(`Error fetching yhk gönderim data: ${yhkGonderimError.message}`);
    }
    
    // Fetch data for imzalanan tisler
    const { data: imzalananTislerData, error: imzalananTislerError } = await supabase
      .from('imzalanan_tisler_view')
      .select('*');
    
    if (imzalananTislerError) {
      throw new Error(`Error fetching imzalanan tisler data: ${imzalananTislerError.message}`);
    }
    
    // Fetch data for grev yasağı
    const { data: grevYasagiData, error: grevYasagiError } = await supabase
      .from('grev_yasağı_olan_view')
      .select('*');
    
    if (grevYasagiError) {
      throw new Error(`Error fetching grev yasağı data: ${grevYasagiError.message}`);
    }

    // Transform the response into the expected format for dashboard cards
    const transformedData = {
      çağrı_yapılacak_view: cagriYapilacakData || [],
      yetki_tespit_istenecek_view: yetkiTespitData || [],
      yetki_belgesi_tebliğ_yapılan_view: yetkiBelgesiData || [],
      yer_ve_gün_tespit_tarihli_view: yerGunTespitData || [],
      önceden_belirlenen_ilk_oturum_view: oncedenBelirlenenData || [],
      ilk_oturum_tutulması_gereken_view: ilkOturumData || [],
      müzakere_süresi_dolan_view: muzakereSuresiData || [],
      uyuşmazlık_bildirimi_yapılması_gereken_view: uyusmazlikData || [],
      grev_kararı_alınması_gereken_view: grevKarariData || [],
      grev_oylaması_yapılması_gereken_view: grevOylamasiData || [],
      yhk_gönderim_gereken_view: yhkGonderimData || [],
      imzalanan_tisler_view: imzalananTislerData || [],
      grev_yasağı_olan_view: grevYasagiData || []
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
    staleTime: 5 * 1000, // 5 seconds to ensure data is refreshed more frequently
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
