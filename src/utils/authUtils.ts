
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const checkTrialStatus = async (userId: string, redirectCallback?: (to: string) => void): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    // Check if user's trial has expired
    const { data, error } = await supabase.rpc('has_trial_expired', { 
      user_id: userId 
    });
    
    if (error) throw error;
    
    // If trial expired and redirect callback is provided
    if (data === true && redirectCallback) {
      toast({
        title: "Deneme Süresi Sona Erdi",
        description: "Hizmeti kullanmaya devam etmek için lütfen bir abonelik planı seçin.",
        variant: "destructive"
      });
      
      redirectCallback("/subscription");
    }
    
    return data === true;
  } catch (error) {
    console.error("Trial status check error:", error);
    return false;
  }
};

export const handleRememberMe = (email: string, password: string, rememberMe?: boolean) => {
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
};
