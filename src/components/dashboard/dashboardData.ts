import { 
  AlertTriangle, 
  Building, 
  Calendar, 
  FileCheck, 
  FileText, 
  Gavel, 
  MessageSquare, 
  Scale 
} from "lucide-react";
import React from "react";
import { getWorkplaceCount } from "@/utils/mockData";

export interface DashboardItem {
  id: string;
  title: string;
  value: number;
  icon: React.ReactNode;
}

export interface RecentActivity {
  id: number;
  title: string;
  time: string;
  date: string;
  icon: React.ReactNode;
}

export interface UpcomingMeeting {
  id: number;
  title: string;
  date: string;
  month: string;
  time: string;
}

export const getDashboardData = (): DashboardItem[] => {
  return [
    { 
      id: "authorization-requests", 
      title: "Yetki Tespiti İstenecek İşyerleri", 
      value: getWorkplaceCount("authorization-requests"), 
      icon: React.createElement(Building, { className: "h-5 w-5" }) 
    },
    { 
      id: "authorization-notices", 
      title: "Yetki Belgesi Tebliğ Yapılan İşyerleri", 
      value: getWorkplaceCount("authorization-notices"), 
      icon: React.createElement(FileCheck, { className: "h-5 w-5" }) 
    },
    { 
      id: "call-required", 
      title: "Çağrı Yapılacak İşyerleri", 
      value: getWorkplaceCount("call-required"), 
      icon: React.createElement(MessageSquare, { className: "h-5 w-5" }) 
    },
    { 
      id: "first-session", 
      title: "İlk Oturum Tutulması Gereken İşyerleri", 
      value: getWorkplaceCount("first-session"), 
      icon: React.createElement(Calendar, { className: "h-5 w-5" }) 
    },
    { 
      id: "dispute-notices", 
      title: "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri", 
      value: getWorkplaceCount("dispute-notices"), 
      icon: React.createElement(AlertTriangle, { className: "h-5 w-5" }) 
    },
    { 
      id: "strike-decisions", 
      title: "Grev Kararı Alınması Gereken İşyerleri", 
      value: getWorkplaceCount("strike-decisions"), 
      icon: React.createElement(Gavel, { className: "h-5 w-5" }) 
    },
    { 
      id: "yhk-submissions", 
      title: "YHK'ya Gönderilmesi Gereken İşyerleri", 
      value: getWorkplaceCount("yhk-submissions"), 
      icon: React.createElement(Scale, { className: "h-5 w-5" }) 
    }
  ];
};

export const recentActivities: RecentActivity[] = [
  { 
    id: 1, 
    title: "ABC İşyerinde yetki tespiti istenmiştir", 
    time: "Bugün, 10:24", 
    date: "17.04.2025",
    icon: React.createElement(Building, { className: "h-4 w-4 text-primary-500" }) 
  },
  { 
    id: 2, 
    title: "XYZ İşyerinde ilk oturum tutulmuştur", 
    time: "Dün, 14:30",
    date: "16.04.2025", 
    icon: React.createElement(Calendar, { className: "h-4 w-4 text-primary-500" }) 
  },
  { 
    id: 3, 
    title: "DEF İşyerinde çağrı yapılmıştır", 
    time: "2 gün önce, 11:15",
    date: "15.04.2025",
    icon: React.createElement(MessageSquare, { className: "h-4 w-4 text-primary-500" }) 
  }
];

export const upcomingMeetings: UpcomingMeeting[] = [
  { 
    id: 1, 
    title: "MNO İşyeri İlk Oturum", 
    date: "18", 
    month: "Nis", 
    time: "15:00 - 16:30" 
  },
  { 
    id: 2, 
    title: "PQR İşyeri Çağrı", 
    date: "20", 
    month: "Nis", 
    time: "11:00 - 12:00" 
  },
  { 
    id: 3, 
    title: "STU İşyeri Toplantı", 
    date: "22", 
    month: "Nis", 
    time: "13:30 - 14:30" 
  }
];
