import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkTrialStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const checkTrialStatus = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Check if user's trial has expired
      const { data, error } = await supabase.rpc('has_trial_expired', { 
        user_id: user.id 
      });
      
      if (error) throw error;
      
      // If trial expired and user is not on the subscription page, redirect
      if (data === true && location.pathname !== "/subscription") {
        toast({
          title: "Deneme Süresi Sona Erdi",
          description: "Hizmeti kullanmaya devam etmek için lütfen bir abonelik planı seçin.",
          variant: "destructive"
        });
        
        navigate("/subscription");
        return true;
      }
      
      return data === true;
    } catch (error) {
      console.error("Trial status check error:", error);
      return false;
    }
  };

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
            checkTrialStatus();
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
          checkTrialStatus();
        }, 0);
      }
    }).catch(error => {
      console.error("Error getting session:", error);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check trial status whenever route changes
  useEffect(() => {
    if (user && location.pathname !== "/subscription") {
      checkTrialStatus();
    }
  }, [location.pathname, user]);

  const signIn = useCallback(async (email: string, password: string, rememberMe?: boolean) => {
    try {
      // Handle the "Remember Me" feature
      if (rememberMe) {
        localStorage.setItem("remembered_email", email);
        localStorage.setItem("remembered_password", password);
        localStorage.setItem("remember_me", "true");
      } else {
        localStorage.removeItem("remembered_email");
        localStorage.removeItem("remembered_password");
        localStorage.removeItem("remember_me");
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      toast({
        title: "Giriş başarılı",
        description: "Hoş geldiniz."
      });
      
      // After login, check trial status
      setTimeout(async () => {
        const trialExpired = await checkTrialStatus();
        
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
  }, [toast, navigate, location.pathname]);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
      });
      
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

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut, checkTrialStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
