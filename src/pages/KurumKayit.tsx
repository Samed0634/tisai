
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

        // Eğer bir kurum bulunduysa, hasKurum'u true yap
        if (data && data.kurum_id) {
          setHasKurum(true);
        } else {
          setHasKurum(false);
        }
      } catch (error) {
        console.error("Kurum kontrol hatası:", error);
      }
    };

    checkUserKurum();
  }, [user]);

  if (hasKurum === null) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  // Eğer kullanıcının zaten bir kurumu varsa, bilgi mesajı göster
  if (hasKurum === true) {
    return (
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Kurum Kaydınız Mevcut</h1>
          <p className="text-muted-foreground mb-6">
            Sisteme kayıtlı bir kurumunuz bulunmaktadır. Abonelik planlarına göz atmak için Abonelik sayfasını ziyaret edebilirsiniz.
          </p>
          <button 
            onClick={() => navigate('/subscription')}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Abonelik Planlarına Git
          </button>
        </div>
      </div>
    );
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
