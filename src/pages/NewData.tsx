
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
  "SGK NO": z.string().min(1, {
    message: "SGK numarası gereklidir.",
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
  "İHALE ADI": z.string().min(1, {
    message: "İhale adı gereklidir.",
  }),
  "İHALE BAŞLANGIÇ TARİHİ": z.date({
    required_error: "İhale başlangıç tarihi gereklidir.",
  }),
  "İHALE BİTİŞ TARİHİ": z.date({
    required_error: "İhale bitiş tarihi gereklidir.",
  }),
  "YETKİ TESPİT İSTEM TARİHİ": z.date({
    required_error: "Yetki tespit istem tarihi gereklidir.",
  }),
  "YETKİ BELGESİ TEBLİĞ TARİHİ": z.date({
    required_error: "Yetki belgesi tebliğ tarihi gereklidir.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const grevYasagiOptions = [
  "Var",
  "Yok",
];

const isyeriTuruOptions = [
  "Özel",
  "Kamu",
  "Belediye",
];

const ilOptions = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", 
  "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", 
  "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", 
  "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", 
  "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", 
  "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", 
  "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", 
  "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", 
  "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", 
  "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", 
  "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", 
  "Kilis", "Osmaniye", "Düzce"
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

const NewData = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
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

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Format data to match Supabase table structure
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
        "İHALE ADI": data["İHALE ADI"],
        "İHALE BAŞLANGIÇ TARİHİ": data["İHALE BAŞLANGIÇ TARİHİ"],
        "İHALE BİTİŞ TARİHİ": data["İHALE BİTİŞ TARİHİ"],
        "YETKİ TESPİT İSTEM TARİHİ": data["YETKİ TESPİT İSTEM TARİHİ"],
        "YETKİ BELGESİ TEBLİĞ TARİHİ": data["YETKİ BELGESİ TEBLİĞ TARİHİ"],
      };
      
      // Insert data into Supabase - using upsert instead of insert to handle the type correctly
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
                      <FormControl>
                        <Input placeholder="İşveren sendikasını giriniz" {...field} />
                      </FormControl>
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
                
                {/* İhale Adı */}
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
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* İhale Başlangıç Tarihi */}
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
                
                {/* İhale Bitiş Tarihi */}
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
                
                {/* Yetki Tespit İstem Tarihi */}
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
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Yetki Belgesi Tebliğ Tarihi */}
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
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
