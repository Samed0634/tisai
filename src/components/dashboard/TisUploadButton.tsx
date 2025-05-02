
import React, { useState } from 'react';
import { Upload, Check, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useActionHistory } from '@/hooks/useActionHistory';
import { useQueryClient } from '@tanstack/react-query';

interface TisUploadButtonProps {
  workplaceId: number;
  workplaceName: string;
}

export const TisUploadButton: React.FC<TisUploadButtonProps> = ({ workplaceId, workplaceName }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const { toast } = useToast();
  const { logAction } = useActionHistory();
  const queryClient = useQueryClient();
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Only accept PDF files
    if (file.type !== 'application/pdf') {
      toast({
        title: "Dosya Hatası",
        description: "Sadece PDF dosyaları yüklenebilir.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // 1. Upload file to Supabase Storage
      const fileName = `tis_${workplaceId}_${Date.now()}.pdf`;
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('isyeri-tisleri')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      // 2. Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from('isyeri-tisleri')
        .getPublicUrl(fileName);
      
      const fileUrl = urlData.publicUrl;
      
      // 3. Update the workplace record with the file URL
      const { error: updateError } = await supabase
        .from('isyerleri')
        .update({ tis_url: fileUrl })
        .eq('ID', workplaceId);
      
      if (updateError) throw updateError;
      
      // Log the action
      await logAction(`"${workplaceName}" işyeri için TİS belgesi yüklendi.`);
      
      // Show success message
      toast({
        title: "Yükleme Başarılı",
        description: "TİS belgesi başarıyla yüklendi ve kaydedildi."
      });
      
      setUploadComplete(true);
      
      // Refresh dashboard data
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setUploadComplete(false);
      }, 3000);
      
    } catch (error) {
      console.error('TİS upload error:', error);
      toast({
        title: "Yükleme Hatası",
        description: "TİS belgesi yüklenirken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleViewTis = async () => {
    try {
      // Get the TİS URL from the database
      const { data, error } = await supabase
        .from('isyerleri')
        .select('tis_url')
        .eq('ID', workplaceId)
        .single();
      
      if (error) throw error;
      
      if (data?.tis_url) {
        // Open the TİS in a new tab
        window.open(data.tis_url, '_blank');
      } else {
        toast({
          title: "Dosya Bulunamadı",
          description: "Bu işyeri için yüklenmiş TİS belgesi bulunamadı.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error viewing TİS:', error);
      toast({
        title: "Hata",
        description: "TİS belgesi görüntülenirken bir hata oluştu.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm"
        asChild
        disabled={isUploading}
        className="relative"
      >
        <label>
          {isUploading ? (
            <span className="flex items-center">
              <Upload className="h-4 w-4 animate-pulse mr-2" />
              Yükleniyor...
            </span>
          ) : uploadComplete ? (
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Yüklendi
            </span>
          ) : (
            <span className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              TİS Yükle
            </span>
          )}
          <input
            type="file"
            accept="application/pdf"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleViewTis}
        className="text-blue-500 hover:text-blue-700"
      >
        <FileText className="h-4 w-4" />
      </Button>
    </div>
  );
};
