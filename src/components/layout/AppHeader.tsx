
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export const AppHeader = () => {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div className="sticky top-0 z-10 flex items-center h-14 px-4 bg-white border-b border-gray-200">
      <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
        <img 
          src="/lovable-uploads/17321130-c47f-4bb1-ab57-2d353f54c2eb.png" 
          alt="Toplu İş Sözleşmesi Otomasyonu Logo" 
          className="h-6 w-6 object-contain rounded-full border-2 border-primary/20" 
        />
        <span className="font-medium text-sm ml-2 text-gray-700">
          Toplu İş Sözleşmesi Otomasyon Sistemi
        </span>
      </div>
    </div>
  );
};
