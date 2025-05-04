
import { useState, useEffect, useCallback } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { checkTrialStatus, handleRememberMe } from "@/utils/authUtils";

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const checkUserTrialStatus = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    return checkTrialStatus(user.id, (to) => {
      if (location.pathname !== to) {
        navigate(to);
      }
    });
  }, [user, navigate, location.pathname]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log(`Auth state changed: ${event}`, currentSession ? "Session active" : "No session");
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check trial status when auth state changes (except for logout)
        if (currentSession?.user && event !== "SIGNED_OUT") {
          setTimeout(() => {
            checkUserTrialStatus();
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
      
      // Check trial status on initial load if user is logged in
      if (currentSession?.user) {
        setTimeout(() => {
          checkUserTrialStatus();
        }, 0);
      }
    }).catch(error => {
      console.error("Error getting session:", error);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkUserTrialStatus]);

  // Check trial status whenever route changes
  useEffect(() => {
    if (user && location.pathname !== "/subscription") {
      checkUserTrialStatus();
    }
  }, [location.pathname, user, checkUserTrialStatus]);

  const signIn = useCallback(async (email: string, password: string, rememberMe?: boolean) => {
    try {
      handleRememberMe(email, password, rememberMe);

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      toast({
        title: "Giriş başarılı",
        description: "Hoş geldiniz."
      });
      
      // After login, check trial status
      setTimeout(async () => {
        const trialExpired = await checkUserTrialStatus();
        
        // If trial hasn't expired and we're not already at the root page, go to dashboard
        if (!trialExpired && location.pathname !== "/") {
          navigate("/");
        }
      }, 500);
      
    } catch (error: any) {
      toast({
        title: "Giriş başarısız",
        description: error?.message || "E-posta veya şifre hatalı.",
        variant: "destructive"
      });
      console.error("Login error:", error);
      throw error;
    }
  }, [toast, navigate, location.pathname, checkUserTrialStatus]);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      
      toast({
        title: "Kayıt başarılı",
        description: "Lütfen e-posta adresinizi kontrol ederek hesabınızı doğrulayın."
      });
    } catch (error: any) {
      toast({
        title: "Kayıt başarısız",
        description: error?.message || "Kayıt sırasında bir hata oluştu.",
        variant: "destructive"
      });
      console.error("Signup error:", error);
      throw error;
    }
  }, [toast]);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast({
        title: "Çıkış başarılı",
        description: "Güvenli bir şekilde çıkış yapıldı."
      });
    } catch (error: any) {
      toast({
        title: "Çıkış yapılamadı",
        description: error?.message || "Bir hata oluştu.",
        variant: "destructive"
      });
      console.error("Logout error:", error);
    }
  }, [toast]);

  return {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    checkTrialStatus: checkUserTrialStatus
  };
};
