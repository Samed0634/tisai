
import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const SubscriptionPlans: React.FC = () => {
  const { 
    subscribed, 
    subscription_tier, 
    subscription_end, 
    loading, 
    error, 
    createCheckoutSession,
    openCustomerPortal,
    refresh
  } = useSubscription();
  
  const { toast } = useToast();
  
  React.useEffect(() => {
    // Auto-refresh subscription status on page load
    refresh();
  }, []);

  const handleSelectPlan = async (plan: 'pro' | 'plus') => {
    // Check authentication state before proceeding
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      toast({
        title: "Giriş Gerekli",
        description: "Abonelik işlemleri için önce giriş yapmalısınız",
        variant: "destructive"
      });
      return;
    }
    
    createCheckoutSession(plan);
  };

  const handleManageSubscription = () => {
    openCustomerPortal();
  };

  const formatSubscriptionEnd = (date: string | null) => {
    if (!date) return null;
    
    try {
      return format(new Date(date), "d MMMM yyyy", { locale: tr });
    } catch (err) {
      return date;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Abonelik bilgileri yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-md mx-auto text-center">
        <p className="text-destructive font-medium">Bir hata oluştu</p>
        <p className="text-muted-foreground mt-2">{error}</p>
        <Button onClick={refresh} variant="outline" className="mt-4">
          Yeniden Dene
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Abonelik Planları</h1>
        <p className="text-muted-foreground">
          İhtiyaçlarınıza uygun bir plan seçin
        </p>
        {subscribed && subscription_end && (
          <div className="mt-4 p-2 bg-primary/10 inline-block rounded-md">
            <p className="text-sm font-medium">
              {subscription_tier} planınız {formatSubscriptionEnd(subscription_end)} tarihine kadar aktif
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        <SubscriptionCard
          title="Plus Plan"
          price="₺299"
          description="Temel özellikler ve sınırlı erişim"
          features={[
            "Toplu İş Sözleşmesi Oluşturma",
            "Belgelerin PDF olarak indirilmesi",
            "Temel istatistikler",
            "E-posta desteği"
          ]}
          isActive={subscribed && subscription_tier === "Plus"}
          buttonText={subscribed && subscription_tier === "Plus" ? "Aktif Plan" : "Planı Seç"}
          onSelect={() => handleSelectPlan('plus')}
          disabled={subscribed && subscription_tier === "Plus"}
        />

        <SubscriptionCard
          title="Pro Plan"
          price="₺599"
          description="Tam özellikler ve sınırsız erişim"
          features={[
            "Plus planındaki tüm özellikler",
            "Gelişmiş istatistikler ve raporlama",
            "Sınırsız belge oluşturma",
            "Öncelikli destek",
            "API erişimi"
          ]}
          isActive={subscribed && subscription_tier === "Pro"}
          buttonText={subscribed && subscription_tier === "Pro" ? "Aktif Plan" : "Planı Seç"}
          onSelect={() => handleSelectPlan('pro')}
          disabled={subscribed && subscription_tier === "Pro"}
        />
      </div>

      {subscribed && (
        <div className="text-center">
          <Button variant="outline" onClick={handleManageSubscription}>
            Abonelik Yönetimi
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
