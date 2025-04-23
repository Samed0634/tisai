
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
        <Sidebar className="w-64">
          <SidebarHeader className="flex items-center gap-2 px-6 py-5 border-b">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/17321130-c47f-4bb1-ab57-2d353f54c2eb.png" 
                alt="Toplu İş Sözleşmesi Otomasyonu Logo" 
                className="h-6 w-6 object-contain rounded-full border-2 border-primary/20" 
              />
              <span className="font-bold text-xl text-secondary-800">TISAI</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <Navigation />
          </SidebarContent>
          <UserFooter />
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;

