
import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyle = (status: string) => {
    const lowercaseStatus = status.toLowerCase();
    
    if (lowercaseStatus.includes("bekli") || lowercaseStatus === "bekliyor") {
      return "bg-[#FEF7CD] text-amber-800 border-amber-200";
    }
    
    if (lowercaseStatus.includes("tamam") || lowercaseStatus.includes("yapilfded") || lowercaseStatus === "tamamlandı") {
      return "bg-[#dcfce7] text-green-800 border-green-200";
    }
    
    if (lowercaseStatus.includes("geç") || lowercaseStatus.includes("sür") || lowercaseStatus.includes("iptal")) {
      return "bg-[#fee2e2] text-red-800 border-red-200";
    }
    
    if (lowercaseStatus.includes("devam") || lowercaseStatus.includes("sürüyor")) {
      return "bg-[#e0f2fe] text-blue-800 border-blue-200";
    }
    
    return "bg-gray-100 text-gray-800 border-gray-200";
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border",
        getStatusStyle(status),
        className
      )}
    >
      {status}
    </span>
  );
};
