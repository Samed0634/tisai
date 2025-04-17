
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export const AppHeader = () => {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-6 bg-background border-b">
      <div className="md:hidden flex items-center">
        <img 
          src="/lovable-uploads/17321130-c47f-4bb1-ab57-2d353f54c2eb.png" 
          alt="TİSAI.v1 Logo" 
          className="h-6 w-6 object-contain rounded-full border-2 border-primary/20" 
        />
        <span className="font-bold text-lg ml-2 text-secondary-800">TİSAI.v1</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleSidebar}
        className="flex items-center gap-2 ml-auto"
      >
        <Menu className="h-4 w-4" />
        {!isMobile && "İşlemlerim"}
      </Button>
    </div>
  );
};
