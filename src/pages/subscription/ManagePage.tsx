
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, FileText, BarChart, RefreshCw, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSubscription } from '@/hooks/useSubscription';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const SubscriptionManagePage = () => {
  const navigate = useNavigate();
  const { 
    subscribed, 
    subscription_tier, 
    subscription_end, 
    loading, 
    refresh, 
    openCustomerPortal 
  } = useSubscription();

  useEffect(() => {
    refresh();
  }, []);

  const formatSubscriptionEnd = (date: string | null) => {
    if (!date) return 'Bilinmiyor';
    
    try {
      return format(new Date(date), "d MMMM yyyy", { locale: tr });
    } catch (err) {
      return date;
    }
  };

  if (loading) {
    return (
      <div className="container max-w-3xl mx-auto py-16 px-4 text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto text-green-500" />
        <p className="mt-4">Abonelik bilgileri yükleniyor...</p>
      </div>
    );
  }

  if (!subscribed) {
    return (
      <div className="container max-w-3xl mx-auto py-16 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Aktif Abonelik Bulunamadı</h1>
          <p className="text-muted-foreground">
            Şu anda aktif bir aboneliğiniz bulunmuyor. Premium özelliklere erişmek için bir plan seçin.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={() => navigate('/subscription')}>
            Abonelik Planlarını Gör
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Abonelik Yönetimi</h1>
        <p className="text-muted-foreground">
          Mevcut abonelik planınızı yönetin ve premium özelliklere erişin
        </p>
      </div>

      <Card className="mb-8 border-green-500/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="bg-green-500/10 text-green-600 text-sm px-3 py-1 rounded-full font-medium inline-block">
                {subscription_tier === "Trial" ? "Deneme" : `${subscription_tier} Plan`}
              </div>
              <h3 className="text-xl font-medium mt-2">Aktif Abonelik</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Bitiş tarihi: {formatSubscriptionEnd(subscription_end)}
              </p>
            </div>

            <Button
              onClick={openCustomerPortal}
              className="flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Ödeme Yönetimi
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 hover:bg-secondary/5 transition-colors cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <FileText className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="font-medium text-lg mb-1">TİS Belgeleri</h3>
            <p className="text-sm text-muted-foreground">
              Tüm belgelerinize erişin ve indirin
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:bg-secondary/5 transition-colors cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <BarChart className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="font-medium text-lg mb-1">Raporlar</h3>
            <p className="text-sm text-muted-foreground">
              Gelişmiş istatistiklere ve raporlara erişin
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:bg-secondary/5 transition-colors cursor-pointer" onClick={openCustomerPortal}>
          <div className="flex flex-col items-center text-center">
            <LogOut className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="font-medium text-lg mb-1">İptal Et</h3>
            <p className="text-sm text-muted-foreground">
              Aboneliğinizi istediğiniz zaman iptal edebilirsiniz
            </p>
          </div>
        </Card>
      </div>

      <div className="text-center">
        <Button variant="outline" onClick={() => navigate('/subscription')}>
          Abonelik Planlarına Dön
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionManagePage;
