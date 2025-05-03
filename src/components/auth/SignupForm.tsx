
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { signupSchema } from "@/schemas/signupFormSchema";
import type { SignupFormValues } from "@/schemas/signupFormSchema";
import { SignupFormFields } from "@/components/auth/SignupFormFields";
import { SignupFormActions } from "@/components/auth/SignupFormActions";
import { useSignupFormSubmit } from "@/hooks/useSignupFormSubmit";

export const SignupForm = () => {
  const { handleSubmit, isProcessing } = useSignupFormSubmit();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (data: SignupFormValues) => {
    handleSubmit(data);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <SignupFormFields isProcessing={isProcessing} />
          <SignupFormActions isProcessing={isProcessing} />
        </form>
      </Form>
    </FormProvider>
  );
};
