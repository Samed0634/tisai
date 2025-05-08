
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
  remainingTime?: string; // Add this new prop for "sure_bilgisi"
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  onClick,
  color,
  className,
  remainingTime
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
        
        {/* Add remaining time display */}
        {remainingTime && (
          <div className="mt-3 pt-2 border-t border-border/30">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">Kalan Süre:</span>
              <span className={cn(
                "text-xs font-bold", 
                parseInt(remainingTime) < 5 ? "text-destructive" : "text-primary"
              )}>
                {remainingTime} gün
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
