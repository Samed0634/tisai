
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useTokenActivation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const activateWithToken = async (token: string) => {
    if (!token.trim()) {
      setMessage("Lütfen bir token giriniz.");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      // Try to get recent signup credentials
      const signupEmail = localStorage.getItem("recent_signup_email");
      const signupPassword = localStorage.getItem("recent_signup_password");
      
      // Check if the user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // If not authenticated but we have recent credentials, sign them in
        if (signupEmail && signupPassword) {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: signupEmail,
            password: signupPassword
          });
          
          if (signInError) {
            toast({
              title: "Hata",
              description: "Oturum açılamadı, lütfen giriş yapınız.",
              variant: "destructive",
            });
            navigate("/login");
            return;
          }
          
          // Get the user object after login
          const { data: { user: newUser } } = await supabase.auth.getUser();
          if (!newUser) {
            throw new Error("Kullanıcı bilgisi alınamadı.");
          }
        } else {
          toast({
            title: "Hata",
            description: "Önce giriş yapmanız gerekmektedir.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
      }
      
      // Get user again in case we just logged in
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) {
        throw new Error("Kullanıcı bilgisi alınamadı.");
      }
      
      // Verify the token by checking the kurumlar table
      const { data: kurumData, error: kurumError } = await supabase
        .from('kurumlar')
        .select('*')
        .eq('kayit_token', token)
        .eq('token_aktif_mi', true)
        .single();
        
      if (kurumError || !kurumData) {
        setMessage("Geçersiz veya aktif olmayan token. Lütfen doğru token'ı girdiğinizden emin olun.");
        toast({
          title: "Hata",
          description: "Geçersiz veya aktif olmayan token.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Check if the token has reached its maximum usage limit
      if (kurumData.max_kullanim_sayisi !== null && 
          kurumData.token_kullanım_sayisi >= kurumData.max_kullanim_sayisi) {
        setMessage("Bu token maksimum kullanım limitine ulaşmıştır.");
        toast({
          title: "Hata",
          description: "Token kullanım limiti aşıldı.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Create a new connection between the user and the institution
      const { error: connectionError } = await supabase
        .from('kullanici_kurumlar')
        .insert({
          user_id: currentUser.id,
          kurum_id: kurumData.id,
        });
        
      if (connectionError) {
        console.error("Connection error:", connectionError);
        setMessage("Hesabınız kuruma bağlanırken bir hata oluştu. Lütfen tekrar deneyin.");
        toast({
          title: "Hata",
          description: "Bağlantı oluşturulamadı.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Increment the token usage count
      const { error: updateError } = await supabase
        .from('kurumlar')
        .update({ 
          token_kullanım_sayisi: kurumData.token_kullanım_sayisi + 1 
        })
        .eq('id', kurumData.id);
        
      if (updateError) {
        console.error("Update error:", updateError);
        // The connection was created but we couldn't update the usage count
        // We should still consider this a success
      }
      
      // Clear temporary signup credentials
      localStorage.removeItem("recent_signup_email");
      localStorage.removeItem("recent_signup_password");
      
      // Success
      setMessage(`Hesabınız "${kurumData.kurum_adi}" kurumuna başarıyla bağlandı.`);
      toast({
        title: "Başarılı",
        description: `"${kurumData.kurum_adi}" kurumuna başarıyla bağlandınız.`,
      });
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("Activation error:", error);
      setMessage("İşlem sırasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    message,
    activateWithToken
  };
};
