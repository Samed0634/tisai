
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileUp, Loader2, Upload, FileCheck, Check, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActionHistory } from "@/hooks/useActionHistory";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const UploadTis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [company, setCompany] = useState("");
  const [tisType, setTisType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Upload, 2: Verify
  const [fileDetails, setFileDetails] = useState<{
    isyeri_adi: string;
    yururluk_suresi: string;
    imza_tarihi: string;
    belge_konusu: string;
  }>({ isyeri_adi: "", yururluk_suresi: "", imza_tarihi: "", belge_konusu: "" });
  const [processingDoc, setProcessingDoc] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [showUploadingDialog, setShowUploadingDialog] = useState(false);

  const { toast } = useToast();
  const { logAction } = useActionHistory();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadError("");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen bir dosya seçiniz.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setUploadError("");
    setShowUploadingDialog(true);

    try {
      // Webhook'a dosya gönderme
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://primary-production-dcf9.up.railway.app/webhook-test/dosyayukle", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Dosya yükleme hatası: ${response.status}`);
      }

      const data = await response.json();
      
      // Webhook yanıtını işleme
      setFileDetails({
        isyeri_adi: data.isyeri_adi || "",
        yururluk_suresi: data.yururluk_suresi || "",
        imza_tarihi: data.imza_tarihi || "",
        belge_konusu: data.belge_konusu || "",
      });

      // Step 2'ye geç
      setStep(2);
      await logAction("TİS Dosyası Webhook'a Gönderildi");

    } catch (error) {
      console.error("Webhook hatası:", error);
      setUploadError("Dosya işlenirken bir hata oluştu. Lütfen tekrar deneyiniz.");
      toast({
        title: "Hata",
        description: "Dosya işlenirken bir sorun oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setShowUploadingDialog(false);
    }
  };

  const handleSubmitVerifiedData = async () => {
    setProcessingDoc(true);
    
    try {
      // Kullanıcı bilgisini al
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Kullanıcı bilgisi alınamadı.");
      }

      if (!file) {
        throw new Error("Dosya bulunamadı.");
      }

      // Dosyayı storage'a yükle
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('belge-dosyalari')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }

      // Belge bilgilerini veritabanına kaydet
      const { error: insertError } = await supabase
        .from('belgeler')
        .insert({
          user_id: user.id,
          isyeri_adi: fileDetails.isyeri_adi,
          yururluk_suresi: fileDetails.yururluk_suresi,
          imza_tarihi: fileDetails.imza_tarihi,
          belge_konusu: fileDetails.belge_konusu,
          storage_path: filePath
        });
      
      if (insertError) {
        throw insertError;
      }

      // İşlem geçmişine kaydet
      await logAction("TİS Dosyası Sisteme Kaydedildi");
      
      toast({
        title: "Başarılı",
        description: "TİS dosyası başarıyla yüklendi ve veritabanına kaydedildi.",
        variant: "default"
      });

      // İşlem sonrası sıfırlama
      setFile(null);
      setFileDetails({ isyeri_adi: "", yururluk_suresi: "", imza_tarihi: "", belge_konusu: "" });
      setStep(1);
      
      // File input'unu temizle
      const fileInput = document.getElementById("tis-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (error) {
      console.error("Veri kaydetme hatası:", error);
      toast({
        title: "Hata",
        description: "Dosya kaydedilirken bir sorun oluştu.",
        variant: "destructive"
      });
    } finally {
      setProcessingDoc(false);
    }
  };

  const renderUploadStep = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileUp className="h-5 w-5 text-primary-500" />
            TİS Dosyası Yükleme
          </CardTitle>
          <CardDescription>
            Sözleşme dosyasını yükleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="tis-file">Sözleşme Dosyası</Label>
              <div className="border rounded-md p-4 cursor-pointer hover:bg-secondary-50 transition-colors">
                <Input id="tis-file" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                <Label htmlFor="tis-file" className="flex flex-col items-center gap-2 cursor-pointer">
                  <Upload className="h-8 w-8 text-secondary-400" />
                  <span className="text-sm font-medium">
                    {file ? file.name : "Dosya seçmek için tıklayın"}
                  </span>
                  <span className="text-xs text-secondary-500">
                    PDF, DOC veya DOCX formatında olmalıdır
                  </span>
                </Label>
              </div>
            </div>

            {uploadError && (
              <div className="p-3 text-sm bg-red-50 text-red-700 rounded-md">
                {uploadError}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || !file}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2">Yükleniyor...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span className="ml-2">Yükle</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  const renderVerifyStep = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-primary-500" />
            Yüklenen Dosya Kontrol
          </CardTitle>
          <CardDescription>
            Lütfen dosyadan çıkarılan bilgileri kontrol edin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="isyeri-adi">İşyeri Adı</Label>
              <Input 
                id="isyeri-adi" 
                value={fileDetails.isyeri_adi} 
                onChange={(e) => setFileDetails({...fileDetails, isyeri_adi: e.target.value})}
                placeholder="İşyeri adını girin" 
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="yururluk-suresi">Yürürlük Süresi</Label>
              <Input 
                id="yururluk-suresi" 
                value={fileDetails.yururluk_suresi} 
                onChange={(e) => setFileDetails({...fileDetails, yururluk_suresi: e.target.value})}
                placeholder="Yürürlük süresi" 
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="imza-tarihi">İmza Tarihi</Label>
              <Input 
                id="imza-tarihi" 
                type="date" 
                value={fileDetails.imza_tarihi} 
                onChange={(e) => setFileDetails({...fileDetails, imza_tarihi: e.target.value})}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="belge-konusu">Belge Konusu</Label>
              <Input 
                id="belge-konusu" 
                value={fileDetails.belge_konusu} 
                onChange={(e) => setFileDetails({...fileDetails, belge_konusu: e.target.value})}
                placeholder="Belge konusu" 
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(1)} disabled={processingDoc}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Geri
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSubmitVerifiedData} 
                disabled={processingDoc}
              >
                {processingDoc ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2">İşleniyor...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span className="ml-2">Veriyi Gönder</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="heading-1">Tis Yükle</h1>
      <p className="text-secondary-600">
        Bağıtlanan Toplu İş Sözleşmesi (TİS) dosyalarını sisteme yükleyebilirsiniz.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {step === 1 ? renderUploadStep() : renderVerifyStep()}

        <Card>
          <CardHeader>
            <CardTitle>Yükleme Talimatları</CardTitle>
            <CardDescription>
              Dosya yükleme hakkında bilgiler
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Dosya Formatı</h3>
              <p className="text-sm text-secondary-600">
                Yüklediğiniz TİS dosyaları PDF, DOC veya DOCX formatında olmalıdır. Maksimum dosya boyutu 10MB'dır.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">İşlem Adımları</h3>
              <p className="text-sm text-secondary-600">
                1. Dosya yükleyin<br />
                2. Dosyadan çıkarılan bilgileri kontrol edin<br />
                3. Onayladıktan sonra veriyi sisteme kaydedin
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Bilgiler</h3>
              <p className="text-sm text-secondary-600">
                İşyeri adı, belge konusu ve tarihler gibi bilgilerin doğru girilmesi, verilerin düzgün kategorize edilmesi için önemlidir.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dosya işleme dialog */}
      <Dialog open={showUploadingDialog} onOpenChange={setShowUploadingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Dosya İşleniyor</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-12 w-12 text-primary-500 animate-spin" />
            <p className="mt-4 text-center text-muted-foreground">
              Dosyanız işleniyor, lütfen bekleyiniz...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadTis;
