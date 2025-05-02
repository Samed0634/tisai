
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export const AppHeader = () => {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  
  return (
    <div className="sticky top-0 z-10 flex items-center h-14 px-4 bg-white border-b border-gray-200">
      <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
        <div className="h-6 w-6 relative overflow-hidden rounded-full border-2 border-primary/20">
          <img 
            alt="Toplu İş Sözleşmesi Otomasyonu Logo" 
            src="/lovable-uploads/e0e0ca14-d15b-4f2c-b639-b59d8c7eb558.png"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium text-sm ml-2 text-gray-700">
          Toplu İş Sözleşmesi Otomasyon Sistemi
        </span>
      </div>
    </div>
  );
};
