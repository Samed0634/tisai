
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useSubscription } from '@/hooks/useSubscription';

const SubscriptionSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { refresh } = useSubscription();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(true);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    const updateSubscriptionState = async () => {
      try {
        setIsRefreshing(true);
        // Trigger a refresh of subscription state in the database
        await refresh();
        // Wait a bit for the state to update
        setTimeout(() => {
          setIsRefreshing(false);
        }, 2000);
      } catch (error) {
        console.error("Subscription refresh error:", error);
        setIsRefreshing(false);
      }
    };
    
    if (sessionId) {
      updateSubscriptionState();
    } else {
      setIsRefreshing(false);
    }
  }, []);

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card className="border-green-200">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-center text-2xl">Abonelik İşlemi Başarılı!</CardTitle>
          <CardDescription className="text-center">
            Aboneliğiniz başarıyla aktifleştirildi.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isRefreshing ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-green-500 mr-2" />
              <span>Abonelik durumunuz güncelleniyor...</span>
            </div>
          ) : (
            <div className="text-center py-2 text-muted-foreground">
              <p>Premium özelliklere erişebilirsiniz.</p> 
              <p>Aboneliğinizi Abonelik sayfasından yönetebilirsiniz.</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate('/subscription/manage')} className="gap-2">
            Devam Et <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionSuccessPage;
