
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

export const getDashboardData = (): DashboardItem[] => [
  { 
    id: "authorization-requests", 
    title: "Yetki Tespiti İstenecek İşyerleri", 
    value: 0,
    icon: React.createElement(Building, { className: "h-5 w-5" }),
    color: "#FEF7CD",
    dataSource: "yetkiTespitIstenenListesi"
  },
  { 
    id: "authorization-notices", 
    title: "Yetki Belgesi Tebliğ Yapılan İşyerleri", 
    value: 0,
    icon: React.createElement(FileCheck, { className: "h-5 w-5" }),
    color: "#FEF7CD",
    dataSource: "yetkiBelgesiTebligYapilanListesi"
  },
  { 
    id: "call-required", 
    title: "Çağrı Yapılacak İşyerleri", 
    value: 0,
    icon: React.createElement(MessageSquare, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "cagriYapilacakListesi"
  },
  { 
    id: "place-date-determination", 
    title: "Yer ve Gün Tespit Tarihli İşyerleri", 
    value: 0,
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#D3E4FD",
    dataSource: "yerVeGunTespitListesi"
  },
  { 
    id: "pre-determined-first-session", 
    title: "Önceden Belirlenen İlk Oturum Tarihi İşyerleri", 
    value: 0,
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#D3E4FD",
    dataSource: "oncedenBelirlenenIlkOturumListesi"
  },
  { 
    id: "first-session", 
    title: "İlk Oturum Tutulması Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "ilkOturumGerekenListesi"
  },
  { 
    id: "dispute-notices", 
    title: "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(AlertTriangle, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "uyusmazlikGerekenListesi"
  },
  { 
    id: "mediator-appointment-deadline", 
    title: "Arabulucu Ataması Son Tarih", 
    value: 0,
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#D3E4FD",
    dataSource: "arabulucuAtamasiSonTarihListesi"
  },
  { 
    id: "strike-decisions", 
    title: "Grev Kararı Alınması Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(Gavel, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "grevKarariAlinmasiGerekenListesi"
  },
  { 
    id: "strike-voting", 
    title: "Grev Oylaması Yapılması Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(Gavel, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "grevOylamasiYapilmasiGerekenListesi"
  },
  { 
    id: "yhk-submissions", 
    title: "YHK'ya Gönderilmesi Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(Scale, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "yhkGonderimGerekenListesi"
  },
  { 
    id: "yhk-reminder", 
    title: "YHK'daki TİS Hatırlatması", 
    value: 0,
    icon: React.createElement(Scale, { className: "h-5 w-5" }),
    color: "#D3E4FD",
    dataSource: "yhkHatirlatmasiListesi"
  },
  { 
    id: "signed-tis", 
    title: "İmzalanan TİS'ler", 
    value: 0,
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    color: "#F2FCE2",
    dataSource: "imzalananTislerListesi"
  },
  { 
    id: "expiring-tis", 
    title: "Sona Erecek TİS'ler", 
    value: 0,
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    color: "#FEF7CD",
    dataSource: "sonaErecekTislerListesi"
  },
  { 
    id: "strike-ban", 
    title: "Grev Yasağı Olan İşyerleri", 
    value: 0,
    icon: React.createElement(Gavel, { className: "h-5 w-5" }),
    color: "#D3E4FD",
    dataSource: "grevYasagiOlanListesi"
  }
];

