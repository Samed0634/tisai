
import React from "react";
import { Building, FileCheck, ChartBar } from "lucide-react";

export interface DashboardCardData {
  id: string;
  title: string;
  value: number;
  icon: React.ReactNode;
}

export const createDashboardData = (
  webhookData: { yetkiTespiti?: number; yetkiBelgesi?: number } | undefined,
  recentActivitiesCount: number,
  upcomingMeetingsCount: number
): DashboardCardData[] => {
  return [
    {
      id: "authorization-requests",
      title: "Yetki Tespiti İstenecek İşyerleri",
      value: webhookData?.yetkiTespiti || 0,
      icon: <Building className="h-5 w-5" />
    },
    {
      id: "authorization-notices",
      title: "Yetki Belgesi Tebliğ Yapılan İşyerleri",
      value: webhookData?.yetkiBelgesi || 0,
      icon: <FileCheck className="h-5 w-5" />
    },
    {
      id: "recent-activities",
      title: "Son Etkinlikler",
      value: recentActivitiesCount,
      icon: <ChartBar className="h-5 w-5" />
    },
    {
      id: "upcoming-meetings",
      title: "Yaklaşan Toplantılar",
      value: upcomingMeetingsCount,
      icon: <ChartBar className="h-5 w-5" />
    }
  ];
};
