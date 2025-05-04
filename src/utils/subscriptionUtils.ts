
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const createCheckoutSession = async (plan: 'pro' | 'plus' | 'pro-annual' | 'plus-annual'): Promise<string | null> => {
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
      return null;
    }

    return data?.url || null;
  } catch (err: any) {
    console.error('Ödeme sayfası oluşturma hatası:', err);
    toast({
      title: "Hata",
      description: err.message || "Ödeme işlemi başlatılamadı",
      variant: "destructive"
    });
    return null;
  }
};

export const openCustomerPortal = async (): Promise<string | null> => {
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
      return null;
    }

    return data?.url || null;
  } catch (err: any) {
    console.error('Müşteri portalı açma hatası:', err);
    toast({
      title: "Hata",
      description: err.message || "Müşteri portalı açılamadı",
      variant: "destructive"
    });
    return null;
  }
};

export const fetchSubscriptionData = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('check-subscription', {
      method: 'POST',
    });

    if (error) {
      console.error('Abonelik kontrolü hatası:', error);
      return {
        error: error.message || 'Abonelik durumu kontrol edilemedi',
        data: null
      };
    }

    return { error: null, data };
  } catch (err: any) {
    console.error('Abonelik kontrolünde beklenmeyen hata:', err);
    return {
      error: err.message || 'Abonelik durumu kontrol edilemedi',
      data: null
    };
  }
};
