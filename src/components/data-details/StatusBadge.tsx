
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import "../styles/status-badge.css"; // Will create this file next

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClassName = () => {
    switch(status) {
      // Light Blue
      case "YETKİ BELGESİ BEKLENİYOR":
        return "bg-blue-100 text-blue-800 animate-pulse-light-blue";
      
      // Purple
      case "ÇAĞRI YAPILMASI BEKLENİYOR":
        return "bg-purple-100 text-purple-800 animate-pulse-purple";
      
      // Orange
      case "İLK OTURUM BEKLENİYOR":
        return "bg-orange-100 text-orange-800 animate-pulse-orange";
      
      // Yellow 
      case "MÜZAKERE SÜRESİNDE":
        return "bg-yellow-100 text-yellow-800 animate-pulse-yellow";
      
      // Pale Red
      case "UYUŞMAZLIK İÇİN BEKLENİYOR":
        return "bg-red-50 text-red-800 animate-pulse-pale-red";
      
      // Gold
      case "ARABULUCU RAPORU BEKLENİYOR":
        return "bg-amber-100 text-amber-800 animate-pulse-gold";
      
      // Red
      case "GREV KARARI AŞAMASINDA":
        return "bg-red-100 text-red-800 animate-pulse-red";
      
      // Red-Purple (Magenta)
      case "GREV OYLAMASI BEKLENİYOR":
        return "bg-pink-100 text-pink-800 animate-pulse-red-purple";
      
      // Yellow-Orange
      case "YHK'YA GÖNDERİLMESİ BEKLENİYOR":
        return "bg-amber-50 text-amber-800 animate-pulse-yellow-orange";
      
      // Green
      case "TİS İMZALANDI":
        return "bg-green-100 text-green-800 animate-pulse-green";
      
      // Default fallback
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Badge variant="outline" className={cn(getStatusClassName(), "status-badge")}>
      {status}
    </Badge>
  );
};
