
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

    try {
      // Step 1: Verify token against kurumlar table
      const { data: kurumData, error: kurumError } = await supabase
        .from("kurumlar")
        .select("id, kayit_token, token_aktif_mi, token_kullanim_sayisi, max_kullanim_sayisi")
        .eq("kayit_token", data.tokenId)
        .single();

      if (kurumError || !kurumData) {
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
        toast({
          title: "Pasif Token",
          description: "Bu token aktif değil. Lütfen kurum yöneticinizle iletişime geçiniz.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Check if token usage limit is reached
      if (kurumData.max_kullanim_sayisi !== null && 
          kurumData.token_kullanim_sayisi >= kurumData.max_kullanim_sayisi) {
        toast({
          title: "Token Kullanım Limiti",
          description: "Bu token için maksimum kullanım sayısına ulaşılmıştır.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Step 2: Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError || !authData.user) {
        throw authError || new Error("Kullanıcı oluşturulamadı.");
      }

      // Step 3: Create entry in kullanici_kurumlar table
      const { error: relationError } = await supabase
        .from("kullanici_kurumlar")
        .insert({
          user_id: authData.user.id,
          kurum_id: kurumData.id,
        });

      if (relationError) {
        // If relation creation fails, attempt to delete the created user
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw relationError;
      }

      // Step 4: Update token usage counter
      const { error: updateTokenError } = await supabase
        .from("kurumlar")
        .update({ 
          token_kullanim_sayisi: (kurumData.token_kullanim_sayisi || 0) + 1 
        })
        .eq("id", kurumData.id);

      if (updateTokenError) {
        console.error("Token usage counter update failed:", updateTokenError);
        // Non-critical error, continue with registration
      }

      toast({
        title: "Kayıt Başarılı",
        description: "Hesabınız başarıyla oluşturuldu. Giriş yapabilirsiniz.",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Kayıt Hatası",
        description: error?.message || "Kayıt işlemi sırasında bir hata oluştu.",
        variant: "destructive"
      });
      console.error("Signup error:", error);
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
