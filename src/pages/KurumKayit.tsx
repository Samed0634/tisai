
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import KurumRegistrationForm from "@/components/subscription/KurumRegistrationForm";

const KurumKayit = () => {
  const [hasKurum, setHasKurum] = useState<boolean | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserKurum = async () => {
      if (!user) return;

      try {
        // Kullanıcının bağlı olduğu bir kurum var mı kontrol et
        const { data, error } = await supabase
          .from("kullanici_kurumlar")
          .select("kurum_id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Kurum kontrolü hatası:", error);
          return;
        }

        // Eğer bir kurum bulunduysa subscription sayfasına yönlendir
        if (data && data.kurum_id) {
          setHasKurum(true);
          navigate("/subscription");
        } else {
          setHasKurum(false);
        }
      } catch (error) {
        console.error("Kurum kontrol hatası:", error);
      }
    };

    checkUserKurum();
  }, [user, navigate]);

  // Eğer kontrol devam ediyorsa veya kullanıcının kurumu varsa yükleniyor göster
  if (hasKurum === null || hasKurum === true) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Kurum Kayıt</h1>
        <p className="text-muted-foreground mt-2">
          TİS Takip Sistemini kullanabilmek için kurumunuzu kaydettirmeniz gerekmektedir.
        </p>
      </div>
      <KurumRegistrationForm />
    </div>
  );
};

export default KurumKayit;
