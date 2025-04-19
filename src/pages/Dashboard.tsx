import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import UpcomingMeetings from "@/components/dashboard/UpcomingMeetings";
import { recentActivities, upcomingMeetings } from "@/components/dashboard/dashboardData";
import { useToast } from "@/hooks/use-toast";

const fetchWebhookData = async () => {
  try {
    const response = await fetch('https://primary-production-dcf9.up.railway.app/webhook-test/terminsorgu', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching webhook data:', error);
    throw error;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: webhookData, isError } = useQuery({
    queryKey: ['webhookData'],
    queryFn: fetchWebhookData,
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Hata",
        description: "Veri yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  const handleCardClick = (categoryId: string) => {
    navigate(`/details/${categoryId}`);
  };

  const dashboardData = [
    {
      id: "authorization-requests",
      title: "Yetki Tespiti İstenecek İşyerleri",
      value: webhookData?.yetkiTespiti || 0,
      icon: React.createElement(Building, { className: "h-5 w-5" })
    },
    {
      id: "authorization-notices",
      title: "Yetki Belgesi Tebliğ Yapılan İşyerleri",
      value: webhookData?.yetkiBelgesi || 0,
      icon: React.createElement(FileCheck, { className: "h-5 w-5" })
    },
    {
      id: "recent-activities",
      title: "Son Etkinlikler",
      value: recentActivities.length,
      icon: React.createElement(ChartBar, { className: "h-5 w-5" })
    },
    {
      id: "upcoming-meetings",
      title: "Yaklaşan Toplantılar",
      value: upcomingMeetings.length,
      icon: React.createElement(ChartBar, { className: "h-5 w-5" })
    }
  ];

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
