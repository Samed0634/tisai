
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export const AppHeader = () => {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  
  return (
    <div className="sticky top-0 z-10 flex items-center h-14 px-4 bg-white border-b border-gray-200">
      <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
        <div className="h-6 w-6 flex-shrink-0">
          <img 
            alt="Toplu İş Sözleşmesi Otomasyonu Logo" 
            className="responsive-image h-full w-full object-contain rounded-full border-2 border-primary/20" 
            src="/lovable-uploads/e0e0ca14-d15b-4f2c-b639-b59d8c7eb558.png" 
          />
        </div>
        <span className="font-medium text-sm ml-2 text-gray-700">
          Toplu İş Sözleşmesi Otomasyon Sistemi
        </span>
      </div>
    </div>
  );
};
