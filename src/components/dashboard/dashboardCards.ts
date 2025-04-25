import { AlertCircle, BarChart3, Calendar, MessageSquare, ScrollText, ShieldAlert, Briefcase, Building, CheckCircle, Vote, Scale } from "lucide-react";
import { DashboardItem } from "./dashboardTypes";

export const getDashboardData = (): DashboardItem[] => {
  return [
    {
      id: "cagri",
      title: "Çağrı Yapılacak İşyerleri",
      value: 0,
      icon: <MessageSquare className="h-5 w-5" />,
      color: "#0ea5e9",
      dataSource: "cagriYapilacakListesi"
    },
    {
      id: "yetkiTespit",
      title: "Yetki Tespiti İstenen İşyerleri",
      value: 0,
      icon: <ScrollText className="h-5 w-5" />,
      color: "#10b981",
      dataSource: "yetkiTespitIstenenListesi"
    },
    {
      id: "yetkiBelgesi",
      title: "Yetki Belgesi Tebliğ Yapılan İşyerleri",
      value: 0,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "#6366f1",
      dataSource: "yetkiBelgesiTebligYapilanListesi"
    },
    {
      id: "yerGunTespit",
      title: "Yer ve Gün Tespiti Yapılan İşyerleri",
      value: 0,
      icon: <Calendar className="h-5 w-5" />,
      color: "#ec4899",
      dataSource: "yerVeGunTespitListesi"
    },
    {
      id: "oncedenBelirlenen",
      title: "Önceden Belirlenen İlk Oturum",
      value: 0,
      icon: <Calendar className="h-5 w-5" />,
      color: "#a855f7",
      dataSource: "oncedenBelirlenenIlkOturumListesi"
    },
    {
      id: "ilkOturum",
      title: "İlk Oturum Gereken İşyerleri",
      value: 0,
      icon: <Building className="h-5 w-5" />,
      color: "#f59e0b",
      dataSource: "ilkOturumGerekenListesi"
    },
    {
      id: "muzakereSuresi",
      title: "Müzakere Süresi Dolan İşyerleri",
      value: 0,
      icon: <Briefcase className="h-5 w-5" />,
      color: "#ef4444",
      dataSource: "muzakereSuresiDolanListesi"
    },
    {
      id: "uyusmazlik",
      title: "Uyuşmazlık Gereken İşyerleri",
      value: 0,
      icon: <ShieldAlert className="h-5 w-5" />,
      color: "#84cc16",
      dataSource: "uyusmazlikGerekenListesi"
    },
    {
      id: "grevKarari",
      title: "Grev Kararı Alınması Gereken İşyerleri",
      value: 0,
      icon: <AlertCircle className="h-5 w-5" />,
      color: "#f43f5e",
      dataSource: "grevKarariAlinmasiGerekenListesi"
    },
    {
      id: "grevOylamasi",
      title: "Grev Oylaması Yapılması Gereken İşyerleri",
      value: 0,
      icon: <Vote className="h-5 w-5" />,
      color: "#0284c7",
      dataSource: "grevOylamasiYapilmasiGerekenListesi"
    },
    {
      id: "yhk",
      title: "YHK Gönderimi Gereken İşyerleri",
      value: 0,
      icon: <Scale className="h-5 w-5" />,
      color: "#0d9488",
      dataSource: "yhkGonderimGerekenListesi"
    },
    {
      id: "imzalananTisler",
      title: "İmzalanan Tisler",
      value: 0,
      icon: <BarChart3 className="h-5 w-5" />,
      color: "#8b5cf6",
      dataSource: "imzalananTislerListesi"
    },
    {
      id: "grevYasagi",
      title: "Grev Yasağı Olan İşyerleri",
      value: 0,
      icon: <ShieldAlert className="h-5 w-5" />,
      color: "#dc2626",
      dataSource: "grevYasagiOlanListesi"
    },
  ];
};
