import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const signupSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz"
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır"
  }),
  confirmPassword: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır"
  }),
  tokenId: z.string().min(1, {
    message: "Kurum Token ID girilmelidir"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

// Basitleştirilmiş kurum veri arayüzü
interface KurumData {
  id: string;
  kayit_token: string;
  token_aktif_mi: boolean;
}

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      tokenId: ""
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    console.log("Form verisi:", data);
    
    // Temizlenmiş token değeri (baştaki ve sondaki boşlukları kaldır)
    const cleanToken = data.tokenId.trim();
    console.log("Temizlenmiş token değeri:", cleanToken);
    console.log("Token uzunluğu:", cleanToken.length);

    try {
      // Step 1: Verify token against kurumlar table
      console.log("Token doğrulaması başlıyor:", cleanToken);
      const { data: kurumData, error: kurumError } = await supabase
        .from("kurumlar")
        .select("id, kayit_token, token_aktif_mi")
        .eq("kayit_token", cleanToken)
        .maybeSingle(); // single() yerine maybeSingle() kullanarak not found hatası engellenebilir

      console.log("Token sorgusu sonucu:", { kurumData, kurumError });
      
      // Veritabanındaki token ile karşılaştırma detayları
      if (kurumData) {
        console.log("Veritabanındaki token:", kurumData.kayit_token);
        console.log("Token karşılaştırması:", {
          girilenToken: cleanToken,
          dbToken: kurumData.kayit_token,
          esitMi: cleanToken === kurumData.kayit_token
        });
      }

      if (kurumError) {
        console.error("Token sorgu hatası:", kurumError);
        toast({
          title: "Token Sorgulama Hatası",
          description: kurumError.message || "Token doğrulama sırasında bir hata oluştu.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      if (!kurumData) {
        console.error("Token bulunamadı: Token veritabanında mevcut değil.");
        toast({
          title: "Token Doğrulama Hatası",
          description: "Geçersiz kurum token ID. Lütfen geçerli bir token alınız.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Check if token is active
      if (!kurumData.token_aktif_mi) {
        console.log("Token pasif durumda:", kurumData.token_aktif_mi);
        toast({
          title: "Pasif Token",
          description: "Bu token aktif değil. Lütfen kurum yöneticinizle iletişime geçiniz.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Step 2: Create user in Supabase Auth
      console.log("Kullanıcı oluşturuluyor:", data.email);
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
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

      // Step 3: Create entry in kullanici_kurumlar table
      console.log("Kurum-kullanıcı ilişkisi oluşturuluyor:", {
        user_id: authData.user.id,
        kurum_id: kurumData.id
      });

      const { error: relationError } = await supabase
        .from("kullanici_kurumlar")
        .insert({
          user_id: authData.user.id,
          kurum_id: kurumData.id,
        });

      console.log("İlişki oluşturma sonucu:", { relationError });

      if (relationError) {
        console.error("Kullanıcı-kurum ilişkisi oluşturma hatası:", relationError);
        
        // Kullanıcı oluşturuldu ama ilişki eklenemedi, kullanıcıyı silmeye çalışalım
        try {
          // Not: Auth API ile kullanıcı silemeyiz, bunun için admin API gerekli
          // Bu hata durumunda kullanıcıyı bilgilendirip manuel düzeltme önerebiliriz
          console.log("Kullanıcı oluşturuldu ama ilişki eklenemedi, kullanıcıyı manuel olarak düzeltmek gerekebilir");
        } catch (deleteError) {
          console.error("Kullanıcı silme hatası:", deleteError);
        }
        
        throw new Error("Kullanıcı-kurum ilişkisi oluşturulamadı. Lütfen yöneticinizle iletişime geçiniz.");
      }

      toast({
        title: "Kayıt Başarılı",
        description: "Hesabınız başarıyla oluşturuldu. Giriş yapabilirsiniz.",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      console.error("Kayıt işlemi hatası:", error);
      toast({
        title: "Kayıt Hatası",
        description: error?.message || "Kayıt işlemi sırasında bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <img
              alt="TİS Takip Sistemi Logo"
              className="h-16 w-16 object-contain rounded-full border-2 border-primary/20"
              src="/lovable-uploads/733693aa-684f-4a0c-9a55-a65f5b9ee373.png"
            />
          </div>
          <div className="text-center text-2xl font-bold text-foreground mb-2">TISAI</div>
          <CardTitle className="text-lg font-semibold text-center">
            Yeni Kayıt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="E-posta adresinizi giriniz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Şifrenizi giriniz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tekrar Şifre</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Şifrenizi tekrar giriniz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tokenId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kurum Token ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Kurum token ID'nizi giriniz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-2 space-y-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kayıt Yapılıyor
                    </>
                  ) : (
                    "Kayıt Ol"
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/login')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Geri Dön
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
