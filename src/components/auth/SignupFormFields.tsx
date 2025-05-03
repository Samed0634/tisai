
import React from "react";
import { useFormContext } from "react-hook-form";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SignupFormValues } from "@/schemas/signupFormSchema";

interface SignupFormFieldsProps {
  isProcessing: boolean;
}

export const SignupFormFields: React.FC<SignupFormFieldsProps> = ({ isProcessing }) => {
  const { control } = useFormContext<SignupFormValues>();

  return (
    <>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>E-posta</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="E-posta adresinizi giriniz" 
                autoComplete="email"
                disabled={isProcessing}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Şifre</FormLabel>
            <FormControl>
              <Input 
                type="password" 
                placeholder="Şifrenizi giriniz" 
                autoComplete="new-password"
                disabled={isProcessing}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tekrar Şifre</FormLabel>
            <FormControl>
              <Input 
                type="password" 
                placeholder="Şifrenizi tekrar giriniz" 
                autoComplete="new-password"
                disabled={isProcessing}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
