
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
      } = await supabase.from('isyerleri').select('*').ilike('İŞYERİ ADI', `%${searchTerm}%`);
      
      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Arama Hatası",
        description: "Arama sırasında bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (item: any) => {
    // This is a placeholder for actual download functionality
    // You would implement this based on how your TIS documents are stored
    toast({
      title: "İndirme Başlatıldı",
      description: `${item['İŞYERİ ADI']} için TİS indiriliyor...`,
    });
  };
  
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tis İndir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input 
              type="text" 
              placeholder="İşyeri adı ile arama yapın..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="flex-1" 
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              Ara
            </Button>
          </div>

          <div className="space-y-4">
            {results.map(item => (
              <Card key={item.ID} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item['İŞYERİ ADI']}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item['TİS BAŞLANGIÇ TARİHİ'] && item['TİS BİTİŞ TARİHİ'] ? 
                        `Yürürlük Süresi: ${new Date(item['TİS BAŞLANGIÇ TARİHİ']).toLocaleDateString('tr-TR')} - ${new Date(item['TİS BİTİŞ TARİHİ']).toLocaleDateString('tr-TR')}` : 
                        'Yürürlük bilgisi bulunamadı'}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleDownload(item)}
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
    </div>
  );
};

export default DownloadTis;
