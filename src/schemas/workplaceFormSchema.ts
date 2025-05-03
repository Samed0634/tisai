
import { z } from "zod";

const baseSchema = {
  companyName: z.string({
    required_error: "İşyeri adı gereklidir",
  }),
  sgkNo: z.string({
    required_error: "SGK numarası gereklidir",
  }),
  workplaceType: z.string({
    required_error: "İşyeri türü gereklidir",
  }),
  expert: z.string({
    required_error: "Sorumlu uzman gereklidir",
  }),
  city: z.string({
    required_error: "İşyerinin bulunduğu il gereklidir",
  }),
  branch: z.string({
    required_error: "Bağlı olduğu şube gereklidir",
  }),
  employeeCount: z.coerce.number({
    required_error: "İşçi sayısı gereklidir",
    invalid_type_error: "İşçi sayısı bir sayı olmalıdır",
  }).min(1, "İşçi sayısı 1'den küçük olamaz"),
  memberCount: z.coerce.number({
    required_error: "Üye sayısı gereklidir",
    invalid_type_error: "Üye sayısı bir sayı olmalıdır",
  }).min(0, "Üye sayısı negatif olamaz"),
  employerUnion: z.string({
    required_error: "İşveren sendikası gereklidir",
  }),
  strikeProhibitionStatus: z.string({
    required_error: "Grev yasağı durumu gereklidir",
  }),
  authDate: z.date().optional(),
};

export const workplaceFormSchema = z.object({
  ...baseSchema,
  tenderName: z.string().optional(),
  tenderStartDate: z.date().optional(),
  tenderEndDate: z.date().optional(),
}).superRefine((data, ctx) => {
  if (data.workplaceType === "Kit") {
    if (!data.tenderName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "KİT işyerleri için ihale adı zorunludur",
        path: ["tenderName"],
      });
    }
    if (!data.tenderStartDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "KİT işyerleri için ihale başlangıç tarihi zorunludur",
        path: ["tenderStartDate"],
      });
    }
    if (!data.tenderEndDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "KİT işyerleri için ihale bitiş tarihi zorunludur",
        path: ["tenderEndDate"],
      });
    }
  }
});

export type WorkplaceFormValues = z.infer<typeof workplaceFormSchema>;
