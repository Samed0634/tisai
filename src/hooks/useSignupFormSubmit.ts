
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSignupUser } from "@/hooks/useSignupUser";
import type { SignupFormValues } from "@/schemas/signupFormSchema";

export const useSignupFormSubmit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signupUser, isLoading: isSigningUp } = useSignupUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: SignupFormValues) => {
    console.log("Form verisi:", data);
    setIsSubmitting(true);
    
    try {
      // Step 1: Sign up the user
      const { success, userId, error: signupError } = await signupUser({
        email: data.email,
        password: data.password
      });

      if (success && userId) {
        toast({
          title: "Kayıt Başarılı",
          description: "Hesabınız oluşturuldu. Şimdi kurum token ID ile aktivasyon yapmanız gerekiyor.",
        });

        // Redirect to token activation page
        navigate("/token-activation");
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

  const isProcessing = isSigningUp || isSubmitting;

  return {
    handleSubmit,
    isProcessing
  };
};
