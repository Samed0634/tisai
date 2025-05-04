
import React from 'react';
import KurumRegistrationForm from "@/components/kurum/KurumRegistrationForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { useKurumStatus } from "@/hooks/useKurumStatus";

const KurumKayit: React.FC = () => {
  const { hasKurum, loading } = useKurumStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Kurum Kayıt</h1>

      {hasKurum ? (
        <Alert className="bg-green-50 border-green-200 mb-6">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <AlertTitle>Kurumunuz zaten kayıtlı</AlertTitle>
          <AlertDescription>
            Sisteme daha önce kurumunuzu kaydettiniz. Abonelik planları sayfasından 
            abonelik işlemlerinizi yönetebilirsiniz.
          </AlertDescription>
        </Alert>
      ) : (
        <KurumRegistrationForm />
      )}
    </div>
  );
};

export default KurumKayit;
