
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarFooter } from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const UserFooter = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      // First check if there's an active session
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (sessionData && sessionData.session) {
        // Only attempt to sign out if there's an active session
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        toast({
          title: "Çıkış başarılı",
          description: "Güvenli bir şekilde çıkış yapıldı."
        });
      } else {
        // If no session exists, just redirect to login
        toast({
          title: "Oturum bulunamadı",
          description: "Zaten çıkış yapılmış durumda. Giriş sayfasına yönlendiriliyorsunuz."
        });
      }
      
      // Redirect to login page regardless of whether there was an active session
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Çıkış yapılamadı",
        description: error?.message || "Bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarFooter className="border-t border-sidebar-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/bd1dfeb7-b564-43a4-a738-daeaf281196d.png" 
            alt="TİS Uzmanı" 
            className="h-10 w-10 rounded-full object-cover border-2 border-sidebar-primary/20" 
          />
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-sidebar-foreground">TİS Uzmanı</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLogout}
          disabled={isLoading}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </SidebarFooter>
  );
};
