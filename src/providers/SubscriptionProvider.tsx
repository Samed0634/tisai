
import React, { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SubscriptionContext, SubscriptionData } from '@/context/SubscriptionContext';
import { createCheckoutSession, openCustomerPortal, fetchSubscriptionData } from '@/utils/subscriptionUtils';

const initialSubscriptionState: SubscriptionData = {
  subscribed: false,
  subscription_tier: null,
  subscription_end: null,
  loading: true,
  error: null,
  isInTrial: false,
  trialExpired: false,
  trialEnd: null,
  userCreatedAt: null
};

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>(initialSubscriptionState);

  const checkSubscription = async () => {
    setSubscriptionData(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await fetchSubscriptionData();

    if (error) {
      setSubscriptionData(prev => ({
        ...prev,
        loading: false,
        error
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
  };

  const handleCreateCheckoutSession = async (plan: 'pro' | 'plus' | 'pro-annual' | 'plus-annual') => {
    const url = await createCheckoutSession(plan);
    if (url) {
      window.location.href = url;
    }
  };

  const handleOpenCustomerPortal = async () => {
    const url = await openCustomerPortal();
    if (url) {
      window.location.href = url;
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

  const contextValue = {
    ...subscriptionData,
    refresh: checkSubscription,
    createCheckoutSession: handleCreateCheckoutSession,
    openCustomerPortal: handleOpenCustomerPortal
  };

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};
