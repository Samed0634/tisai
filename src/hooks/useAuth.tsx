
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz"
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır"
  }),
  rememberMe: z.boolean().optional().default(false)
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if the user has a kurum connection
        checkUserKurumConnection(session.user.id);
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        checkUserKurumConnection(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Function to check if user is connected to a kurum
  const checkUserKurumConnection = async (userId: string) => {
    try {
      const { data: connections, error } = await supabase
        .from('kullanici_kurumlar')
        .select('*')
        .eq('user_id', userId)
        .limit(1);
      
      if (error) {
        console.error("Error checking kurum connection:", error);
        navigate("/");
        return;
      }
      
      if (connections && connections.length > 0) {
        // User has a kurum connection, redirect to main page
        navigate("/");
      } else {
        // User doesn't have a kurum connection, redirect to connection page
        navigate("/kurum-aktivasyon");
      }
    } catch (err) {
      console.error("Unexpected error during kurum connection check:", err);
      navigate("/");
    }
  };

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Handle the "Remember Me" feature
      if (data.rememberMe) {
        localStorage.setItem("remembered_email", data.email);
        localStorage.setItem("remembered_password", data.password);
        localStorage.setItem("remember_me", "true");
      } else {
        // Clear remembered credentials if "Remember Me" is unchecked
        localStorage.removeItem("remembered_email");
        localStorage.removeItem("remembered_password");
        localStorage.removeItem("remember_me");
      }

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Giriş başarılı",
        description: "Hoş geldiniz."
      });

      // After successful login, check if user has a kurum connection
      if (authData.user) {
        setTimeout(() => {
          checkUserKurumConnection(authData.user.id);
        }, 500);
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Giriş başarısız",
        description: error?.message || "E-posta veya şifre hatalı.",
        variant: "destructive"
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogin
  };
};
