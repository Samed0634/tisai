
import { BarChart3, Building2, History, Upload, FileText } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { useSidebar } from "@/components/ui/sidebar";

export function Navigation() {
  const { setOpenMobile } = useSidebar();
  
  const handleLinkClick = () => {
    setOpenMobile(false);
  };
  
  return (
    <nav className="space-y-1 px-3 py-4">
      <NavigationLink to="/" onClick={handleLinkClick}>
        <BarChart3 className="h-4 w-4" />
        <span className="truncate">Gösterge Paneli</span>
      </NavigationLink>

      <NavigationLink to="/procedure-status" onClick={handleLinkClick}>
        <FileText className="h-4 w-4" />
        <span className="truncate">Prosedür Durumu</span>
      </NavigationLink>

      <NavigationLink to="/new-data" onClick={handleLinkClick}>
        <Building2 className="h-4 w-4" />
        <span className="truncate">Yeni Veri Girişi</span>
      </NavigationLink>

      <NavigationLink to="/upload-tis" onClick={handleLinkClick}>
        <Upload className="h-4 w-4" />
        <span className="truncate">TİS Yükle</span>
      </NavigationLink>
      
      <NavigationLink to="/activity-history" onClick={handleLinkClick}>
        <History className="h-4 w-4" />
        <span className="truncate">İşlem Geçmişi</span>
      </NavigationLink>
    </nav>
  );
}
