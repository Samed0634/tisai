import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus, RefreshCw } from "lucide-react";

const Actions = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="heading-1">İşlem Seçimi</h1>
      <p className="text-secondary-600">
        Yapmak istediğiniz işlemi seçin.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden">
          <div className="h-2 bg-primary-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary-500" />
              Yeni Veri Girişi
            </CardTitle>
            <CardDescription>
              Sisteme yeni işyeri verisi ekleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-secondary-600">
              İşyeri adı, SGK No, işçi sayısı gibi temel bilgileri içeren yeni bir kayıt oluşturun.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => navigate("/new-data")}>
              Veri Ekle
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-2 bg-secondary-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-secondary-500" />
              Veri Güncelleme
            </CardTitle>
            <CardDescription>
              Mevcut işyeri verilerini güncelleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-secondary-600">
              İşyeri bilgilerini, çağrı tarihlerini, oturum kayıtlarını ve diğer verileri güncelleyin.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => navigate("/update-data")}
            >
              Veri Güncelle
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-2 bg-success-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-success-500" />
              Bilgi Alma
            </CardTitle>
            <CardDescription>
              Chatbot ile bilgi alın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-secondary-600">
              Sistemdeki verileri sorgulayın, istatistikleri görüntüleyin ve doğal dil ile sorularınızı sorun.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => navigate("/chatbot")}
            >
              Chatbot'a Git
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Actions;
