
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BarChart2, Loader2 } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Kullanıcı adı gereklidir" }),
  password: z.string().min(1, { message: "Şifre gereklidir" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      // Send request to test webhook for authentication
      const response = await fetch("https://primary-production-dcf9.up.railway.app/webhook-test/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Successful login
        localStorage.setItem("token", result.token || "authenticated");
        toast({
          title: "Giriş başarılı",
          description: "Hoş geldiniz.",
        });
        navigate("/");
      } else {
        // Failed login
        toast({
          title: "Giriş başarısız",
          description: result.message || "Kullanıcı adı veya şifre hatalı.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Bağlantı hatası",
        description: "Sunucuya bağlanırken hata oluştu.",
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
            <BarChart2 className="h-10 w-10 text-primary-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">TİS Takip Sistemi</CardTitle>
          <CardDescription className="text-center">
            Hizmet-İş TİS Daire Başkanlığı
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kullanıcı Adı</FormLabel>
                    <FormControl>
                      <Input placeholder="Kullanıcı adınızı giriniz" {...field} />
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

