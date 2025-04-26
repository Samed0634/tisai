import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  SelectValue 
} from "@/components/ui/select";

const isyeriTuruOptions = [
  "Özel",
  "Kamu",
  "Belediye (Kadrolu)",
  "Belediye (Şirket)",
  "Kit",
];

const ilOptions = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", 
  // ... keep existing code (il options array)
];

const subeOptions = [
  "Merkez",
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Adana",
  "Trabzon",
  "Diyarbakır",
];

const sendikalarOptions = [
  "MİS",
  "MİKSEN",
  "YERELSEN",
  "SODEMSEN",
  "TÜHİS",
  "İŞVEREN",
];

const grevYasagiOptions = [
  "Yasak",
  "Serbest",
];

const formSchema = z.object({
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

const NewData = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "İŞYERİ TÜRÜ": "",
      "SORUMLU UZMAN": "",
      "İŞYERİNİN BULUNDUĞU İL": "",
      "BAĞLI OLDUĞU ŞUBE": "",
      "İŞYERİ ADI": "",
      "SGK NO": "",
      "İŞÇİ SAYISI": "",
      "ÜYE SAYISI": "",
      "İŞVEREN SENDİKASI": "",
      "GREV YASAĞI DURUMU": "",
      "İHALE ADI": "",
    },
  });

  const isyeriTuru = form.watch("İŞYERİ TÜRÜ");
  const isKit = isyeriTuru === "Kit";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const formattedData = {
        "İŞYERİ TÜRÜ": data["İŞYERİ TÜRÜ"],
        "SORUMLU UZMAN": data["SORUMLU UZMAN"],
        "İŞYERİNİN BULUNDUĞU İL": data["İŞYERİNİN BULUNDUĞU İL"],
        "BAĞLI OLDUĞU ŞUBE": data["BAĞLI OLDUĞU ŞUBE"],
        "İŞYERİ ADI": data["İŞYERİ ADI"],
        "SGK NO": data["SGK NO"],
        "İŞÇİ SAYISI": Number(data["İŞÇİ SAYISI"]),
        "ÜYE SAYISI": Number(data["ÜYE SAYISI"]),
        "İŞVEREN SENDİKASI": data["İŞVEREN SENDİKASI"],
        "GREV YASAĞI DURUMU": data["GREV YASAĞI DURUMU"],
        "YETKİ TESPİT İSTEM TARİHİ": data["YETKİ TESPİT İSTEM TARİHİ"],
        "YETKİ BELGESİ TEBLİĞ TARİHİ": data["YETKİ BELGESİ TEBLİĞ TARİHİ"],
      };

      if (isKit) {
        formattedData["İHALE ADI"] = data["İHALE ADI"];
        formattedData["İHALE BAŞLANGIÇ TARİHİ"] = data["İHALE BAŞLANGIÇ TARİHİ"];
        formattedData["İHALE BİTİŞ TARİHİ"] = data["İHALE BİTİŞ TARİHİ"];
      }
      
      const { error } = await supabase
        .from('isyerleri')
        .insert(formattedData as any);
      
      if (error) throw error;

      toast({
        title: "Veri başarıyla kaydedildi",
        description: `${data["İŞYERİ ADI"]} için yeni veri girişi tamamlandı.`,
      });
      
      form.reset();
      navigate("/procedure-status");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast({
        title: "Hata",
        description: "Veri girişi sırasında bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="heading-1">Yeni Veri Girişi</h1>
      <p className="text-secondary-600">
        İşyerine ait temel bilgileri girin. Tüm alanların doldurulması zorunludur.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>İşyeri Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* İşyeri türü */}
                <FormField
                  control={form.control}
                  name="İŞYERİ TÜRÜ"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşyeri Türü</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="İşyeri Türü Seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isyeriTuruOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sorumlu Uzman */}
                <FormField
                  control={form.control}
                  name="SORUMLU UZMAN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sorumlu Uzman</FormLabel>
                      <FormControl>
                        <Input placeholder="Sorumlu uzman adını giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* İşyerinin Bulunduğu İl */}
                <FormField
                  control={form.control}
                  name="İŞYERİNİN BULUNDUĞU İL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşyerinin Bulunduğu İl</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="İl Seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[400px] overflow-y-auto">
                          {ilOptions.map((il) => (
                            <SelectItem key={il} value={il}>
                              {il}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Bağlı Olduğu Şube */}
                <FormField
                  control={form.control}
                  name="BAĞLI OLDUĞU ŞUBE"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bağlı Olduğu Şube</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Şube Seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subeOptions.map((sube) => (
                            <SelectItem key={sube} value={sube}>
                              {sube}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* İşyeri Adı */}
                <FormField
                  control={form.control}
                  name="İŞYERİ ADI"
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
                
                {/* SGK No */}
                <FormField
                  control={form.control}
                  name="SGK NO"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SGK Numarası</FormLabel>
                      <FormControl>
                        <Input placeholder="SGK numarasını giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* İşçi Sayısı */}
                <FormField
                  control={form.control}
                  name="İŞÇİ SAYISI"
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
                
                {/* Üye Sayısı */}
                <FormField
                  control={form.control}
                  name="ÜYE SAYISI"
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
                
                {/* İşveren Sendikası */}
                <FormField
                  control={form.control}
                  name="İŞVEREN SENDİKASI"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşveren Sendikası</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="İşveren Sendikası Seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sendikalarOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Grev Yasağı Durumu */}
                <FormField
                  control={form.control}
                  name="GREV YASAĞI DURUMU"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grev Yasağı Durumu</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Grev Yasağı Durumu Seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {grevYasagiOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Conditional fields for Kit */}
                {isKit && (
                  <>
                    <FormField
                      control={form.control}
                      name="İHALE ADI"
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
                      name="İHALE BAŞLANGIÇ TARİHİ"
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
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="İHALE BİTİŞ TARİHİ"
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
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

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
