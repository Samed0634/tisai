
import { BarChart3, Building2, History, Upload, FileText, ChartPie, Download, CreditCard } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { useSidebar } from "@/components/ui/sidebar";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { useKurumStatus } from "@/hooks/useKurumStatus";

export function Navigation() {
  const { setOpenMobile } = useSidebar();
  const { subscribed, subscription_tier } = useSubscription();
  const { user } = useAuth();
  const { hasKurum } = useKurumStatus();
  
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
        <span className="truncate">Süreç Başlat (Veri Girişi)</span>
      </NavigationLink>

      <NavigationLink to="/upload-tis" onClick={handleLinkClick}>
        <Upload className="h-4 w-4" />
        <span className="truncate">TİS Yükle</span>
      </NavigationLink>

      <NavigationLink to="/download-tis" onClick={handleLinkClick}>
        <Download className="h-4 w-4" />
        <span className="truncate">TİS İndir</span>
      </NavigationLink>
      
      <NavigationLink to="/activity-history" onClick={handleLinkClick}>
        <History className="h-4 w-4" />
        <span className="truncate">İşlem Geçmişi</span>
      </NavigationLink>

      <NavigationLink to="/statistics" onClick={handleLinkClick}>
        <ChartPie className="h-4 w-4" />
        <span className="truncate">İstatistik &amp; Raporlama</span>
      </NavigationLink>
      
      <div className="space-y-1">
        <NavigationLink to="/subscription" onClick={handleLinkClick}>
          <CreditCard className="h-4 w-4" />
          <span className="truncate">
            Abonelik
            {subscribed && subscription_tier && (
              <span className="ml-1.5 text-xs bg-green-500/20 text-green-600 px-1.5 py-0.5 rounded-full">
                {subscription_tier}
              </span>
            )}
          </span>
        </NavigationLink>
        
        {user && (
          <NavigationLink 
            to="/kurum-kayit" 
            onClick={handleLinkClick}
            className={!hasKurum ? "text-red-500 hover:text-red-600" : ""}
          >
            <Building2 className="h-4 w-4 ml-4" />
            <span className="truncate">Kurum Kayıt</span>
          </NavigationLink>
        )}
      </div>
    </nav>
  );
}
