
import { z } from "zod";

export const newDataFormSchema = z.object({
  "İŞYERİ TÜRÜ": z.string().min(1, {
    message: "İşyeri türü gereklidir.",
  }),
  "SORUMLU UZMAN": z.string().min(1, {
    message: "Sorumlu uzman gereklidir.",
  }),
  "İŞYERİNİN BULUNDUĞU İL": z.string().min(1, {
    message: "İşyerinin bulunduğu il gereklidir.",
  }),
  "BAĞLI OLDUĞU ŞUBE": z.string().min(1, {
    message: "Bağlı olduğu şube gereklidir.",
  }),
  "İŞYERİ ADI": z.string().min(1, {
    message: "İşyeri adı gereklidir.",
  }),
  "SGK NO": z.string().length(11, {
    message: "SGK numarası 11 haneli olmalıdır.",
  }).regex(/^\d+$/, {
    message: "SGK numarası sadece rakamlardan oluşmalıdır.",
  }),
  "İŞÇİ SAYISI": z.string().refine((val) => !isNaN(Number(val)), {
    message: "İşçi sayısı bir sayı olmalıdır.",
  }),
  "ÜYE SAYISI": z.string().refine((val) => !isNaN(Number(val)), {
    message: "Üye sayısı bir sayı olmalıdır.",
  }),
  "İŞVEREN SENDİKASI": z.string().min(1, {
    message: "İşveren sendikası gereklidir.",
  }),
  "GREV YASAĞI DURUMU": z.string().min(1, {
    message: "Grev yasağı durumu gereklidir.",
  }),
  "YETKİ TESPİT İSTEM TARİHİ": z.date({
    required_error: "Yetki tespit istem tarihi gereklidir.",
  }),
  "YETKİ BELGESİ TEBLİĞ TARİHİ": z.date({
    required_error: "Yetki belgesi tebliğ tarihi gereklidir.",
  }),
  "İHALE ADI": z.string().optional(),
  "İHALE BAŞLANGIÇ TARİHİ": z.date().optional(),
  "İHALE BİTİŞ TARİHİ": z.date().optional(),
}).refine((data) => {
  if (data["İŞYERİ TÜRÜ"] === "Kit") {
    return data["İHALE ADI"] && data["İHALE BAŞLANGIÇ TARİHİ"] && data["İHALE BİTİŞ TARİHİ"];
  }
  return true;
}, {
  message: "Kit seçildiğinde ihale bilgileri zorunludur.",
  path: ["İHALE ADI"],
});
