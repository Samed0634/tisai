
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useKurumStatus } from '@/hooks/useKurumStatus';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { addDays, formatDistanceToNow, differenceInDays } from 'date-fns';

const SubscriptionPlans: React.FC = () => {
  const { 
    subscribed, 
    subscription_tier, 
    subscription_end, 
    loading, 
    isInTrial,
    trialExpired,
    trialEnd,
    userCreatedAt,
    error, 
    refresh,
    createCheckoutSession,
    openCustomerPortal
  } = useSubscription();
  
  const { toast } = useToast();
  const [selectedBillingCycle, setSelectedBillingCycle] = React.useState<'monthly' | 'annual'>('monthly');
  const navigate = useNavigate();
  const { hasKurum, loading: loadingKurumStatus } = useKurumStatus();
  const { user, checkTrialStatus } = useAuth();
  
  useEffect(() => {
    // Auto-refresh subscription status on page load
    refresh();

    // Regular check of trial status
    const checkTrialStatusInterval = setInterval(() => {
      checkTrialStatus();
    }, 60000); // Check every minute

    // Cleanup interval on unmount
    return () => clearInterval(checkTrialStatusInterval);
  }, [refresh, checkTrialStatus]);
  
  useEffect(() => {
    // Redirect to institution registration if user doesn't have one
    if (!loadingKurumStatus && !hasKurum && user) {
      toast({
        title: "Kurum Kaydı Gerekli",
        description: "Abonelik planlarını görüntüleyebilmek için önce kurumunuzu kaydetmeniz gerekmektedir.",
        variant: "destructive"
      });
      navigate('/kurum-kayit');
    }
    
    // Check if user is on expired trial and not subscribed
    if (!loading && trialExpired && !subscribed && user) {
      toast({
        title: "Deneme Süreniz Sona Erdi",
        description: "Hizmeti kullanmaya devam etmek için lütfen bir abonelik planı seçin.",
        variant: "destructive"
      });
    }
  }, [hasKurum, loadingKurumStatus, navigate, loading, trialExpired, subscribed, user]);

  const handleSelectPlan = async (plan: 'pro' | 'plus' | 'pro-annual' | 'plus-annual') => {
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
    
    // Check if user has registered an institution
    if (!hasKurum) {
      toast({
        title: "Kurum Kaydı Gerekli",
        description: "Abonelik planlarını seçebilmek için önce kurumunuzu kaydetmeniz gerekmektedir.",
        variant: "destructive"
      });
      navigate('/kurum-kayit');
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
  
  const getTrialInfo = () => {
    if (!userCreatedAt) return null;
    
    try {
      const createdAt = new Date(userCreatedAt);
      const trialEndDate = addDays(createdAt, 3);
      const daysLeft = differenceInDays(trialEndDate, new Date());
      
      return {
        createdAt: format(createdAt, "d MMMM yyyy", { locale: tr }),
        trialEnd: format(trialEndDate, "d MMMM yyyy", { locale: tr }),
        daysLeft: Math.max(0, daysLeft)
      };
    } catch (err) {
      return null;
    }
  };
  
  const trialInfo = getTrialInfo();

  if (loading || loadingKurumStatus) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
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

  // If user doesn't have an institution registered, they should be redirected
  if (!hasKurum && user) {
    return null;
  }

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Abonelik Planları</h1>
        <p className="text-muted-foreground">
          İhtiyaçlarınıza uygun bir plan seçin
        </p>
        
        {/* Trial status information */}
        {isInTrial && !subscribed && trialInfo && (
          <div className="mt-4">
            <Alert className={trialExpired ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"}>
              {trialExpired ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-blue-500" />
              )}
              <AlertTitle>
                {trialExpired 
                  ? "Deneme süreniz sona erdi" 
                  : `Deneme süresi: ${trialInfo.daysLeft} gün kaldı`}
              </AlertTitle>
              <AlertDescription>
                {trialExpired 
                  ? "Hizmeti kullanmaya devam etmek için lütfen bir abonelik planı seçin." 
                  : `Hesabınız ${trialInfo.createdAt} tarihinde oluşturuldu. Deneme süreniz ${trialInfo.trialEnd} tarihine kadar devam edecek.`}
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {subscribed && subscription_end && (
          <div className="mt-4 p-2 bg-green-500/10 inline-block rounded-md">
            <p className="text-sm font-medium text-green-700">
              {subscription_tier === "Trial" ? "Deneme süreniz" : `${subscription_tier} planınız`} {formatSubscriptionEnd(subscription_end)} tarihine kadar aktif
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center mb-8">
        <Tabs 
          defaultValue="monthly" 
          className="w-full max-w-md"
          onValueChange={(value) => setSelectedBillingCycle(value as 'monthly' | 'annual')}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Aylık</TabsTrigger>
            <TabsTrigger value="annual">Yıllık <span className="ml-1 text-xs text-green-500 font-medium">%13 İndirim</span></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        {selectedBillingCycle === 'monthly' ? (
          <>
            <SubscriptionCard
              title="Plus Plan"
              price="$150"
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
              price="$70"
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
          </>
        ) : (
          <>
            <SubscriptionCard
              title="Plus Plan (Yıllık)"
              price="$1600"
              description="Temel özellikler ve sınırlı erişim"
              interval="/yıl"
              features={[
                "Toplu İş Sözleşmesi Oluşturma",
                "Belgelerin PDF olarak indirilmesi",
                "Temel istatistikler",
                "E-posta desteği",
                "Yıllık faturalama ile %13 tasarruf"
              ]}
              isActive={subscribed && subscription_tier === "Plus"}
              buttonText={subscribed && subscription_tier === "Plus" ? "Aktif Plan" : "Planı Seç"}
              onSelect={() => handleSelectPlan('plus-annual')}
              disabled={subscribed && subscription_tier === "Plus"}
            />

            <SubscriptionCard
              title="Pro Plan (Yıllık)"
              price="$750"
              description="Tam özellikler ve sınırsız erişim"
              interval="/yıl"
              features={[
                "Plus planındaki tüm özellikler",
                "Gelişmiş istatistikler ve raporlama",
                "Sınırsız belge oluşturma",
                "Öncelikli destek",
                "API erişimi",
                "Yıllık faturalama ile %13 tasarruf"
              ]}
              isActive={subscribed && subscription_tier === "Pro"}
              buttonText={subscribed && subscription_tier === "Pro" ? "Aktif Plan" : "Planı Seç"}
              onSelect={() => handleSelectPlan('pro-annual')}
              disabled={subscribed && subscription_tier === "Pro"}
            />
          </>
        )}
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
