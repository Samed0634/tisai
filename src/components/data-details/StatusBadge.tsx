
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClassName = () => {
    if (!status) return "bg-gray-100 text-gray-800";
    
    switch(status.toUpperCase()) {
      case "YETKİ BELGESİ BEKLENİYOR":
        return "bg-purple-100 text-purple-800";
      case "ÇAĞRI YAPILMASI BEKLENİYOR":
        return "bg-cyan-100 text-cyan-800";
      case "İLK OTURUM BEKLENİYOR":
        return "bg-blue-100 text-blue-800";
      case "MÜZAKERE SÜRESİNDE":
        return "bg-orange-100 text-orange-800";
      case "UYUŞMAZLIK İÇİN BEKLENİYOR":
        return "bg-red-100 text-red-800";
      case "ARABULUCU RAPORU BEKLENİYOR":
        return "bg-yellow-100 text-yellow-800";
      case "GREV KARARI AŞAMASINDA":
        return "bg-amber-100 text-amber-800";
      case "GREV OYLAMASI BEKLENİYOR":
        return "bg-sky-100 text-sky-800";
      case "YHK'YA GÖNDERİLMESİ BEKLENİYOR":
        return "bg-emerald-100 text-emerald-800";
      case "TİS İMZALANDI":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("px-2 py-1 font-medium", getStatusClassName())}
    >
      {status || "Belirsiz"}
    </Badge>
  );
};
