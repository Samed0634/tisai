
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TokenActivationForm } from "@/components/auth/TokenActivationForm";

const TokenActivation = () => {
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
            Hesap Aktivasyonu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TokenActivationForm />
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
