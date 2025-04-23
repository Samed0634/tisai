
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        throw error;
      }

      toast({
        title: "Giriş başarılı",
        description: "Hoş geldiniz.",
      });
      
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error: any) {
      toast({
        title: "Giriş başarısız",
        description: error?.message || "E-posta veya şifre hatalı.",
        variant: "destructive",
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
              src="/lovable-uploads/17321130-c47f-4bb1-ab57-2d353f54c2eb.png" 
              alt="TİS Takip Sistemi Logo" 
              className="h-16 w-16 object-contain rounded-full border-2 border-primary/20" 
            />
          </div>
          <div className="text-center text-2xl font-bold text-foreground mb-2">TISAI</div>
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
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hizmet İş Sendikası
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
