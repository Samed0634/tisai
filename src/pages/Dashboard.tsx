
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import RecentActivities from "@/components/dashboard/RecentActivities";
import UpcomingMeetings from "@/components/dashboard/UpcomingMeetings";
import { recentActivities, upcomingMeetings } from "@/components/dashboard/dashboardData";
import { useWebhookData } from "@/hooks/useWebhookData";
import { createDashboardData } from "@/components/dashboard/dashboardConfig";

const Dashboard = () => {
  const navigate = useNavigate();
  const { webhookData } = useWebhookData();

  const handleCardClick = (categoryId: string) => {
    navigate(`/details/${categoryId}`);
  };

  const dashboardData = createDashboardData(
    webhookData,
    recentActivities.length,
    upcomingMeetings.length
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gösterge Paneli</h1>
      </div>

      <DashboardGrid data={dashboardData} onCardClick={handleCardClick} />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivities activities={recentActivities} />
        <UpcomingMeetings meetings={upcomingMeetings} />
      </div>
    </div>
  );
};

export default Dashboard;
