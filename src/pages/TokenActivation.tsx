
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TokenActivationForm } from "@/components/auth/TokenActivationForm";
import { useTokenActivation } from "@/hooks/useTokenActivation";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const TokenActivation = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { handleSubmit, isProcessing, activationAttempted } = useTokenActivation();
  const { toast } = useToast();

  useEffect(() => {
    // If token is provided in URL, submit it automatically
    if (token && !activationAttempted) {
      console.log("URL'den token alındı, aktivasyon başlatılıyor:", token);
      handleSubmit({ tokenId: token });
    }
  }, [token, handleSubmit, activationAttempted]);

  // Check localStorage for any pending token from failed auth redirect
  useEffect(() => {
    const pendingToken = localStorage.getItem("pendingActivationToken");
    if (pendingToken && !token && !activationAttempted) {
      console.log("localStorage'dan bekleyen token alındı:", pendingToken);
      handleSubmit({ tokenId: pendingToken });
      // Clear the pending token after use
      localStorage.removeItem("pendingActivationToken");
    }
  }, [token, handleSubmit, activationAttempted]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <img
              alt="TİS Takip Sistemi Logo"
              className="h-16 w-16 object-contain rounded-full border-2 border-primary/20"
              src="/lovable-uploads/733693aa-684f-4a0c-9a55-a65f5b9ee373.png"
            />
          </div>
          <div className="text-center text-2xl font-bold text-foreground mb-2">TISAI</div>
          <CardTitle className="text-lg font-semibold text-center">
            {token ? "Token Aktivasyonu" : "Hesap Aktivasyonu"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {token && isProcessing ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <LoadingSpinner />
              <p className="text-center text-muted-foreground">Token doğrulanıyor, lütfen bekleyiniz...</p>
              {activationAttempted && (
                <p className="text-center text-sm text-primary">
                  Aktivasyon işlemi başarılı olursa otomatik olarak ana sayfaya yönlendirileceksiniz.
                </p>
              )}
            </div>
          ) : (
            <TokenActivationForm />
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TokenActivation;
