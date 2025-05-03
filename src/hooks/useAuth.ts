
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LoginFormValues } from "@/schemas/authSchemas";
import { useKurumConnectionCheck } from "./useKurumConnectionCheck";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkUserKurumConnection } = useKurumConnectionCheck();

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
