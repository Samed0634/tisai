
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
  loading: boolean;
  error: string | null;
  isInTrial: boolean;
  trialExpired: boolean;
  trialEnd: string | null;
  userCreatedAt: string | null;
}

export const useSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null,
    loading: true,
    error: null,
    isInTrial: false,
    trialExpired: false,
    trialEnd: null,
    userCreatedAt: null
  });
  const { toast } = useToast();

  const checkSubscription = async () => {
    setSubscriptionData(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        method: 'POST',
      });

      if (error) {
        console.error('Abonelik kontrolü hatası:', error);
        setSubscriptionData(prev => ({
          ...prev,
          loading: false,
          error: error.message || 'Abonelik durumu kontrol edilemedi'
        }));
        return;
      }

      setSubscriptionData({
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier || null,
        subscription_end: data.subscription_end || null,
        loading: false,
        error: null,
        isInTrial: data.isInTrial || false,
        trialExpired: data.trialExpired || false,
        trialEnd: data.trialEnd || null,
        userCreatedAt: data.userCreatedAt || null
      });

    } catch (err: any) {
      console.error('Abonelik kontrolünde beklenmeyen hata:', err);
      setSubscriptionData(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Abonelik durumu kontrol edilemedi'
      }));
    }
  };

  const createCheckoutSession = async (plan: 'pro' | 'plus' | 'pro-annual' | 'plus-annual') => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        method: 'POST',
        body: { plan },
      });

      if (error) {
        toast({
          title: "Ödeme sayfası oluşturulamadı",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast({
          title: "Hata",
          description: "Ödeme bağlantısı oluşturulamadı",
          variant: "destructive"
        });
      }
    } catch (err: any) {
      console.error('Ödeme sayfası oluşturma hatası:', err);
      toast({
        title: "Hata",
        description: err.message || "Ödeme işlemi başlatılamadı",
        variant: "destructive"
      });
    }
  };

  const openCustomerPortal = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        method: 'POST',
      });

      if (error) {
        toast({
          title: "Müşteri portalı açılamadı",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      // Redirect to Stripe Customer Portal
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast({
          title: "Hata",
          description: "Müşteri portalı bağlantısı oluşturulamadı",
          variant: "destructive"
        });
      }
    } catch (err: any) {
      console.error('Müşteri portalı açma hatası:', err);
      toast({
        title: "Hata",
        description: err.message || "Müşteri portalı açılamadı",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const user = supabase.auth.getUser();
    if (user) {
      checkSubscription();
    }

    // Auto-refresh when auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkSubscription();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    ...subscriptionData,
    refresh: checkSubscription,
    createCheckoutSession,
    openCustomerPortal
  };
};
