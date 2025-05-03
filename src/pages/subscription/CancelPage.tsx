
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const SubscriptionCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card className="border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-gray-500" />
          </div>
          <CardTitle className="text-center text-2xl">İşlem İptal Edildi</CardTitle>
          <CardDescription className="text-center">
            Abonelik işlemi tamamlanmadı.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center py-2 text-muted-foreground">
          <p>Abonelik işleminiz tamamlanmadı. İsterseniz farklı bir plan seçebilir veya daha sonra tekrar deneyebilirsiniz.</p>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate('/subscription')} className="gap-2">
            Planlara Dön <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionCancelPage;
