
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DownloadTis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = async () => {
    if (!searchTerm) return;
    setIsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.from('belgeler').select('*').ilike('isyeri_adi', `%${searchTerm}%`);
      
      if (error) throw error;
      setResults(data || []);
      
      if (data?.length === 0) {
        toast.info("Arama sonucu bulunamadı.");
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error("Arama sırasında bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('belge-dosyalari')
        .download(filePath);
      
      if (error) throw error;
      
      // Create a URL for the file and trigger download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'dokuman.pdf';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Belge indiriliyor...");
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Belge indirilemedi.");
    }
  };

  return <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">TİS İndir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input 
              type="text" 
              placeholder="İşyeri adı ile arama yapın..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1" 
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Aranıyor...' : 'Ara'}
            </Button>
          </div>

          <div className="space-y-4">
            {results.map(item => (
              <Card key={item.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item.isyeri_adi}</h3>
                    <p className="text-sm text-muted-foreground">
                      Yürürlük Süresi: {item.yururluk_suresi || 'Belirtilmemiş'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      İmza Tarihi: {item.imza_tarihi || 'Belirtilmemiş'}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleDownload(item.storage_path)}
                  >
                    <Download className="h-4 w-4" />
                    İndir
                  </Button>
                </div>
              </Card>
            ))}
            
            {results.length === 0 && searchTerm && !isLoading && (
              <p className="text-center text-muted-foreground">
                Sonuç bulunamadı.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>;
};

export default DownloadTis;
