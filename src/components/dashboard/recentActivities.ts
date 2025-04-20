
import React from "react";
import { Building, Calendar, MessageSquare } from "lucide-react";
import type { RecentActivity } from "./dashboardTypes";

export const recentActivities: RecentActivity[] = [
  { 
    id: 1, 
    title: "ABC İşyerinde yetki tespiti istenmiştir", 
    time: "Bugün, 10:24", 
    date: "17.04.2025",
    icon: React.createElement(Building, { className: "h-4 w-4 text-primary-500" }),
    category: "authorization-requests" 
  },
  { 
    id: 2, 
    title: "XYZ İşyerinde ilk oturum tutulmuştur", 
    time: "Dün, 14:30",
    date: "16.04.2025", 
    icon: React.createElement(Calendar, { className: "h-4 w-4 text-primary-500" }),
    category: "first-session" 
  },
  { 
    id: 3, 
    title: "DEF İşyerinde çağrı yapılmıştır", 
    time: "2 gün önce, 11:15",
    date: "15.04.2025",
    icon: React.createElement(MessageSquare, { className: "h-4 w-4 text-primary-500" }),
    category: "call-required" 
  }
];
