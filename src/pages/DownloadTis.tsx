
import React, { useState, useMemo } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { normalizeText, fuzzySearch } from '@/utils/searchUtils';

const DownloadTis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allResults, setAllResults] = useState<any[]>([]); // Store all results
  const [isLoading, setIsLoading] = useState(false);

  // Filter results locally based on search term for instant feedback
  const results = useMemo(() => {
    if (!searchTerm) return allResults;
    
    return allResults.filter(item => 
      fuzzySearch(searchTerm, item['İŞYERİ ADI']) || 
      fuzzySearch(searchTerm, item['SORUMLU UZMAN']) ||
      fuzzySearch(searchTerm, item['SGK NO'])
    );
  }, [searchTerm, allResults]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Fetch all items with TIS URLs, then filter on client side
      const { data, error } = await supabase
        .from('isyerleri')
        .select('*')
        .not('tis_url', 'is', null);
      
      if (error) throw error;
      
      setAllResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Hata",
        description: "Arama yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (url: string, workplaceName: string) => {
    try {
      // Open the URL in a new tab/window
      window.open(url, '_blank');
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Hata",
        description: "TİS indirme işlemi başarısız oldu.",
        variant: "destructive",
      });
    }
  };

  // Load data when component mounts
  React.useEffect(() => {
    handleSearch();
  }, []);

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
              placeholder="İşyeri adı ile hızlı arama yapın..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="flex-1"
              title="Büyük/küçük harf ve Türkçe karakter duyarlılığı olmadan arama yapar"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
            >
              Yenile
            </Button>
          </div>

          <div className="space-y-4">
            {results.map(item => (
              <Card key={item.ID} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item['İŞYERİ ADI']}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item['TİS BAŞLANGIÇ TARİHİ'] && item['TİS BİTİŞ TARİHİ'] && (
                        <>Yürürlük Süresi: {new Date(item['TİS BAŞLANGIÇ TARİHİ']).toLocaleDateString('tr-TR')} - {new Date(item['TİS BİTİŞ TARİHİ']).toLocaleDateString('tr-TR')}</>
                      )}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleDownload(item.tis_url, item['İŞYERİ ADI'])}
                    disabled={!item.tis_url}
                  >
                    <Download className="h-4 w-4" />
                    İndir
                  </Button>
                </div>
              </Card>
            ))}
            
            {results.length === 0 && !isLoading && (
              <p className="text-center text-muted-foreground">
                {allResults.length === 0 ? 'TİS belgesi bulunamadı.' : 'Arama sonucu bulunamadı.'}
              </p>
            )}

            {isLoading && (
              <p className="text-center text-muted-foreground">
                Yükleniyor...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadTis;
