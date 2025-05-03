
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import { useSignupUser } from "@/hooks/useSignupUser";

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

export type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { validateToken } = useTokenValidation();
  const { signupUser, isLoading } = useSignupUser();

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
    console.log("Form verisi:", data);
    
    // Step 1: Validate the token
    const { isValid, kurumData } = await validateToken(data.tokenId);
    
    if (!isValid || !kurumData) {
      return; // Error messages handled in the validateToken function
    }

    // Step 2: Sign up the user
    const { success } = await signupUser({
      email: data.email,
      password: data.password,
      kurumId: kurumData.id
    });

    if (success) {
      toast({
        title: "Kayıt Başarılı",
        description: "Hesabınız başarıyla oluşturuldu. Giriş yapabilirsiniz.",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
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
  );
};
