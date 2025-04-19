import {
  BarChart3,
  Building2,
  Calendar,
  Contact2,
  FileJson2,
  FolderKanban,
  Gavel,
  History,
  ListChecks,
  MessageSquareCode,
  Scale,
  Upload,
} from "lucide-react";
import { NavigationLink } from "./NavigationLink";

export function Navigation() {
  return (
    <nav className="space-y-2 px-4">
      <NavigationLink to="/">
        <BarChart3 className="h-4 w-4" />
        Gösterge Paneli
      </NavigationLink>

      <NavigationLink to="/new-data">
        <Building2 className="h-4 w-4" />
        Yeni Veri Girişi
      </NavigationLink>

      <NavigationLink to="/update-data">
        <Contact2 className="h-4 w-4" />
        Veri Güncelleme
      </NavigationLink>

      <NavigationLink to="/upload-tis">
        <Upload className="h-4 w-4" />
        TİS Yükle
      </NavigationLink>

      <NavigationLink to="/procedure-bot">
        <MessageSquareCode className="h-4 w-4" />
        Prosedür Bot
      </NavigationLink>

      <NavigationLink to="/tis-bot">
        <FileJson2 className="h-4 w-4" />
        TİS Bot
      </NavigationLink>

      <NavigationLink to="/procedure-status">
        <ListChecks className="h-4 w-4" />
        Prosedür Durumu
      </NavigationLink>

      <NavigationLink to="/write-legal-notice">
        <Gavel className="h-4 w-4" />
        İhtarname Yaz
      </NavigationLink>

      <NavigationLink to="/court-decision-query">
        <Scale className="h-4 w-4" />
        Yargı Kararı Sor
      </NavigationLink>
      
      <NavigationLink to="/activity-history">
        <History className="h-4 w-4" />
        İşlem Geçmişi
      </NavigationLink>
    </nav>
  );
}
