
import { createContext } from "react";

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

export interface SubscriptionContextType extends SubscriptionData {
  refresh: () => Promise<void>;
  createCheckoutSession: (plan: 'pro' | 'plus' | 'pro-annual' | 'plus-annual') => Promise<void>;
  openCustomerPortal: () => Promise<void>;
}

export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);
