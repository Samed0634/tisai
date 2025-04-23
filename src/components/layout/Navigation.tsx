import { BarChart3, Building2, Calendar, Contact2, FileJson2, FolderKanban, Gavel, History, ListChecks, MessageSquareCode, Scale, Upload } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { useSidebar } from "@/components/ui/sidebar";
export function Navigation() {
  const {
    setOpenMobile
  } = useSidebar();
  const handleLinkClick = () => {
    setOpenMobile(false);
  };
  return <nav className="space-y-2 px-4 rounded-none">
      <NavigationLink to="/" onClick={handleLinkClick}>
        <BarChart3 className="h-4 w-4" />
        Gösterge Paneli
      </NavigationLink>

      <NavigationLink to="/new-data" onClick={handleLinkClick}>
        <Building2 className="h-4 w-4" />
        Yeni Veri Girişi
      </NavigationLink>

      <NavigationLink to="/update-data" onClick={handleLinkClick}>
        <Contact2 className="h-4 w-4" />
        Veri Güncelleme
      </NavigationLink>

      <NavigationLink to="/upload-tis" onClick={handleLinkClick}>
        <Upload className="h-4 w-4" />
        TİS Yükle
      </NavigationLink>

      <NavigationLink to="/procedure-bot" onClick={handleLinkClick}>
        <MessageSquareCode className="h-4 w-4" />
        Prosedür Bot
      </NavigationLink>

      <NavigationLink to="/tis-bot" onClick={handleLinkClick}>
        <FileJson2 className="h-4 w-4" />
        TİS Bot
      </NavigationLink>

      <NavigationLink to="/procedure-status" onClick={handleLinkClick}>
        <ListChecks className="h-4 w-4" />
        Prosedür Durumu
      </NavigationLink>

      <NavigationLink to="/write-legal-notice" onClick={handleLinkClick}>
        <Gavel className="h-4 w-4" />
        İhtarname Yaz
      </NavigationLink>

      <NavigationLink to="/court-decision-query" onClick={handleLinkClick}>
        <Scale className="h-4 w-4" />
        Yargı Kararı Sor
      </NavigationLink>
      
      <NavigationLink to="/activity-history" onClick={handleLinkClick}>
        <History className="h-4 w-4" />
        İşlem Geçmişi
      </NavigationLink>
    </nav>;
}