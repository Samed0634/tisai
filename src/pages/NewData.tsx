
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
      tenderName: ""
    }
  });

  const onSubmit = async (data: WorkplaceFormValues) => {
    setIsSubmitting(true);
    try {
      // Fetch a default kurum_id
      const { data: kurumData, error: kurumError } = await supabase
        .from('kurumlar')
        .select('id')
        .limit(1)
        .single();
      
      if (kurumError && kurumError.code !== 'PGRST116') {
        console.error("Error fetching kurum_id:", kurumError);
        throw kurumError;
      }

      const kurum_id = kurumData?.id || '00000000-0000-0000-0000-000000000000'; // Default UUID

      // Prepare data object for Supabase
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
        "YETKİ BELGESİ TEBLİĞ TARİHİ": data.authDate ? data.authDate.toISOString() : null,
        "İHALE ADI": data.tenderName || null,
        "İHALE BAŞLANGIÇ TARİHİ": data.tenderStartDate ? data.tenderStartDate.toISOString() : null,
        "İHALE BİTİŞ TARİHİ": data.tenderEndDate ? data.tenderEndDate.toISOString() : null,
        "kurum_id": kurum_id
      };
      
      console.log("Preparing to insert data:", insertData);

      // Fetch the current highest ID to determine the next ID value
      const {
        error: fetchError,
        data: existingData
      } = await supabase.from('isyerleri').select('ID').order('ID', {
        ascending: false
      }).limit(1);
      
      if (fetchError) throw fetchError;

      // Calculate the next ID value
      let nextId = 1;
      if (existingData && existingData.length > 0 && existingData[0].ID) {
        nextId = existingData[0].ID + 1;
      }

      // Add the ID to the insert data
      const finalInsertData = {
        ...insertData,
        "ID": nextId
      };
      
      console.log("Final insert data with ID:", finalInsertData);

      // Insert the data into the database
      const {
        error
      } = await supabase.from('isyerleri').insert(finalInsertData);
      
      if (error) throw error;

      // Record the action in the history
      await logAction(`"${data.companyName}" adlı yeni işyeri kaydı oluşturuldu.`);
      
      toast({
        title: "Başarılı",
        description: "İşyeri kaydı başarıyla oluşturuldu."
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error inserting data:", error);
      toast({
        title: "Hata",
        description: "İşyeri kaydı oluşturulurken bir hata oluştu.",
        variant: "destructive"
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
      <Card>
        <CardHeader>
          <CardTitle>İşyeri Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <BasicWorkplaceFields control={form.control} onWorkplaceTypeChange={handleWorkplaceTypeChange} />

              {isKitWorkplace && <TenderFields control={form.control} />}

              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={() => navigate("/")}>
                  İptal
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </> : "Kaydet"}
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
