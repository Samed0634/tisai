
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
      console.log("Form data submitted:", data);
      
      // Get current user session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw sessionError;
      }
      
      const user = sessionData.session?.user;
      if (!user) {
        console.error("No authenticated user found");
        toast({
          title: "Hata",
          description: "Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        navigate("/login");
        return;
      }
      
      // Get the kurum_id for this user
      const { data: userData, error: userError } = await supabase
        .from('kullanici_kurumlar')
        .select('kurum_id')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (userError) {
        console.error("Error getting user kurum_id:", userError);
        throw userError;
      }
      
      const kurum_id = userData?.kurum_id;
      if (!kurum_id) {
        console.error("No kurum_id found for user");
        toast({
          title: "Hata",
          description: "Kullanıcı için kurum bilgisi bulunamadı.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Format dates properly for PostgreSQL (YYYY-MM-DD)
      const formatDateToYYYYMMDD = (date: Date | undefined) => {
        if (!date) return null;
        return date.toISOString().split('T')[0];
      };
      
      // Prepare data object for Supabase with Turkish column names
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
        "YETKİ BELGESİ TEBLİĞ TARİHİ": formatDateToYYYYMMDD(data.authDate),
        "İHALE ADI": data.tenderName || null,
        "İHALE BAŞLANGIÇ TARİHİ": formatDateToYYYYMMDD(data.tenderStartDate),
        "İHALE BİTİŞ TARİHİ": formatDateToYYYYMMDD(data.tenderEndDate),
        // Include kurum_id in the insertData
        kurum_id: kurum_id
      };
      
      console.log("Preparing to insert data:", insertData);

      // Fetch the current highest ID to determine the next ID value
      const { error: fetchError, data: existingData } = await supabase
        .from('isyerleri')
        .select('ID')
        .order('ID', { ascending: false })
        .limit(1);
        
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
      const { error } = await supabase
        .from('isyerleri')
        .insert(finalInsertData);
        
      if (error) {
        console.error("Error inserting data:", error);
        throw error;
      }

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
              <BasicWorkplaceFields 
                control={form.control} 
                onWorkplaceTypeChange={handleWorkplaceTypeChange} 
              />

              {isKitWorkplace && (
                <TenderFields control={form.control} />
              )}

              <div className="flex gap-4 justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/")}
                >
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
