
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
}

const UpdateWorkplaceDialog: React.FC<UpdateWorkplaceDialogProps> = ({ 
  open, 
  onOpenChange, 
  workplace, 
  processDate, 
  onProcessDateChange, 
  onUpdate 
}) => {
  if (!workplace) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>İşlem Tamamlama: {workplace.name}</DialogTitle>
          <DialogDescription>
            İşyeri için işlem bilgilerini güncelleyin.
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter className="sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            İptal
          </Button>
          <Button type="button" onClick={onUpdate}>
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWorkplaceDialog;
