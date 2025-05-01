
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  onClick: () => void;
  color: string;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  onClick,
  color,
  className
}) => {
  // Extract text color class for highlighting red items
  const isHighlightedRed = className?.includes("text-destructive");

  return (
    <Card 
      onClick={onClick} 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        "border border-border/50 bg-card/50 backdrop-blur-sm",
        "cursor-pointer group",
        className
      )}
      style={{ 
        borderTop: `3px solid ${color}`,
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px ${color}25`
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors",
          className
        )}>
          {title}
        </CardTitle>
        <div className={cn(
          "rounded-xl p-2.5",
          "transition-all duration-300 ease-in-out",
          "group-hover:scale-110 group-hover:rotate-[-5deg]"
        )}
        style={{ 
          backgroundColor: `${color}20`,
          color: color
        }}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "text-2xl font-bold tracking-tight",
          "transition-colors duration-300",
          className
        )}
        style={{ 
          color: isHighlightedRed ? "var(--destructive)" : color 
        }}>
          {value.toLocaleString('tr-TR')}
        </div>
        <p className={cn(
          "text-xs text-muted-foreground mt-1 opacity-70",
          "group-hover:text-foreground/70 transition-colors",
          className
        )}>
          İşyeri
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
