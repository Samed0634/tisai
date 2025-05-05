
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { LoginForm } from "@/components/auth/LoginForm";
import { LogoHeader } from "@/components/auth/LogoHeader";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Array of floating text messages (updated with removed and new phrases)
  const floatingTexts = [
    "TISAI, bir toplu iş sözleşmesi takip otomasyonudur.",
    "Veri gir, süreleri TISAI takip etsin.",
    "Whatsapp ile hatırlatma yapabilir.",
    "Bu işin uzmanları tarafından, sendikalar için geliştirildi",
    "Herkes kullanabilsin diye basit kullanıcı arayüzü sunar",
    "Hamurunda yapay zeka bulunmaktadır.",
    "TISAI-Call ile 7/24 üyelerle iletişim ve sorunların anlık tespiti mümkün hale gelmektedir.",
    "TISAI-Call için takipte kalın!",
    "Süreçleri yönetmek için bir Uzman olmanıza gerek yok!",
    "Genç TİS Uzmanları tarafından, sektördeki boşluğu doldurmak için geliştirildi",
    "Verileriniz bulut veritabanında güvende!",
    "Bireysel ve Kurumsal kullanımlara uygundur",
    // New text phrases about legal procedures
    "Yetki belgesinin tebliğinden itibaren 15 gün içinde toplu iş sözleşmesi müzakereleri için işverenliğe çağrıda bulunulmalıdır",
    "Yasal müzakere süreci, ilk oturum tutanağından itibaren 60 gündür",
    "Çağrı yapılan tarihten itibaren 6 işgünü içinde yer ve gün tespit edilememesi, işçi sendikasının yetkisini düşüren bir hal değildir.",
    "Grev oylamasında oyların eşitliği halinde işyerinde 'greve evet' çıkmış demektir."
  ];

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleNavigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/40 relative overflow-hidden">
      {/* Futuristic animated background */}
      <AnimatedBackground texts={floatingTexts} />
      
      {/* Login card with glass effect */}
      <Card className="w-[350px] bg-white/80 backdrop-blur-md border border-white/20 shadow-xl">
        <CardHeader className="space-y-1">
          <LogoHeader />
        </CardHeader>
        <CardContent>
          <LoginForm onNavigateToSignup={handleNavigateToSignup} />
        </CardContent>
        <CardFooter className="flex flex-col justify-center space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            Hesabınız yok mu?{" "}
            <Button variant="link" className="p-0" onClick={handleNavigateToSignup}>
              Kayıt Ol
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
