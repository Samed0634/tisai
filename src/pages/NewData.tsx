
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BasicWorkplaceFields } from "@/components/workplace/BasicWorkplaceFields";
import { TenderFields } from "@/components/workplace/TenderFields";
import { workplaceFormSchema, type WorkplaceFormValues } from "@/schemas/workplaceFormSchema";
import { useActionHistory } from "@/hooks/useActionHistory";

const NewData = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isKitWorkplace, setIsKitWorkplace] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logAction } = useActionHistory();

  const form = useForm<WorkplaceFormValues>({
    resolver: zodResolver(workplaceFormSchema),
    defaultValues: {
      companyName: "",
      sgkNo: "",
      workplaceType: "",
      expert: "",
      city: "",
      branch: "",
      employeeCount: 0,
      memberCount: 0,
      employerUnion: "",
      strikeProhibitionStatus: "",
      tenderName: "",
    },
  });

  const onSubmit = async (data: WorkplaceFormValues) => {
    setIsSubmitting(true);
    
    try {
      const insertData = {
        "İŞYERİ ADI": data.companyName,
        "SGK NO": data.sgkNo,
        "İŞYERİ TÜRÜ": data.workplaceType,
        "SORUMLU UZMAN": data.expert,
        "İŞYERİNİN BULUNDUĞU İL": data.city,
        "BAĞLI OLDUĞU ŞUBE": data.branch,
        "İŞÇİ SAYISI": data.employeeCount,
        "ÜYE SAYISI": data.memberCount,
        "İŞVEREN SENDİKASI": data.employerUnion,
        "GREV YASAĞI DURUMU": data.strikeProhibitionStatus,
        "YETKİ BELGESİ TEBLİĞ TARİHİ": data.authDate.toISOString(),
        "İHALE ADI": data.tenderName || null,
        "İHALE BAŞLANGIÇ TARİHİ": data.tenderStartDate ? data.tenderStartDate.toISOString() : null,
        "İHALE BİTİŞ TARİHİ": data.tenderEndDate ? data.tenderEndDate.toISOString() : null,
      };

      const { error } = await supabase
        .from('isyerleri')
        .insert(insertData);

      if (error) throw error;

      // Log the action after successful insertion
      await logAction("Yeni İşyeri Kaydı Oluşturuldu");

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

  const handleWorkplaceTypeChange = (value: string) => {
    setIsKitWorkplace(value === "Kit");
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
              <BasicWorkplaceFields 
                control={form.control}
                onWorkplaceTypeChange={handleWorkplaceTypeChange}
              />

              {isKitWorkplace && (
                <TenderFields control={form.control} />
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
