
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { PasswordChangeDialog } from "@/components/auth/PasswordChangeDialog";
import { useAuth } from "@/hooks/useAuth";
import { UserProfile } from "../auth/UserProfile";

export const UserFooter = () => {
  const { toast } = useToast();
  const [passwordDialogOpen, setPasswordDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  const { signOut, isLoading } = useAuth();

  const handleLogout = async () => {
    await signOut();
    
    // Redirect to login page after successful logout
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    <SidebarFooter className="border-t border-sidebar-border p-4">
      <div className="flex items-center justify-between">
        <UserProfile />
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setPasswordDialogOpen(true)} 
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mr-2"
          >
            <Key className="h-4 w-4" />
            <span className="sr-only">Şifre Değiştir</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout} 
            disabled={isLoading} 
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Çıkış Yap</span>
          </Button>
        </div>
      </div>
      <PasswordChangeDialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen} />
    </SidebarFooter>
  );
};
