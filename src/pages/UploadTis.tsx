import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileUp, Loader2, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const UploadTis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [company, setCompany] = useState("");
  const [tisType, setTisType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !company || !tisType || !startDate || !endDate) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm alanları doldurunuz ve bir dosya seçiniz.",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);

    // Form verilerini oluştur
    const formData = new FormData();
    formData.append("file", file);
    formData.append("company", company);
    formData.append("tisType", tisType);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    try {
      // API'ye form verilerini gönderme simülasyonu
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Başarılı",
        description: "TİS dosyası başarıyla yüklendi.",
        variant: "default"
      });

      // Formu sıfırla
      setFile(null);
      setCompany("");
      setTisType("");
      setStartDate("");
      setEndDate("");

      // File input'unu temizle
      const fileInput = document.getElementById("tis-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast({
        title: "Hata",
        description: "Dosya yüklenirken bir sorun oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="space-y-6">
      <h1 className="heading-1">Tis Yükleme</h1>
      <p className="text-secondary-600">
        Bağıtlanan Toplu İş Sözleşmesi (TİS) dosyalarını sisteme yükleyebilirsiniz.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileUp className="h-5 w-5 text-primary-500" />
              TİS Dosyası Yükleme
            </CardTitle>
            <CardDescription>
              Sözleşme dosyasını ve ilgili bilgileri girin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="space-y-1.5">
                <Label htmlFor="company">İşyeri Adı</Label>
                <Input id="company" value={company} onChange={e => setCompany(e.target.value)} placeholder="İşyeri adını girin" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tis-type">TİS Türü</Label>
                <Select value={tisType} onValueChange={setTisType}>
                  <SelectTrigger>
                    <SelectValue placeholder="TİS türünü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="işletme">İşletme TİS</SelectItem>
                    <SelectItem value="işyeri">İşyeri TİS</SelectItem>
                    <SelectItem value="grup">Grup TİS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="start-date">Başlangıç Tarihi</Label>
                  <Input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="end-date">Bitiş Tarihi</Label>
                  <Input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2">Yükleniyor...</span>
                  </> : <>
                    <Upload className="h-4 w-4" />
                    <span className="ml-2">Yükle</span>
                  </>}
              </Button>
            </form>
          </CardContent>
        </Card>

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
              <h3 className="font-semibold">Bilgiler</h3>
              <p className="text-sm text-secondary-600">
                İşyeri adı, TİS türü ve tarihler gibi bilgilerin doğru girilmesi, verilerin düzgün kategorize edilmesi için önemlidir.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Onay Süreci</h3>
              <p className="text-sm text-secondary-600">
                Yüklenen dosyalar sistem yöneticileri tarafından onaylandıktan sonra aktif olarak kullanılabilir hale gelecektir.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default UploadTis;