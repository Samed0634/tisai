
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TisItem } from '../hooks/useTisData';
import { useToast } from "@/components/ui/use-toast";

interface TisResultCardProps {
  item: TisItem;
}

export const TisResultCard: React.FC<TisResultCardProps> = ({ item }) => {
  const { toast } = useToast();

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

  return (
    <Card key={item.ID} className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{item['İŞYERİ ADI']}</h3>
          <div className="text-sm text-muted-foreground flex flex-col gap-1">
            {item['TİS BAŞLANGIÇ TARİHİ'] && item['TİS BİTİŞ TARİHİ'] && (
              <span>
                Yürürlük Süresi: {new Date(item['TİS BAŞLANGIÇ TARİHİ']).toLocaleDateString('tr-TR')} - {new Date(item['TİS BİTİŞ TARİHİ']).toLocaleDateString('tr-TR')}
              </span>
            )}
            {item['BAĞLI OLDUĞU ŞUBE'] && (
              <span>Şube: {item['BAĞLI OLDUĞU ŞUBE']}</span>
            )}
            {item['SORUMLU UZMAN'] && (
              <span>Uzman: {item['SORUMLU UZMAN']}</span>
            )}
          </div>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => handleDownload(item.tis_url!, item['İŞYERİ ADI']!)}
          disabled={!item.tis_url}
        >
          <Download className="h-4 w-4" />
          İndir
        </Button>
      </div>
    </Card>
  );
};
