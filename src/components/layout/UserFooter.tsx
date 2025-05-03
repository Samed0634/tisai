import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PasswordChangeDialog } from "@/components/auth/PasswordChangeDialog";
export const UserFooter = () => {
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // First perform a simple signOut without checking for session
      // This is more reliable and will clear any local auth state
      const {
        error
      } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      } else {
        console.log("Sign out successful");
        toast({
          title: "Çıkış başarılı",
          description: "Güvenli bir şekilde çıkış yapıldı."
        });
      }

      // Redirect to login page after successful logout
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

      // Even if there's an error, still redirect to login page
      // This ensures user isn't stuck if session is already invalid
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };
  return <SidebarFooter className="border-t border-sidebar-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img alt="TİS Uzmanı" className="h-10 w-10 rounded-full object-cover border-2 border-sidebar-primary/20" src="/lovable-uploads/d541767c-601b-490e-8633-5d565d96ed7d.jpg" />
          <div className="space-y-0.5">
            
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setPasswordDialogOpen(true)} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mr-2">
            <Key className="h-4 w-4" />
            <span className="sr-only">Şifre Değiştir</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout} disabled={isLoading} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Çıkış Yap</span>
          </Button>
        </div>
      </div>
      <PasswordChangeDialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen} />
    </SidebarFooter>;
};