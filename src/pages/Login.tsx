
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";

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
  const { toast } = useToast();

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

  // New function to check if user is connected to a kurum
  const checkUserKurumConnection = async (userId) => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <img 
              alt="TİS Takip Sistemi Logo"
              className="h-16 w-16 object-contain rounded-full border-2 border-primary/20"
              src="/lovable-uploads/733693aa-684f-4a0c-9a55-a65f5b9ee373.png"
            />
          </div>
          <div className="text-center text-2xl font-bold text-foreground mb-2">TISAI</div>
          <CardTitle className="text-sm font-normal text-center text-muted-foreground">
            Giriş Yapın
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
                      <Input 
                        type="email" 
                        placeholder="E-posta adresinizi giriniz" 
                        autoComplete="username"
                        {...field} 
                      />
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
                      <Input 
                        type="password" 
                        placeholder="Şifrenizi giriniz" 
                        autoComplete="current-password"
                        {...field} 
                      />
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
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş Yapılıyor
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </Button>

              <div className="text-center mt-4">
                <Link to="/signup" className="text-primary hover:underline text-sm flex items-center justify-center">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Hesabınız yok mu? Kaydolun
                </Link>
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

export default Login;
