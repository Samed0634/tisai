
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClassName = () => {
    switch(status) {
      case "İşlem Bekliyor":
        return "bg-yellow-100 text-yellow-800";
      case "Tamamlandı":
        return "bg-green-100 text-green-800";
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
