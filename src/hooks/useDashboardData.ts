
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const fetchDashboardData = async () => {
  try {
    const response = await fetch('https://primary-production-dcf9.up.railway.app/webhook/terminsorgu');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("Dashboard data loaded:", Object.keys(data));
    return data;
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
