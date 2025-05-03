
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface KurumData {
  id: string;
  kayit_token: string;
  token_aktif_mi: boolean;
}

interface ValidationResult {
  isValid: boolean;
  kurumData: KurumData | null;
}

export const useTokenValidation = () => {
  const { toast } = useToast();

  const validateToken = async (tokenId: string): Promise<ValidationResult> => {
    // Temizlenmiş token değeri (baştaki ve sondaki boşlukları kaldır)
    const cleanToken = tokenId.trim();
    console.log("Temizlenmiş token değeri:", cleanToken);
    console.log("Token uzunluğu:", cleanToken.length);

    try {
      // Verify token against kurumlar table
      console.log("Token doğrulaması başlıyor:", cleanToken);
      const { data: kurumData, error: kurumError } = await supabase
        .from("kurumlar")
        .select("id, kayit_token, token_aktif_mi")
        .eq("kayit_token", cleanToken)
        .maybeSingle();

      console.log("Token sorgusu sonucu:", { kurumData, kurumError });
      
      // Veritabanındaki token ile karşılaştırma detayları
      if (kurumData) {
        console.log("Veritabanındaki token:", kurumData.kayit_token);
        console.log("Token karşılaştırması:", {
          girilenToken: cleanToken,
          dbToken: kurumData.kayit_token,
          esitMi: cleanToken === kurumData.kayit_token
        });
      }

      if (kurumError) {
        console.error("Token sorgu hatası:", kurumError);
        toast({
          title: "Token Sorgulama Hatası",
          description: kurumError.message || "Token doğrulama sırasında bir hata oluştu.",
          variant: "destructive"
        });
        return { isValid: false, kurumData: null };
      }

      if (!kurumData) {
        console.error("Token bulunamadı: Token veritabanında mevcut değil.");
        toast({
          title: "Token Doğrulama Hatası",
          description: "Geçersiz kurum token ID. Lütfen geçerli bir token alınız.",
          variant: "destructive"
        });
        return { isValid: false, kurumData: null };
      }

      // Check if token is active
      if (!kurumData.token_aktif_mi) {
        console.log("Token pasif durumda:", kurumData.token_aktif_mi);
        toast({
          title: "Pasif Token",
          description: "Bu token aktif değil. Lütfen kurum yöneticinizle iletişime geçiniz.",
          variant: "destructive"
        });
        return { isValid: false, kurumData: null };
      }

      return { isValid: true, kurumData };
    } catch (error: any) {
      console.error("Token doğrulama hatası:", error);
      toast({
        title: "Token Doğrulama Hatası",
        description: error?.message || "Token doğrulama sırasında bir hata oluştu.",
        variant: "destructive"
      });
      return { isValid: false, kurumData: null };
    }
  };

  return { validateToken };
};
