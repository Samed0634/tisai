
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const KurumAktivasyon = () => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkUserKurumConnection = async () => {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if the user already has a connection to a kurum
        const { data: connections, error } = await supabase
          .from('kullanici_kurumlar')
          .select('*')
          .eq('user_id', session.user.id);
          
        if (connections && connections.length > 0) {
          // User already has a kurum connection, redirect to dashboard
          navigate('/');
        }
      }
    };
    
    checkUserKurumConnection();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

  const handleBackToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[450px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <img
              alt="TİS Takip Sistemi Logo"
              className="h-16 w-16 object-contain rounded-full border-2 border-primary/20"
              src="/lovable-uploads/733693aa-684f-4a0c-9a55-a65f5b9ee373.png"
            />
          </div>
          <div className="text-center text-2xl font-bold text-foreground mb-2">TISAI</div>
          <CardTitle className="text-xl text-center">Kurum Aktivasyon</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-4 text-muted-foreground" id="textDescrption">
              Hesabınızı aktifleştirmek ve kurumunuza bağlanmak için size verilen Kurum Tokenını girin.
            </div>
            
            <div className="space-y-2">
              <label htmlFor="inputKurumToken" className="text-sm font-medium">
                Kurum Tokenı
              </label>
              <Input
                id="inputKurumToken"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Token giriniz"
                required
                disabled={isLoading}
              />
            </div>
            
            <div id="textMesaj" className={`p-3 rounded-md text-center ${
              message ? (message.includes("başarı") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700") : "hidden"
            }`}>
              {message}
            </div>
            
            <Button 
              id="buttonBaglan" 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  İşleniyor...
                </>
              ) : (
                "Hesabımı Aktive Et / Bağlan"
              )}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={handleBackToSignup}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kayıt Ekranına Dön
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default KurumAktivasyon;
