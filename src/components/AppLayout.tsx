
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarProvider 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BarChart2, CalendarDays, Home, LogOut, MessageCircle, Plus, RefreshCw, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, Outlet } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout işlemleri
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar className="w-64">
          <SidebarHeader className="flex items-center gap-2 px-6 py-5 border-b">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-6 w-6 text-primary-500" />
              <span className="font-bold text-xl text-secondary-800">TİS Prosedür</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-3 py-4">
            <nav className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Anasayfa
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate("/actions")}
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                İşlem Seç
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate("/new-data")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Yeni Veri
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate("/update-data")}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Veri Güncelle
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate("/chatbot")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Bilgi Al
              </Button>

              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate("/calendar")}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                Takvim
              </Button>
            </nav>
          </SidebarContent>
          
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary-100 text-primary-700">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Kullanıcı</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
