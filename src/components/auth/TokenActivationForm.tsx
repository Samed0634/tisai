
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { tokenActivationSchema } from "@/schemas/signupFormSchema";
import type { TokenActivationValues } from "@/schemas/signupFormSchema";
import { TokenActivationFormFields } from "@/components/auth/TokenActivationFormFields";
import { TokenActivationFormActions } from "@/components/auth/TokenActivationFormActions";
import { useTokenActivation } from "@/hooks/useTokenActivation";

export const TokenActivationForm = () => {
  const { handleSubmit, isProcessing } = useTokenActivation();

  const form = useForm<TokenActivationValues>({
    resolver: zodResolver(tokenActivationSchema),
    defaultValues: {
      tokenId: ""
    }
  });

  const onSubmit = (data: TokenActivationValues) => {
    handleSubmit(data);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4 text-muted-foreground text-sm text-center">
            Hesabınızı aktive etmek için kurum token ID'nizi giriniz. Bu token size kurum yöneticiniz tarafından verilmiş olmalıdır.
          </div>
          <TokenActivationFormFields isProcessing={isProcessing} />
          <TokenActivationFormActions isProcessing={isProcessing} />
        </form>
      </Form>
    </FormProvider>
  );
};
