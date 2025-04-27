
import { AlertCircle, BarChart3, Calendar, MessageSquare, ScrollText, ShieldAlert, Briefcase, Building, CheckCircle, Vote, Scale } from "lucide-react";
import { DashboardItem } from "./dashboardTypes";

export const getDashboardData = (): DashboardItem[] => {
  return [
    {
      id: "cagri",
      title: "Çağrı Yapılacak İşyerleri",
      value: 0,
      icon: MessageSquare,
      color: "#0ea5e9",
      dataSource: "çağrı_yapılacak_view"
    },
    {
      id: "yetkiTespit",
      title: "Yetki Tespiti İstenen İşyerleri",
      value: 0,
      icon: ScrollText,
      color: "#10b981",
      dataSource: "yetki_tespit_istenecek_view"
    },
    {
      id: "yetkiBelgesi",
      title: "Yetki Belgesi Tebliğ Yapılan İşyerleri",
      value: 0,
      icon: CheckCircle,
      color: "#6366f1",
      dataSource: "yetki_belgesi_tebliğ_yapılan_view"
    },
    {
      id: "yerGunTespit",
      title: "Yer ve Gün Tespiti Yapılan İşyerleri",
      value: 0,
      icon: Calendar,
      color: "#ec4899",
      dataSource: "yer_ve_gün_tespit_tarihli_view"
    },
    {
      id: "oncedenBelirlenen",
      title: "Önceden Belirlenen İlk Oturum",
      value: 0,
      icon: Calendar,
      color: "#a855f7",
      dataSource: "önceden_belirlenen_ilk_oturum_view"
    },
    {
      id: "ilkOturum",
      title: "İlk Oturum Gereken İşyerleri",
      value: 0,
      icon: Building,
      color: "#f59e0b",
      dataSource: "ilk_oturum_tutulması_gereken_view"
    },
    {
      id: "muzakereSuresi",
      title: "Müzakere Süresi Dolan İşyerleri",
      value: 0,
      icon: Briefcase,
      color: "#ef4444",
      dataSource: "müzakere_süresi_dolan_view"
    },
    {
      id: "uyusmazlik",
      title: "Uyuşmazlık Gereken İşyerleri",
      value: 0,
      icon: ShieldAlert,
      color: "#84cc16",
      dataSource: "uyuşmazlık_bildirimi_yapılması_gereken_view"
    },
    {
      id: "grevKarari",
      title: "Grev Kararı Alınması Gereken İşyerleri",
      value: 0,
      icon: AlertCircle,
      color: "#f43f5e",
      dataSource: "grev_kararı_alınması_gereken_view"
    },
    {
      id: "grevOylamasi",
      title: "Grev Oylaması Yapılması Gereken İşyerleri",
      value: 0,
      icon: Vote,
      color: "#0284c7",
      dataSource: "grev_oylaması_yapılması_gereken_view"
    },
    {
      id: "yhk",
      title: "YHK Gönderimi Gereken İşyerleri",
      value: 0,
      icon: Scale,
      color: "#0d9488",
      dataSource: "yhk_gönderim_gereken_view"
    },
    {
      id: "imzalananTisler",
      title: "İmzalanan Tisler",
      value: 0,
      icon: BarChart3,
      color: "#8b5cf6",
      dataSource: "imzalanan_tisler_view"
    },
    {
      id: "grevYasagi",
      title: "Grev Yasağı Olan İşyerleri",
      value: 0,
      icon: ShieldAlert,
      color: "#dc2626",
      dataSource: "grev_yasağı_olan_view"
    },
  ];
};
