
import { useQuery } from "@tanstack/react-query";

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
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });
};
