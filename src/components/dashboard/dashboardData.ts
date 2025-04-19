
import { 
  Building,
  FileCheck,
  MessageSquare,
  Calendar,
  AlertTriangle,
  Gavel,
  Scale,
  FileText
} from "lucide-react";
import React from "react";
import { getWorkplaceCount } from "@/utils/mockData";

export interface DashboardItem {
  id: string;
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export interface RecentActivity {
  id: number;
  title: string;
  time: string;
  date: string;
  icon: React.ReactNode;
  category?: string; // Added category as optional property
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
      icon: React.createElement(Building, { className: "h-5 w-5" }),
      color: "#FEF7CD" // Sarı
    },
    { 
      id: "authorization-notices", 
      title: "Yetki Belgesi Tebliğ Yapılan İşyerleri", 
      value: getWorkplaceCount("authorization-notices"),
      icon: React.createElement(FileCheck, { className: "h-5 w-5" }),
      color: "#FEF7CD" // Sarı
    },
    { 
      id: "call-required", 
      title: "Çağrı Yapılacak İşyerleri", 
      value: getWorkplaceCount("call-required"),
      icon: React.createElement(MessageSquare, { className: "h-5 w-5" }),
      color: "#ea384c" // Kırmızı
    },
    { 
      id: "place-and-date", 
      title: "Yer ve Gün Tespit Tarihli İşyerleri", 
      value: 0,
      icon: React.createElement(Calendar, { className: "h-5 w-5" }),
      color: "#D3E4FD" // Buz Mavisi
    },
    { 
      id: "pre-determined-session", 
      title: "Önceden Belirlenen İlk Oturum Tarihi İşyerleri", 
      value: 0,
      icon: React.createElement(Calendar, { className: "h-5 w-5" }),
      color: "#D3E4FD" // Buz Mavisi
    },
    { 
      id: "first-session", 
      title: "İlk Oturum Tutulması Gereken İşyerleri", 
      value: getWorkplaceCount("first-session"),
      icon: React.createElement(Calendar, { className: "h-5 w-5" }),
      color: "#ea384c" // Kırmızı
    },
    { 
      id: "dispute-notices", 
      title: "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri", 
      value: getWorkplaceCount("dispute-notices"),
      icon: React.createElement(AlertTriangle, { className: "h-5 w-5" }),
      color: "#ea384c" // Kırmızı
    },
    { 
      id: "mediator-deadline", 
      title: "Arabulucu Ataması Son Tarih", 
      value: 0,
      icon: React.createElement(Calendar, { className: "h-5 w-5" }),
      color: "#D3E4FD" // Buz Mavisi
    },
    { 
      id: "strike-decisions", 
      title: "Grev Kararı Alınması Gereken İşyerleri", 
      value: getWorkplaceCount("strike-decisions"),
      icon: React.createElement(Gavel, { className: "h-5 w-5" }),
      color: "#ea384c" // Kırmızı
    },
    { 
      id: "strike-voting", 
      title: "Grev Oylaması Yapılması Gereken İşyerleri", 
      value: 0,
      icon: React.createElement(Gavel, { className: "h-5 w-5" }),
      color: "#ea384c" // Kırmızı
    },
    { 
      id: "yhk-submissions", 
      title: "YHK'ya Gönderilmesi Gereken İşyerleri", 
      value: getWorkplaceCount("yhk-submissions"),
      icon: React.createElement(Scale, { className: "h-5 w-5" }),
      color: "#ea384c" // Kırmızı
    },
    { 
      id: "yhk-reminder", 
      title: "YHK'daki TİS Hatırlatması", 
      value: 0,
      icon: React.createElement(Scale, { className: "h-5 w-5" }),
      color: "#D3E4FD" // Buz Mavisi
    },
    { 
      id: "signed-agreements", 
      title: "İmzalanan TİS'ler", 
      value: 0,
      icon: React.createElement(FileText, { className: "h-5 w-5" }),
      color: "#F2FCE2" // Yeşil
    },
    { 
      id: "expiring-agreements", 
      title: "Sona Erecek TİS'ler", 
      value: 0,
      icon: React.createElement(FileText, { className: "h-5 w-5" }),
      color: "#FEF7CD" // Sarı
    },
    { 
      id: "strike-banned", 
      title: "Grev Yasağı Olan İşyerleri", 
      value: 0,
      icon: React.createElement(Gavel, { className: "h-5 w-5" }),
      color: "#D3E4FD" // Buz Mavisi
    }
  ];
};

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
