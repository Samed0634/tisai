
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export const AppHeader = () => {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-6 bg-background border-b">
      <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
        <img 
          src="/lovable-uploads/17321130-c47f-4bb1-ab57-2d353f54c2eb.png" 
          alt="Toplu İş Sözleşmesi Otomasyonu Logo" 
          className="h-6 w-6 object-contain rounded-full border-2 border-primary/20" 
        />
        <span className="font-bold text-lg ml-2 text-secondary-800">Toplu İş Sözleşmesi Otomasyonu</span>
      </div>
    </div>
  );
};
