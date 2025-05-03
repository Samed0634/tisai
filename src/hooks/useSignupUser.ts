
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SignupUserParams {
  email: string;
  password: string;
}

interface SignupResult {
  success: boolean;
  userId?: string;
  error?: Error;
}

export const useSignupUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const signupUser = async ({ email, password }: SignupUserParams): Promise<SignupResult> => {
    setIsLoading(true);
    try {
      console.log("Kullanıcı oluşturuluyor:", email);
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      console.log("Auth kayıt sonucu:", { authData, authError });

      if (authError) {
        let errorMessage = "Kullanıcı oluşturulamadı.";
        if (authError.message.includes("User already registered")) {
          errorMessage = "Bu e-posta adresi zaten kayıtlı. Lütfen giriş yapınız veya başka bir e-posta adresi deneyiniz.";
        }
        throw new Error(errorMessage);
      }

      if (!authData.user) {
        throw new Error("Kullanıcı oluşturulamadı. Lütfen tekrar deneyiniz.");
      }

      toast({
        title: "Hesap Oluşturuldu",
        description: "Hesabınız oluşturuldu. Şimdi kurum token ID'nizi girerek aktivasyonu tamamlayınız.",
      });

      return { success: true, userId: authData.user.id };
    } catch (error: any) {
      console.error("Kayıt işlemi hatası:", error);
      toast({
        title: "Kayıt Hatası",
        description: error?.message || "Kayıt işlemi sırasında bir hata oluştu.",
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { signupUser, isLoading };
};
