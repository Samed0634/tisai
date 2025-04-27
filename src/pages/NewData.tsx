import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  employeeCount: z.string().transform(val => {
    const num = parseInt(val, 10);
    return isNaN(num) ? 0 : num;
  }).pipe(
    z.number({
      required_error: "İşçi sayısı gereklidir",
      invalid_type_error: "İşçi sayısı bir sayı olmalıdır",
    }).min(1, "İşçi sayısı 1'den küçük olamaz")
  ),
  memberCount: z.string().transform(val => {
    const num = parseInt(val, 10);
    return isNaN(num) ? 0 : num;
  }).pipe(
    z.number({
      required_error: "Üye sayısı gereklidir",
      invalid_type_error: "Üye sayısı bir sayı olmalıdır",
    }).min(0, "Üye sayısı negatif olamaz")
  ),
  employerUnion: z.string({
    required_error: "İşveren sendikası gereklidir",
  }),
  strikeProhibitionStatus: z.string({
    required_error: "Grev yasağı durumu gereklidir",
  }),
  authDate: z.date({
    required_error: "Yetki belgesi tebliğ tarihi gereklidir",
  }),
};

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

const NewData = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isKitWorkplace, setIsKitWorkplace] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      sgkNo: "",
      workplaceType: "",
      expert: "",
      city: "",
      branch: "",
      employeeCount: "",
      memberCount: "",
      employerUnion: "",
      strikeProhibitionStatus: "",
      tenderName: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const insertData = {
        "İŞYERİ ADI": data.companyName,
        "SGK NO": data.sgkNo,
        "İŞYERİ TÜRÜ": data.workplaceType,
        "SORUMLU UZMAN": data.expert,
        "İŞYERİNİN BULUNDUĞU İL": data.city,
        "BAĞLI OLDUĞU ŞUBE": data.branch,
        "İŞÇİ SAYISI": Number(data.employeeCount),
        "ÜYE SAYISI": Number(data.memberCount),
        "İŞVEREN SENDİKASI": data.employerUnion,
        "GREV YASAĞI DURUMU": data.strikeProhibitionStatus,
        "YETKİ BELGESİ TEBLİĞ TARİHİ": data.authDate.toISOString(),
        "İHALE ADI": data.tenderName || null,
        "İHALE BAŞLANGIÇ TARİHİ": data.tenderStartDate ? data.tenderStartDate.toISOString() : null,
        "İHALE BİTİŞ TARİHİ": data.tenderEndDate ? data.tenderEndDate.toISOString() : null,
      };

      const { error } = await supabase
        .from("isyerleri")
        .insert(insertData);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "İşyeri kaydı başarıyla oluşturuldu.",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error inserting data:", error);
      toast({
        title: "Hata",
        description: "İşyeri kaydı oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Yeni Veri Girişi</h1>
      <Card>
        <CardHeader>
          <CardTitle>İşyeri Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşyeri Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="İşyeri adını giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sgkNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SGK No</FormLabel>
                      <FormControl>
                        <Input placeholder="SGK numarasını giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workplaceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşyeri Türü</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setIsKitWorkplace(value === "Kit");
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="İşyeri türünü seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Kit">KİT</SelectItem>
                          <SelectItem value="Belediye">Belediye</SelectItem>
                          <SelectItem value="Özel">Özel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expert"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sorumlu Uzman</FormLabel>
                      <FormControl>
                        <Input placeholder="Sorumlu uzmanı giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşyerinin Bulunduğu İl</FormLabel>
                      <FormControl>
                        <Input placeholder="İli giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bağlı Olduğu Şube</FormLabel>
                      <FormControl>
                        <Input placeholder="Şubeyi giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employeeCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşçi Sayısı</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="İşçi sayısını giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="memberCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Üye Sayısı</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Üye sayısını giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employerUnion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşveren Sendikası</FormLabel>
                      <FormControl>
                        <Input placeholder="İşveren sendikasını giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="strikeProhibitionStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grev Yasağı Durumu</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Grev yasağı durumunu seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Var">Var</SelectItem>
                          <SelectItem value="Yok">Yok</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="authDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Yetki Belgesi Tebliğ Tarihi</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: tr })
                              ) : (
                                <span>Tarih Seçin</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isKitWorkplace && (
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="tenderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İhale Adı</FormLabel>
                        <FormControl>
                          <Input placeholder="İhale adını giriniz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tenderStartDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>İhale Başlangıç Tarihi</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: tr })
                                ) : (
                                  <span>Tarih Seçin</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tenderEndDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>İhale Bitiş Tarihi</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: tr })
                                ) : (
                                  <span>Tarih Seçin</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={() => navigate("/")}>
                  İptal
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    "Kaydet"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewData;
