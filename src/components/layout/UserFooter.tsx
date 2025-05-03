
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

export const UserFooter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      
      // Redirect to login page after successful logout
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };
  
  return <SidebarFooter className="border-t border-sidebar-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img alt="TİS Uzmanı" className="h-10 w-10 rounded-full object-cover border-2 border-sidebar-primary/20" src="/lovable-uploads/d541767c-601b-490e-8633-5d565d96ed7d.jpg" />
          <div className="space-y-0.5">
            <p className="font-medium text-sidebar-foreground text-xs">(Kurum Logo ve Adı)</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} disabled={isLoading} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </SidebarFooter>;
};
