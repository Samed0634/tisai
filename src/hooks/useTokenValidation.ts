
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
  error?: string;
}

export const useTokenValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validateToken = async (tokenId: string): Promise<ValidationResult> => {
    setIsValidating(true);
    try {
      // Temizlenmiş token değeri (baştaki ve sondaki boşlukları kaldır)
      const cleanToken = tokenId.trim();
      console.log("Temizlenmiş token değeri:", cleanToken);
      console.log("Token uzunluğu:", cleanToken.length);

      if (!cleanToken || cleanToken.length === 0) {
        return { isValid: false, kurumData: null, error: "Token boş olamaz. Lütfen geçerli bir kurum token ID giriniz." };
      }

      // Tüm kurumları çek ve manuel olarak karşılaştır (büyük-küçük harf duyarsız)
      console.log("Token sorgusu başlatılıyor...");
      const { data: kurumDataList, error: kurumError } = await supabase
        .from("kurumlar")
        .select("id, kayit_token, token_aktif_mi");

      if (kurumError) {
        console.error("Token sorgu hatası:", kurumError);
        return { isValid: false, kurumData: null, error: kurumError.message || "Token doğrulama sırasında bir hata oluştu." };
      }

      console.log("Veritabanından alınan kayıtlar:", kurumDataList);

      // Manuel olarak büyük-küçük harf duyarsız eşleştirme yap
      const kurumData = kurumDataList?.find(kurum => {
        const dbToken = kurum.kayit_token?.trim() || "";
        const inputToken = cleanToken.toLowerCase();
        const dbTokenLower = dbToken.toLowerCase();
        
        console.log("Token karşılaştırması:", {
          girilenToken: inputToken,
          dbToken: dbTokenLower,
          esitMi: inputToken === dbTokenLower
        });
        
        return inputToken === dbTokenLower;
      }) || null;

      if (!kurumData) {
        console.error("Token bulunamadı: Token veritabanında mevcut değil.");
        return { isValid: false, kurumData: null, error: "Geçersiz kurum token ID. Lütfen geçerli bir token alınız." };
      }

      // Check if token is active
      if (!kurumData.token_aktif_mi) {
        console.log("Token pasif durumda:", kurumData.token_aktif_mi);
        return { isValid: false, kurumData: null, error: "Bu token aktif değil. Lütfen kurum yöneticinizle iletişime geçiniz." };
      }

      console.log("Token doğrulama başarılı:", kurumData);
      return { isValid: true, kurumData };
    } catch (error: any) {
      console.error("Token doğrulama hatası:", error);
      return { isValid: false, kurumData: null, error: error?.message || "Token doğrulama sırasında bir hata oluştu." };
    } finally {
      setIsValidating(false);
    }
  };

  return { validateToken, isValidating };
};
