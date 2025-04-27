
import { BarChart3, Building2, Calendar, FileJson2, FolderKanban, History, ListChecks, Upload } from "lucide-react";
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

      <NavigationLink to="/activity-history" onClick={handleLinkClick}>
        <History className="h-4 w-4" />
        İşlem Geçmişi
      </NavigationLink>
    </nav>;
}
