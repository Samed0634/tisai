
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Building2, Mail, Phone, MapPin } from "lucide-react";

const kurumSchema = z.object({
  kurum_adi: z.string().min(2, {
    message: "Kurum adı en az 2 karakter olmalıdır"
  }),
  adres: z.string().min(5, {
    message: "Adres en az 5 karakter olmalıdır"
  }),
  telefon: z.string().min(10, {
    message: "Geçerli bir telefon numarası giriniz"
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz"
  })
});

const KurumRegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm({
    resolver: zodResolver(kurumSchema),
    defaultValues: {
      kurum_adi: "",
      adres: "",
      telefon: "",
      email: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof kurumSchema>) => {
    if (!user) {
      toast({
        title: "Hata",
        description: "Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapınız.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generate a unique token
      const kayit_token = crypto.randomUUID();
      
      // Create institution record
      const { data: kurumData, error: kurumError } = await supabase
        .from("kurumlar")
        .insert({
          kurum_adi: data.kurum_adi,
          adres: data.adres,
          telefon: data.telefon,
          email: data.email,
          kayit_token: kayit_token,
          token_aktif_mi: true
        })
        .select('id')
        .single();

      if (kurumError) {
        throw kurumError;
      }

      // Create user-institution relationship
      const { error: iliskiError } = await supabase
        .from("kullanici_kurumlar")
        .insert({
          user_id: user.id,
          kurum_id: kurumData.id,
          baglanti_tarihi: new Date().toISOString()
        });

      if (iliskiError) {
        throw iliskiError;
      }

      toast({
        title: "Kurumunuz başarıyla kaydedildi",
        description: "Kurumunuz sisteme başarıyla eklendi."
      });

      // Reload the page to reflect the changes
      window.location.reload();
      
    } catch (error: any) {
      toast({
        title: "Kurum kaydı başarısız",
        description: error.message || "Bir hata oluştu.",
        variant: "destructive"
      });
      console.error("Kurum kayıt hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[600px] max-w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Kurumunuzu Kaydedin</CardTitle>
        <CardDescription>
          TİS Takip Sistemini kullanabilmek için kurumunuzu kaydediniz.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="kurum_adi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kurum Adı</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Kurumunuzun adını giriniz" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea className="pl-10 min-h-[100px]" placeholder="Kurumunuzun adresini giriniz" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="telefon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="Telefon numarası" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="E-posta adresi" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kayıt Ediliyor
                </>
              ) : (
                "Kurumu Kaydet"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} TİS Takip Sistemi - Tüm hakları saklıdır.
      </CardFooter>
    </Card>
  );
};

export default KurumRegistrationForm;
