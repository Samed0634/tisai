
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
import type { DashboardItem } from "./dashboardTypes";

const getDefaultCount = () => 0;

export const getDashboardData = (): DashboardItem[] => [
  { 
    id: "authorization-requests", 
    title: "Yetki Tespiti İstenecek İşyerleri", 
    value: getDefaultCount(),
    icon: React.createElement(Building, { className: "h-5 w-5" }),
    color: "#FEF7CD"
  },
  { 
    id: "authorization-notices", 
    title: "Yetki Belgesi Tebliğ Yapılan İşyerleri", 
    value: getDefaultCount(),
    icon: React.createElement(FileCheck, { className: "h-5 w-5" }),
    color: "#FEF7CD"
  },
  { 
    id: "call-required", 
    title: "Çağrı Yapılacak İşyerleri", 
    value: getDefaultCount(),
    icon: React.createElement(MessageSquare, { className: "h-5 w-5" }),
    color: "#ea384c"
  },
  { 
    id: "place-date-determination", 
    title: "Yer ve Gün Tespit Tarihli İşyerleri", 
    value: 0,
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#D3E4FD"
  },
  { 
    id: "pre-determined-first-session", 
    title: "Önceden Belirlenen İlk Oturum Tarihi İşyerleri", 
    value: 0,
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#D3E4FD"
  },
  { 
    id: "first-session", 
    title: "İlk Oturum Tutulması Gereken İşyerleri", 
    value: getDefaultCount(),
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#ea384c"
  },
  { 
    id: "dispute-notices", 
    title: "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri", 
    value: getDefaultCount(),
    icon: React.createElement(AlertTriangle, { className: "h-5 w-5" }),
    color: "#ea384c"
  },
  { 
    id: "mediator-appointment-deadline", 
    title: "Arabulucu Ataması Son Tarih", 
    value: 0,
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#D3E4FD"
  },
  { 
    id: "strike-decisions", 
    title: "Grev Kararı Alınması Gereken İşyerleri", 
    value: getDefaultCount(),
    icon: React.createElement(Gavel, { className: "h-5 w-5" }),
    color: "#ea384c"
  },
  { 
    id: "strike-voting", 
    title: "Grev Oylaması Yapılması Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(Gavel, { className: "h-5 w-5" }),
    color: "#ea384c"
  },
  { 
    id: "yhk-submissions", 
    title: "YHK'ya Gönderilmesi Gereken İşyerleri", 
    value: getDefaultCount(),
    icon: React.createElement(Scale, { className: "h-5 w-5" }),
    color: "#ea384c"
  },
  { 
    id: "yhk-reminder", 
    title: "YHK'daki TİS Hatırlatması", 
    value: 0,
    icon: React.createElement(Scale, { className: "h-5 w-5" }),
    color: "#D3E4FD"
  },
  { 
    id: "signed-tis", 
    title: "İmzalanan TİS'ler", 
    value: 0,
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    color: "#F2FCE2"
  },
  { 
    id: "expiring-tis", 
    title: "Sona Erecek TİS'ler", 
    value: 0,
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    color: "#FEF7CD"
  },
  { 
    id: "strike-ban", 
    title: "Grev Yasağı Olan İşyerleri", 
    value: 0,
    icon: React.createElement(Gavel, { className: "h-5 w-5" }),
    color: "#D3E4FD"
  }
];
