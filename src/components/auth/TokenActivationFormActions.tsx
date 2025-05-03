
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TokenActivationFormActionsProps {
  isProcessing: boolean;
}

export const TokenActivationFormActions: React.FC<TokenActivationFormActionsProps> = ({ isProcessing }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      toast({
        title: "Çıkış Hatası",
        description: "Çıkış yapılırken bir hata oluştu.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="pt-2 space-y-2">
      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Doğrulanıyor
          </>
        ) : (
          "Hesabı Aktive Et"
        )}
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        className="w-full" 
        onClick={handleLogout}
        disabled={isProcessing}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Çıkış Yap ve Giriş Sayfasına Dön
      </Button>
    </div>
  );
};
