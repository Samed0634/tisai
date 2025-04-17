
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Plus, 
  RefreshCw, 
  Upload, 
  MessageCircle, 
  List, 
  FileText, 
  Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export const navigationItems = [
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

export const Navigation = () => {
  const navigate = useNavigate();

  return (
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
  );
};
