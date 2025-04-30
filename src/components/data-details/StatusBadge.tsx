import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClassName = () => {
    switch(status) {
      // Turuncu (Orange) status values
      case "YETKİ BELGESİ BEKLENİYOR":
      case "ÇAĞRI YAPILMASI BEKLENİYOR":
      case "İLK OTURUM BEKLENİYOR":
        return "bg-orange-100 text-orange-800";
      
      // Sarı (Yellow) status values
      case "MÜZAKERE SÜRESİNDE":
        return "bg-yellow-100 text-yellow-800";
      
      // Other status values with default coloring (blue-ish)
      case "UYUŞMAZLIK İÇİN BEKLENİYOR":
      case "ARABULUCU RAPORU BEKLENİYOR":
      case "GREV KARARI AŞAMASINDA":
      case "GREV OYLAMASI BEKLENİYOR":
      case "YHK'YA GÖNDERİLMESİ BEKLENİYOR":
        return "bg-blue-100 text-blue-800";
      
      // Completed status (green)
      case "TİS İMZALANDI":
        return "bg-green-100 text-green-800";
      
      // Default fallback
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Badge variant="outline" className={getStatusClassName()}>
      {status}
    </Badge>
  );
};
