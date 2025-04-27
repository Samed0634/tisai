
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isyeriTuruOptions, ilOptions, subeOptions, sendikalarOptions, grevYasagiOptions } from "@/constants/formOptions";
import { newDataFormSchema } from "@/utils/validationSchemas";
import { DateField } from "./DateField";
import { KitFields } from "./KitFields";
import { Loader2 } from "lucide-react";
import type { z } from "zod";

export const MainForm = () => {
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

              <BasicFields form={form} />
              <SelectFields form={form} />
              <DateFields form={form} />
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
  );
};
