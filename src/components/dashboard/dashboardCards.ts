
import { AlertCircle, BarChart3, Calendar, MessageSquare, ScrollText, ShieldAlert, Briefcase, Building, CheckCircle, Vote, Scale } from "lucide-react";
import { DashboardItem } from "./dashboardTypes";

export const getDashboardData = (): DashboardItem[] => {
  return [
    {
      id: "cagri",
      title: "Çağrı Yapılacak İşyerleri",
      value: 0,
      icon: MessageSquare,
      color: "#00FFFF", // Aqua
      dataSource: "çağrı_yapılacak_view"
    },
    {
      id: "yetkiTespit",
      title: "Yetki Tespiti İstenen İşyerleri",
      value: 0,
      icon: ScrollText,
      color: "#87CEEB", // Bordro (Sky Blue)
      dataSource: "yetki_tespit_istenecek_view"
    },
    {
      id: "yetkiBelgesi",
      title: "Yetki Belgesi Tebliğ Yapılan İşyerleri",
      value: 0,
      icon: CheckCircle,
      color: "#FFC0CB", // Pembe (Pink)
      dataSource: "yetki_belgesi_tebliğ_yapılan_view"
    },
    {
      id: "yerGunTespit",
      title: "Yer ve Gün Tespiti Yapılan İşyerleri",
      value: 0,
      icon: Calendar,
      color: "#8A2BE2", // BlueViolet
      dataSource: "yer_ve_gün_tespit_tarihli_view"
    },
    {
      id: "oncedenBelirlenen",
      title: "Önceden Belirlenen İlk Oturum",
      value: 0,
      icon: Calendar,
      color: "#F5F5DC", // Beige
      dataSource: "önceden_belirlenen_ilk_oturum_view"
    },
    {
      id: "ilkOturum",
      title: "İlk Oturum Gereken İşyerleri",
      value: 0,
      icon: Building,
      color: "#0000FF", // Blue
      dataSource: "ilk_oturum_tutulması_gereken_view"
    },
    {
      id: "uyusmazlik",
      title: "Uyuşmazlık Gereken İşyerleri",
      value: 0,
      icon: ShieldAlert,
      color: "#FF0000", // Red
      dataSource: "uyuşmazlık_bildirimi_yapılması_gereken_view"
    },
    {
      id: "grevKarari",
      title: "Grev Kararı Alınması Gereken İşyerleri",
      value: 0,
      icon: AlertCircle,
      color: "#FFFF00", // Sarı (Yellow)
      dataSource: "grev_kararı_alınması_gereken_view"
    },
    {
      id: "grevOylamasi",
      title: "Grev Oylaması Yapılması Gereken İşyerleri",
      value: 0,
      icon: Vote,
      color: "#ADD8E6", // Açık Mavi (Light Blue)
      dataSource: "grev_oylaması_yapılması_gereken_view"
    },
    {
      id: "yhk",
      title: "YHK Gönderimi Gereken İşyerleri",
      value: 0,
      icon: Scale,
      color: "#7FFFD4", // Aquamarine
      dataSource: "yhk_gönderim_gereken_view"
    },
    {
      id: "imzalananTisler",
      title: "İmzalanan Tisler",
      value: 0,
      icon: BarChart3,
      color: "#00FF00", // Yeşil (Green)
      dataSource: "imzalanan_tisler_view"
    },
    {
      id: "grevYasagi",
      title: "Grev Yasağı Olan İşyerleri",
      value: 0,
      icon: ShieldAlert,
      color: "#E0FFFF", // LightCyan
      dataSource: "grev_yasağı_olan_view"
    },
  ];
};
