
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, Mail, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { AnimatedBackground } from "@/components/ui/animated-background";

const loginSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz"
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır"
  }),
  rememberMe: z.boolean().optional().default(false)
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user } = useAuth();

  // Array of floating text messages
  const floatingTexts = [
    "TISAI, bir toplu iş sözleşmesi takip otomasyonudur.",
    "Veri gir, süreleri TISAI takip etsin.",
    "Whatsapp ile hatırlatma yapabilir.",
    "Bu işin uzmanları tarafından, sendikalar için geliştirildi",
    "TISAI, bir programdan çok daha ötesidir",
    "Herkes kullanabilsin diye basit kullanıcı arayüzü sunar",
    "Hamurunda yapay zeka bulunmaktadır.",
    "TISAI, sizlere sürekli gelişim vaadetmektedir.",
    "TISAI-Call ile 7/24 üyelerle iletişim ve sorunların anlık tespiti mümkün hale gelmektedir.",
    "TISAI-Call için takipte kalın!"
  ];

  // Check for remembered credentials on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("remembered_email");
    const rememberedPassword = localStorage.getItem("remembered_password");
    const rememberedMe = localStorage.getItem("remember_me") === "true";

    if (rememberedMe && rememberedEmail && rememberedPassword) {
      form.setValue("email", rememberedEmail);
      form.setValue("password", rememberedPassword);
      form.setValue("rememberMe", true);
    }
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password, data.rememberMe);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      // Error is handled in the useAuth hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/40 relative overflow-hidden">
      {/* Futuristic animated background */}
      <AnimatedBackground texts={floatingTexts} />
      
      {/* Login card with glass effect */}
      <Card className="w-[350px] bg-white/80 backdrop-blur-md border border-white/20 shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <img
              alt="TİS Takip Sistemi Logo"
              className="h-16 w-16 object-contain rounded-full border-2 border-primary/20 hover:border-primary/60 transition-all duration-300"
              src="/lovable-uploads/733693aa-684f-4a0c-9a55-a65f5b9ee373.png"
            />
          </div>
          <div className="text-center text-2xl font-bold text-foreground mb-2 bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">TISAI</div>
          <CardTitle className="text-sm font-normal text-center text-muted-foreground">
            Toplu İş Sözleşmesi Otomasyon Sistemi
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
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="email" 
                          placeholder="E-posta adresinizi giriniz" 
                          className="pl-10 bg-white/60 backdrop-blur-sm border-white/40"
                          {...field} 
                        />
                      </div>
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
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="password" 
                          placeholder="Şifrenizi giriniz" 
                          className="pl-10 bg-white/60 backdrop-blur-sm border-white/40"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        Beni Hatırla
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-blue-500 hover:opacity-90" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş Yapılıyor
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            Hesabınız yok mu?{" "}
            <Button variant="link" className="p-0" onClick={() => navigate("/signup")}>
              Kayıt Ol
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
