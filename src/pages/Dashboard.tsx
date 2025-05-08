
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import UpcomingMeetings from "@/components/dashboard/UpcomingMeetings";
import RecentActivities from "@/components/dashboard/RecentActivities";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { recentActivities } from "@/components/dashboard/recentActivities";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: dashboardData, isLoading, error, refetch } = useDashboardData();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  // Check authentication
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // If loading or error, show appropriate UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Veri yüklenirken hata oluştu</h2>
        <button 
          className="px-4 py-2 bg-primary text-white rounded-md"
          onClick={() => refetch()}
        >
          Yeniden Dene
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DashboardGrid 
            data={dashboardData} 
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
          <DashboardAnalytics data={dashboardData} />
        </div>
        
        <div className="space-y-8">
          <UpcomingMeetings />
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
