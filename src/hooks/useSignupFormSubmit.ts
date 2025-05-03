
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import { useSignupUser } from "@/hooks/useSignupUser";
import type { SignupFormValues } from "@/schemas/signupFormSchema";

export const useSignupFormSubmit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { validateToken, isValidating } = useTokenValidation();
  const { signupUser, isLoading: isSigningUp } = useSignupUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: SignupFormValues) => {
    console.log("Form verisi:", data);
    setIsSubmitting(true);
    
    try {
      console.log("Token doğrulama başlıyor...");
      // Step 1: Validate the token
      const { isValid, kurumData, error } = await validateToken(data.tokenId);
      
      if (!isValid || !kurumData) {
        console.error("Token doğrulama başarısız:", error);
        setIsSubmitting(false);
        return; // Error messages handled in the validateToken function
      }

      console.log("Token doğrulama başarılı, kurum bilgileri:", kurumData);

      // Step 2: Sign up the user
      const { success, error: signupError } = await signupUser({
        email: data.email,
        password: data.password,
        kurumId: kurumData.id
      });

      if (success) {
        toast({
          title: "Kayıt Başarılı",
          description: "Hesabınız başarıyla oluşturuldu. Giriş yapabilirsiniz.",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        console.error("Kayıt işlemi sırasında hata:", signupError);
      }
    } catch (error: any) {
      console.error("Form işleme sırasında beklenmeyen hata:", error);
      toast({
        title: "İşlem Hatası",
        description: "Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isProcessing = isValidating || isSigningUp || isSubmitting;

  return {
    handleSubmit,
    isProcessing
  };
};
