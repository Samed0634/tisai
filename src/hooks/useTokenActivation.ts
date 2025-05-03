
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
  const [activationComplete, setActivationComplete] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = useCallback(async (data: TokenActivationValues) => {
    // Don't process if already complete or in progress
    if (activationComplete || isSubmitting) return;
    
    console.log("Token activation started with data:", data);
    setIsSubmitting(true);
    setHasError(false);
    
    try {
      // First get the user session info
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
      
      // Token validation process
      console.log("Token validation starting:", data.tokenId);
      const { isValid, kurumData, error } = await validateToken(data.tokenId);
      
      if (!isValid || !kurumData) {
        console.error("Token validation failed:", error);
        toast({
          title: "Token Doğrulama Hatası",
          description: error || "Hatalı token ID. Lütfen geçerli bir token giriniz.",
          variant: "destructive"
        });
        setHasError(true);
        setIsSubmitting(false);
        return;
      }
      
      console.log("Token validation successful, institution data:", kurumData);
      
      // Create user-institution relationship
      const { error: relationError } = await supabase
        .from("kullanici_kurumlar")
        .insert({
          user_id: userId,
          kurum_id: kurumData.id,
        });
      
      if (relationError) {
        console.error("User-institution relationship creation error:", relationError);
        toast({
          title: "Aktivasyon Hatası",
          description: "Kullanıcı-kurum ilişkisi oluşturulamadı. Lütfen yöneticinizle iletişime geçiniz.",
          variant: "destructive"
        });
        setHasError(true);
        setIsSubmitting(false);
        return;
      }
      
      // Successful activation - set flag to prevent retries
      setActivationComplete(true);
      
      toast({
        title: "Aktivasyon Başarılı",
        description: "Hesabınız başarıyla aktive edildi. Sisteme yönlendiriliyorsunuz.",
      });
      
      // Navigate after a short delay to ensure state updates and toast display
      console.log("Redirecting to home page after successful activation");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
      
    } catch (error: any) {
      console.error("Activation process error:", error);
      toast({
        title: "Aktivasyon Hatası",
        description: error?.message || "Aktivasyon sırasında bir hata oluştu. Lütfen tekrar deneyiniz.",
        variant: "destructive"
      });
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate, toast, validateToken, activationComplete, isSubmitting]);

  const isProcessing = isValidating || isSubmitting;

  return {
    handleSubmit,
    isProcessing,
    activationComplete,
    hasError
  };
};
