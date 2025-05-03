
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
import type { TokenActivationValues } from "@/schemas/signupFormSchema";

interface TokenActivationFormFieldsProps {
  isProcessing: boolean;
}

export const TokenActivationFormFields: React.FC<TokenActivationFormFieldsProps> = ({ isProcessing }) => {
  const { control } = useFormContext<TokenActivationValues>();

  return (
    <FormField
      control={control}
      name="tokenId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kurum Token ID</FormLabel>
          <FormControl>
            <Input 
              placeholder="Kurum token ID'nizi giriniz" 
              disabled={isProcessing}
              autoFocus
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
