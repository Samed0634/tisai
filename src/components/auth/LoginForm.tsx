
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, UserPlus } from "lucide-react";
import { loginSchema, LoginFormValues, useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const { isLoading, handleLogin } = useAuth();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

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
  }, [form]);

  const onSubmit = (data: LoginFormValues) => {
    handleLogin(data);
  };

  return (
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
  );
}
