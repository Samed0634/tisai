
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useActionHistory } from "@/hooks/useActionHistory";

interface TisUploadButtonProps {
  workplaceId: number;
  workplaceName: string;
  onSuccess: () => void;
}

export const TisUploadButton: React.FC<TisUploadButtonProps> = ({
  workplaceId,
  workplaceName,
  onSuccess,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { logAction } = useActionHistory();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      toast({
        title: "Hata",
        description: "Sadece PDF dosyaları yüklenebilir.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate a unique filename with timestamp
      const timestamp = new Date().getTime();
      const fileName = `${workplaceId}_${timestamp}.pdf`;
      
      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("isyeri-tisleri")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the public URL of the uploaded file
      const { data: urlData } = supabase.storage
        .from("isyeri-tisleri")
        .getPublicUrl(fileName);
      
      if (!urlData?.publicUrl) throw new Error("URL alınamadı");

      // Update the workplace record with the TIS URL
      const { error: updateError } = await supabase
        .from("isyerleri")
        .update({ tis_url: urlData.publicUrl })
        .eq("ID", workplaceId);

      if (updateError) throw updateError;

      // Always log the action
      await logAction(`"${workplaceName}" işyeri için TİS dosyası yüklendi.`);

      toast({
        title: "Başarılı",
        description: "TİS dosyası başarıyla yüklendi.",
      });
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Notify parent component of successful upload
      onSuccess();
    } catch (error) {
      console.error("TİS yükleme hatası:", error);
      toast({
        title: "Hata",
        description: "TİS dosyası yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={handleUploadClick}
        disabled={isUploading}
        className="hover:bg-blue-100 hover:text-blue-600"
      >
        <Upload className="h-4 w-4" />
      </Button>
    </div>
  );
};
