
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface WorkplaceItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface UpdateWorkplaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workplace: WorkplaceItem | null;
  processDate: string;
  onProcessDateChange: (value: string) => void;
  onUpdate: () => void;
  isLoading?: boolean;
}

const UpdateWorkplaceDialog: React.FC<UpdateWorkplaceDialogProps> = ({ 
  open, 
  onOpenChange, 
  workplace, 
  processDate, 
  onProcessDateChange, 
  onUpdate,
  isLoading = false
}) => {
  const { toast } = useToast();
  
  if (!workplace) return null;

  const handleUpdate = async () => {
    try {
      await onUpdate();
      toast({
        title: "Başarılı",
        description: "İşyeri bilgileri başarıyla güncellendi.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşyeri bilgileri güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>İşlem Tamamlama: {workplace.name}</DialogTitle>
          <DialogDescription>
            İşyeri için işlem bilgilerini güncelleyin.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="processDate">İşlem Tarihi</Label>
              <Input
                id="processDate"
                type="date"
                value={processDate}
                onChange={(e) => onProcessDateChange(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notlar</Label>
              <Textarea
                id="notes"
                placeholder="İşlem ile ilgili notlar..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        )}
        <DialogFooter className="sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            İptal
          </Button>
          <Button 
            type="button" 
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Kaydediliyor...
              </>
            ) : (
              "Kaydet"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWorkplaceDialog;
