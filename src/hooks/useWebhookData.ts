
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface WebhookResponse {
  yetkiTespiti: number;
  yetkiBelgesi: number;
}

const fetchWebhookData = async (): Promise<WebhookResponse> => {
  const response = await fetch('https://primary-production-dcf9.up.railway.app/webhook-test/terminsorgu', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

export const useWebhookData = () => {
  const { toast } = useToast();
  
  const { data, isError } = useQuery({
    queryKey: ['webhookData'],
    queryFn: fetchWebhookData,
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Hata",
        description: "Veri yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  return { webhookData: data };
};
