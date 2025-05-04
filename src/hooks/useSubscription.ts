
import { useContext } from 'react';
import { SubscriptionContext, SubscriptionContextType } from '@/context/SubscriptionContext';

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  
  return context;
};

// Export the SubscriptionProvider for convenience
export { SubscriptionProvider } from '@/providers/SubscriptionProvider';
