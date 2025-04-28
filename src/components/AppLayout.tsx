
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarProvider,
  SidebarContent
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./layout/AppHeader";
import { Navigation } from "./layout/Navigation";
import { UserFooter } from "./layout/UserFooter";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
          <SidebarHeader className="flex items-center gap-2 px-6 py-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/2503bb8e-1872-4808-80a2-68c145792639.png" 
                alt="TISAI Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="font-semibold text-lg text-white">TISAI</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <Navigation />
          </SidebarContent>
          <UserFooter />
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
