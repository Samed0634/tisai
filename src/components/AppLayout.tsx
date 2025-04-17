import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarProvider,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BarChart2, Home, LogOut, MessageCircle, Plus, RefreshCw, Upload, User, List, FileText, Search, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// Create a header component with the toggle button
const AppHeader = () => {
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

const AppLayout = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigationItems = [
    {
      title: "Anasayfa",
      icon: Home,
      path: "/"
    },
    {
      title: "Yeni Veri",
      icon: Plus,
      path: "/new-data"
    },
    {
      title: "Veri Güncelle",
      icon: RefreshCw,
      path: "/update-data"
    },
    {
      title: "Bağıtlanan TİS Yükleme",
      icon: Upload,
      path: "/upload-tis"
    },
    {
      title: "Prosedür Bilgi Botu",
      icon: MessageCircle,
      path: "/procedure-bot"
    },
    {
      title: "TİS Bilgi Botu",
      icon: MessageCircle,
      path: "/tis-bot"
    },
    {
      title: "Tüm Prosedür Durumu",
      icon: List,
      path: "/procedure-status"
    },
    {
      title: "İhtar Yazısı Yaz",
      icon: FileText,
      path: "/write-legal-notice"
    },
    {
      title: "Yargı Kararı Sor",
      icon: Search,
      path: "/court-decision-query"
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar className="w-64">
          <SidebarHeader className="flex items-center gap-2 px-6 py-5 border-b">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/17321130-c47f-4bb1-ab57-2d353f54c2eb.png" 
                alt="TİSAI.v1 Logo" 
                className="h-6 w-6 object-contain rounded-full border-2 border-primary/20" 
              />
              <span className="font-bold text-xl text-secondary-800">TİSAI.v1</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-3 py-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Button 
                  key={item.path}
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              ))}
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
