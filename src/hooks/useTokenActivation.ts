
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import type { TokenActivationValues } from "@/schemas/signupFormSchema";

export const useTokenActivation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { validateToken, isValidating } = useTokenValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activationAttempted, setActivationAttempted] = useState(false);

  const handleSubmit = async (data: TokenActivationValues) => {
    // Prevent multiple activation attempts
    if (activationAttempted || isSubmitting) {
      console.log("Activation already attempted or in progress, skipping...");
      return;
    }

    setIsSubmitting(true);
    setActivationAttempted(true);
    
    try {
      // Get current user session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session || !sessionData.session.user) {
        toast({
          title: "Oturum Hatası",
          description: "Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapınız.",
          variant: "destructive"
        });
        navigate("/login");
        return;
      }
      
      const userId = sessionData.session.user.id;
      
      // Validate token
      console.log("Token doğrulama başlıyor:", data.tokenId);
      const { isValid, kurumData, error } = await validateToken(data.tokenId);
      
      if (!isValid || !kurumData) {
        console.error("Token doğrulama başarısız:", error);
        toast({
          title: "Token Doğrulama Hatası",
          description: error || "Token doğrulanamadı. Lütfen geçerli bir token giriniz.",
          variant: "destructive"
        });
        
        // Delay before redirecting to login on error
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        
        setIsSubmitting(false);
        return;
      }
      
      console.log("Token doğrulama başarılı, kurum bilgileri:", kurumData);
      
      // Create user-kurum relation
      const { error: relationError } = await supabase
        .from("kullanici_kurumlar")
        .insert({
          user_id: userId,
          kurum_id: kurumData.id,
        });
      
      if (relationError) {
        console.error("Kullanıcı-kurum ilişkisi oluşturma hatası:", relationError);
        toast({
          title: "Aktivasyon Hatası",
          description: "Kullanıcı-kurum ilişkisi oluşturulamadı. Lütfen yöneticinizle iletişime geçiniz.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Successful activation
      toast({
        title: "Aktivasyon Başarılı",
        description: `${kurumData.kurum_adi} kurumuna başarıyla bağlandınız. Ana sayfaya yönlendiriliyorsunuz.`,
      });
      
      // Redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error: any) {
      console.error("Aktivasyon işlemi hatası:", error);
      toast({
        title: "Aktivasyon Hatası",
        description: error?.message || "Aktivasyon sırasında bir hata oluştu. Lütfen tekrar deneyiniz.",
        variant: "destructive"
      });
      
      // Reset activation attempt flag on error
      setActivationAttempted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isProcessing = isValidating || isSubmitting;

  return {
    handleSubmit,
    isProcessing,
    activationAttempted
  };
};
