
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SignupUserParams {
  email: string;
  password: string;
  kurumId: string;
}

export const useSignupUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const signupUser = async ({ email, password, kurumId }: SignupUserParams) => {
    setIsLoading(true);
    try {
      // Create user in Supabase Auth
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

      // Create entry in kullanici_kurumlar table
      console.log("Kurum-kullanıcı ilişkisi oluşturuluyor:", {
        user_id: authData.user.id,
        kurum_id: kurumId
      });

      const { error: relationError } = await supabase
        .from("kullanici_kurumlar")
        .insert({
          user_id: authData.user.id,
          kurum_id: kurumId,
        });

      console.log("İlişki oluşturma sonucu:", { relationError });

      if (relationError) {
        console.error("Kullanıcı-kurum ilişkisi oluşturma hatası:", relationError);
        
        // Kullanıcı oluşturuldu ama ilişki eklenemedi
        console.log("Kullanıcı oluşturuldu ama ilişki eklenemedi, kullanıcıyı manuel olarak düzeltmek gerekebilir");
        throw new Error("Kullanıcı-kurum ilişkisi oluşturulamadı. Lütfen yöneticinizle iletişime geçiniz.");
      }

      return { success: true };
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
