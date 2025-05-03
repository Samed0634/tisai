
import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { TokenForm } from "@/components/auth/TokenForm";
import { useKurumConnection } from "@/hooks/useKurumConnection";

const KurumAktivasyon = () => {
  const { isChecking } = useKurumConnection();
  
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[450px]">
        <CardHeader className="space-y-1">
          <AuthLogo title="Kurum Aktivasyon" />
        </CardHeader>
        
        <CardContent>
          <TokenForm />
        </CardContent>
        
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default KurumAktivasyon;
