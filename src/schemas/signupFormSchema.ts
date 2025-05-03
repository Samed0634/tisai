
import * as z from "zod";

export const signupSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz"
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır"
  }),
  confirmPassword: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;
