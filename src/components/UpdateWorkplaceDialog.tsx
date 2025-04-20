
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
  responsibleExpert?: string;
  branch?: string;
  sgkNo?: string;
  employeeCount?: number;
  memberCount?: number;
  status?: string;
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>İşlem Tamamlama: {workplace.name}</DialogTitle>
          <DialogDescription>
            İşyeri için işlem bilgilerini güncelleyin.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>İşlem Tarihi</Label>
            <div className="flex w-full items-center space-x-2">
              <Input 
                type="date" 
                value={processDate} 
                onChange={(e) => onProcessDateChange(e.target.value)} 
                className="w-full"
              />
            </div>
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
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={onUpdate}>
            İşlemi Tamamla
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWorkplaceDialog;
