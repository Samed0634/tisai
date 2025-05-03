
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SignupFormActionsProps {
  isProcessing: boolean;
}

export const SignupFormActions: React.FC<SignupFormActionsProps> = ({ isProcessing }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-2 space-y-2">
      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            İşlem Yapılıyor
          </>
        ) : (
          "Kayıt Ol"
        )}
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        className="w-full" 
        onClick={() => navigate('/login')}
        disabled={isProcessing}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Geri Dön
      </Button>
    </div>
  );
};
