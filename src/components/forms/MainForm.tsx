
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { isyeriTuruOptions } from "@/constants/formOptions";
import { newDataFormSchema } from "@/utils/validationSchemas";
import { BasicFields } from "./BasicFields";
import { SelectFields } from "./SelectFields";
import { DateFields } from "./DateFields";
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
      // Send webhook notification with all form data
      await fetch('https://primary-production-dcf9.up.railway.app/webhook/yenikayıt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString()
        })
      });

      // Show success message
      toast({
        title: "Veri başarıyla kaydedildi",
        description: `${data["İŞYERİ ADI"]} için yeni veri girişi tamamlandı.`,
      });
      
      // Reset form and navigate
      form.reset();
      navigate("/procedure-status");
    } catch (error: any) {
      console.error("Error submitting data:", error);
      toast({
        title: "Hata",
        description: `Veri girişi sırasında bir hata oluştu: ${error.message || 'Bilinmeyen hata'}`,
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

