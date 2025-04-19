
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import UpcomingMeetings from "@/components/dashboard/UpcomingMeetings";
import { 
  getDashboardData,
  recentActivities, 
  upcomingMeetings 
} from "@/components/dashboard/dashboardData";

const Dashboard = () => {
  const navigate = useNavigate();
  const dashboardData = getDashboardData();

  const handleCardClick = (categoryId: string) => {
    navigate(`/details/${categoryId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gösterge Paneli</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardData.map((item) => (
          <DashboardCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivities activities={recentActivities} />
        <UpcomingMeetings meetings={upcomingMeetings} />
      </div>
    </div>
  );
};

export default Dashboard;
