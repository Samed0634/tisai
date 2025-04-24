
import { 
  Building,
  FileCheck,
  MessageSquare,
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  Gavel,
  Scale,
  Ban
} from "lucide-react";
import React from "react";
import type { DashboardItem } from "./dashboardTypes";

export const getDashboardData = (): DashboardItem[] => [
  { 
    id: "yetki-tespit-istenecek", 
    title: "Yetki Tespiti İstenecek İşyerleri", 
    value: 0,
    icon: React.createElement(Building, { className: "h-5 w-5" }),
    color: "#FEF7CD",
    dataSource: "yetkiTespitIstenenListesi"
  },
  { 
    id: "yetki-belgesi-teblig", 
    title: "Yetki Belgesi Tebliğ Yapılan İşyerleri", 
    value: 0,
    icon: React.createElement(FileCheck, { className: "h-5 w-5" }),
    color: "#FEF7CD",
    dataSource: "yetkiBelgesiTebligYapilanListesi"
  },
  { 
    id: "cagri-yapilacak", 
    title: "Çağrı Yapılacak İşyerleri", 
    value: 0,
    icon: React.createElement(MessageSquare, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "cagriYapilacakListesi"
  },
  { 
    id: "yer-gun-tespit-tarihli", 
    title: "Yer ve Gün Tespit Tarihli İşyerleri", 
    value: 0,
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#D3E4FD",
    dataSource: "yerVeGunTespitListesi"
  },
  { 
    id: "onceden-belirlenen-ilk-oturum", 
    title: "Önceden Belirlenen İlk Oturum Tarihli İşyerleri", 
    value: 0,
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#D3E4FD",
    dataSource: "oncedenBelirlenenIlkOturumListesi"
  },
  { 
    id: "ilk-oturum-tutulmasi-gereken", 
    title: "İlk Oturum Tutulması Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "ilkOturumGerekenListesi"
  },
  { 
    id: "muzakere-suresi-dolan", 
    title: "Müzakere Süresi Dolan İşyerleri", 
    value: 0,
    icon: React.createElement(Clock, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "muzakereSuresiDolanListesi"
  },
  { 
    id: "uyusmazlik-bildirimi", 
    title: "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(AlertTriangle, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "uyusmazlikGerekenListesi"
  },
  { 
    id: "grev-karari-alinmasi", 
    title: "Grev Kararı Alınması Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(Gavel, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "grevKarariAlinmasiGerekenListesi"
  },
  { 
    id: "grev-oylamasi-yapilmasi", 
    title: "Grev Oylaması Yapılması Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(Gavel, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "grevOylamasiYapilmasiGerekenListesi"
  },
  { 
    id: "yhk-gonderilmesi", 
    title: "YHK'ya Gönderilmesi Gereken İşyerleri", 
    value: 0,
    icon: React.createElement(Scale, { className: "h-5 w-5" }),
    color: "#ea384c",
    dataSource: "yhkGonderimGerekenListesi"
  },
  { 
    id: "imzalanan-tisler", 
    title: "İmzalanan TİS'ler", 
    value: 0,
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    color: "#F2FCE2",
    dataSource: "imzalananTislerListesi"
  },
  { 
    id: "grev-yasagi-olan", 
    title: "Grev Yasağı Olan İşyerleri", 
    value: 0,
    icon: React.createElement(Ban, { className: "h-5 w-5" }),
    color: "#D3E4FD",
    dataSource: "grevYasagiOlanListesi"
  }
];
