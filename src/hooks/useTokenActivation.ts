
import { useState, useCallback } from "react";
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

  const handleSubmit = useCallback(async (data: TokenActivationValues) => {
    console.log("Token activation started with data:", data);
    setIsSubmitting(true);
    
    try {
      // Önce kullanıcının oturum bilgisini al
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session || !sessionData.session.user) {
        toast({
          title: "Oturum Hatası",
          description: "Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapınız.",
          variant: "destructive"
        });
        navigate("/login", { replace: true });
        return;
      }
      
      const userId = sessionData.session.user.id;
      console.log("User ID for token activation:", userId);
      
      // Token doğrulama işlemi
      console.log("Token doğrulama başlıyor:", data.tokenId);
      const { isValid, kurumData, error } = await validateToken(data.tokenId);
      
      if (!isValid || !kurumData) {
        console.error("Token doğrulama başarısız:", error);
        setIsSubmitting(false);
        return; // Error messages handled in the validateToken function
      }
      
      console.log("Token doğrulama başarılı, kurum bilgileri:", kurumData);
      
      // Kullanıcı-kurum ilişkisini oluştur
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
      
      // Başarılı aktivasyon
      toast({
        title: "Aktivasyon Başarılı",
        description: "Hesabınız başarıyla aktive edildi. Sisteme yönlendiriliyorsunuz.",
      });
      
      // Ana sayfaya yönlendir - Immediate redirection with replace to prevent going back
      console.log("Redirecting to home page after successful activation");
      navigate("/", { replace: true });
      
    } catch (error: any) {
      console.error("Aktivasyon işlemi hatası:", error);
      toast({
        title: "Aktivasyon Hatası",
        description: error?.message || "Aktivasyon sırasında bir hata oluştu. Lütfen tekrar deneyiniz.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate, toast, validateToken]);

  const isProcessing = isValidating || isSubmitting;

  return {
    handleSubmit,
    isProcessing
  };
};
