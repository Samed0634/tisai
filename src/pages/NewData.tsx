
import React from "react";
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

const formSchema = z.object({
  companyName: z.string().min(1, {
    message: "İşyeri adı gereklidir.",
  }),
  sgkNo: z.string().min(11, {
    message: "SGK numarası en az 11 karakter olmalıdır.",
  }),
  employeeCount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "İşçi sayısı bir sayı olmalıdır.",
  }),
  memberCount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Üye sayısı bir sayı olmalıdır.",
  }),
  authDate: z.date({
    required_error: "Yetki belgesi tebliğ tarihi gereklidir.",
  }),
  callDate: z.date({
    required_error: "Çağrı tarihi gereklidir.",
  }),
  sessionDate: z.date({
    required_error: "İlk oturum tarihi gereklidir.",
  }),
  address: z.string().min(1, {
    message: "Adres gereklidir.",
  }),
  contactPerson: z.string().min(1, {
    message: "İletişim kurulacak kişi gereklidir.",
  }),
  contactPhone: z.string().min(10, {
    message: "Telefon numarası en az 10 karakter olmalıdır.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const NewData = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      sgkNo: "",
      employeeCount: "",
      memberCount: "",
      address: "",
      contactPerson: "",
      contactPhone: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Burada n8n HTTP webhook'a istek yapılacak
      // Örnek olarak direkt başarılı kabul edelim
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Veri başarıyla kaydedildi",
        description: `${data.companyName} için yeni veri girişi tamamlandı.`,
      });
      
      form.reset();
      navigate("/");
    } catch (error) {
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
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Adres</FormLabel>
                      <FormControl>
                        <Input placeholder="İşyeri adresini giriniz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İletişim Kurulacak Kişi</FormLabel>
                      <FormControl>
                        <Input placeholder="İletişim kurulacak kişi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İletişim Telefonu</FormLabel>
                      <FormControl>
                        <Input placeholder="İletişim telefonu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
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
                
                <FormField
                  control={form.control}
                  name="callDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Çağrı Tarihi</FormLabel>
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
                  name="sessionDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>İlk Oturum Tarihi</FormLabel>
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
              </div>

              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={() => navigate("/actions")}>
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
