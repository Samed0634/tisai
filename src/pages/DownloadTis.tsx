
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

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
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = async (storagePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('belge-dosyalari')
        .download(storagePath);
      
      if (error) {
        throw error;
      }
      
      // Create a download link and trigger download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'document';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return <div className="container mx-auto p-6">
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
              <Card key={item.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item.isyeri_adi}</h3>
                    <p className="text-sm text-muted-foreground">
                      Yürürlük Süresi: {item.yururluk_suresi}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleDownload(item.storage_path, `${item.isyeri_adi}_TIS.pdf`)}
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
