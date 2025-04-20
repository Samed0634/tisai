
import { useQuery } from "@tanstack/react-query";

const fetchDashboardData = async () => {
  const response = await fetch('https://primary-production-dcf9.up.railway.app/webhook/terminsorgu');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData
  });
};

