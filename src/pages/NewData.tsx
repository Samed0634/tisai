
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { newDataFormSchema } from "@/utils/validationSchemas";
import { isyeriTuruOptions, ilOptions, subeOptions, sendikalarOptions, grevYasagiOptions } from "@/constants/formOptions";
import { KitFields } from "@/components/forms/KitFields";
import type { z } from "zod";

const NewData = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof newDataFormSchema>>({
    resolver: zodResolver(newDataFormSchema),
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
  const isKit = isyeriTuru === "KİT";

  const onSubmit = async (data: z.infer<typeof newDataFormSchema>) => {
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
      } as any;

      if (isKit) {
        formattedData["İHALE ADI"] = data["İHALE ADI"];
        formattedData["İHALE BAŞLANGIÇ TARİHİ"] = data["İHALE BAŞLANGIÇ TARİHİ"];
        formattedData["İHALE BİTİŞ TARİHİ"] = data["İHALE BİTİŞ TARİHİ"];
      }
      
      const { error } = await supabase
        .from('isyerleri')
        .insert(formattedData);
      
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

                <FormField
                  control={form.control}
                  name="YETKİ TESPİT İSTEM TARİHİ"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Yetki Tespit İstem Tarihi</FormLabel>
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
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="YETKİ BELGESİ TEBLİĞ TARİHİ"
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
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isKit && <KitFields form={form} />}
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
