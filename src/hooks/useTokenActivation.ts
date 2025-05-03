
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
        setIsSubmitting(false);
        return; // Error messages handled in the validateToken function
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
        setIsSubmitting(false);
        return;
      }
      
      // Successful activation
      toast({
        title: "Aktivasyon Başarılı",
        description: "Hesabınız başarıyla aktive edildi. Sisteme yönlendiriliyorsunuz.",
      });
      
      // Use a small timeout to ensure state updates are processed before navigation
      setTimeout(() => {
        console.log("Redirecting to home page after successful activation");
        navigate("/", { replace: true });
      }, 500);
      
    } catch (error: any) {
      console.error("Activation process error:", error);
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
