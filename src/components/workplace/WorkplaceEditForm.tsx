
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Workplace } from "@/types/workplace";
import { useFormToSupabase } from "@/utils/formToSupabase";

interface WorkplaceEditFormProps {
  workplace: Workplace;
  onSave?: (data: any) => void;
}

export const WorkplaceEditForm: React.FC<WorkplaceEditFormProps> = ({ 
  workplace, 
  onSave 
}) => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { setupFormListeners } = useFormToSupabase();
  
  const form = useForm({
    defaultValues: {
      isyeri_adi: workplace["İŞYERİ ADI"] || "",
      sgk_no: workplace["SGK NO"] || "",
      isyeri_turu: workplace["İŞYERİ TÜRÜ"] || "",
      sorumlu_uzman: workplace["SORUMLU UZMAN"] || "",
      isyeri_ili: workplace["İŞYERİNİN BULUNDUĞU İL"] || "",
      bagli_sube: workplace["BAĞLI OLDUĞU ŞUBE"] || "",
      isci_sayisi: workplace["İŞÇİ SAYISI"] || 0,
      uye_sayisi: workplace["ÜYE SAYISI"] || 0,
      isveren_sendikasi: workplace["İŞVEREN SENDİKASI"] || "",
      grev_yasagi_durumu: workplace["GREV YASAĞI DURUMU"] === "Var",
      ihale_adi: workplace["İHALE ADI"] || "",
      ihale_baslangic_tarihi: workplace["İHALE BAŞLANGIÇ TARİHİ"] ? 
        new Date(workplace["İHALE BAŞLANGIÇ TARİHİ"]).toISOString().split('T')[0] : "",
      ihale_bitis_tarihi: workplace["İHALE BİTİŞ TARİHİ"] ? 
        new Date(workplace["İHALE BİTİŞ TARİHİ"]).toISOString().split('T')[0] : "",
      // Diğer tarih alanları da benzer şekilde eklenebilir
    }
  });

  // Form yüklendiğinde Supabase event listener'larını ekle
  useEffect(() => {
    if (formRef.current && workplace.ID) {
      // Form DOM'a eklendikten sonra event listener'ları ekle
      setupFormListeners('#workplace-edit-form', workplace.ID);
    }
  }, [workplace.ID]);

  const onSubmit = (data: any) => {
    // Manuel form gönderimi için (isteğe bağlı)
    try {
      if (onSave) {
        onSave(data);
      }
      toast({
        title: "Başarılı",
        description: "İşyeri bilgileri kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşyeri bilgileri kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>İşyeri Düzenleme</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="workplace-edit-form" ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* İşyeri Adı */}
              <FormField
                control={form.control}
                name="isyeri_adi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İşyeri Adı</FormLabel>
                    <FormControl>
                      <Input 
                        id="isyeri-adi-input" 
                        data-db-column="isyeri_adi"
                        placeholder="İşyeri adını giriniz" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* SGK No */}
              <FormField
                control={form.control}
                name="sgk_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SGK No</FormLabel>
                    <FormControl>
                      <Input 
                        id="sgk-no-input" 
                        data-db-column="sgk_no"
                        placeholder="SGK numarasını giriniz" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* İşyeri Türü */}
              <FormField
                control={form.control}
                name="isyeri_turu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İşyeri Türü</FormLabel>
                    <Select 
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger 
                          id="isyeri-turu-select"
                          data-db-column="isyeri_turu"
                        >
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

              {/* İşyerinin Bulunduğu İl */}
              <FormField
                control={form.control}
                name="isyeri_ili"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İşyerinin Bulunduğu İl</FormLabel>
                    <FormControl>
                      <Input 
                        id="isyeri-ili-select" 
                        data-db-column="isyeri_ili"
                        placeholder="İli giriniz" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grev Yasağı Durumu */}
              <FormField
                control={form.control}
                name="grev_yasagi_durumu"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        id="grev-yasagi-checkbox"
                        data-db-column="grev_yasagi_durumu"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Grev Yasağı Var mı?
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              {/* İhale Adı */}
              <FormField
                control={form.control}
                name="ihale_adi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İhale Adı</FormLabel>
                    <FormControl>
                      <Input 
                        id="ihale-adi-input" 
                        data-db-column="ihale_adi"
                        placeholder="İhale adını giriniz" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* İhale Başlangıç Tarihi */}
              <FormField
                control={form.control}
                name="ihale_baslangic_tarihi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İhale Başlangıç Tarihi</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        id="ihale-baslangic-tarihi"
                        data-db-column="ihale_baslangic_tarihi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* İhale Bitiş Tarihi */}
              <FormField
                control={form.control}
                name="ihale_bitis_tarihi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İhale Bitiş Tarihi</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        id="ihale-bitis-tarihi"
                        data-db-column="ihale_bitis_tarihi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Benzer şekilde diğer alanlar da eklenebilir */}
            </div>

            <Button type="submit">Kaydet</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
