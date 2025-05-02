
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar, SidebarHeader, SidebarProvider, SidebarContent } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./layout/AppHeader";
import { Navigation } from "./layout/Navigation";
import { UserFooter } from "./layout/UserFooter";
import { useInactivityTimeout } from "@/hooks/useInactivityTimeout";

const AppLayout = () => {
  // Initialize inactivity timeout
  useInactivityTimeout();
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
          <SidebarHeader className="flex items-center gap-2 px-6 py-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 relative overflow-hidden">
                <img 
                  alt="TISAI Logo" 
                  className="h-full w-full object-cover" 
                  src="/lovable-uploads/6e25183a-c0c6-4bc5-81cb-1862000a1413.png" 
                />
              </div>
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
