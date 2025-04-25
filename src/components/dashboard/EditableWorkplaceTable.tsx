
import React, { useState, useEffect } from "react";
import { Edit, Check, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { StatusBadge } from "@/components/data-details/StatusBadge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TableControls } from "@/components/data-details/TableControls";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import { COLUMNS } from "@/constants/tableColumns";

interface WorkplaceItem {
  ID: number;
  [key: string]: any;
}

interface EditableWorkplaceTableProps {
  data: WorkplaceItem[];
  isLoading?: boolean;
  refetch: () => void;
}

export const EditableWorkplaceTable: React.FC<EditableWorkplaceTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<WorkplaceItem | null>(null);
  const { visibleColumns, toggleColumn } = useColumnVisibility();
  
  const handleEdit = (item: WorkplaceItem) => {
    setEditingId(item.ID);
    setEditData({ ...item });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleChange = (field: string, value: string | number) => {
    if (editData && field === 'GREV KARARI TARİHİ') {
      setEditData({
        ...editData,
        [field]: value
      });
    }
  };

  const handleSave = async () => {
    if (!editData) return;
    
    try {
      const { error } = await supabase
        .from('isyerleri')
        .update(editData)
        .eq('ID', editData.ID);
      
      if (error) throw error;
      
      toast({
        title: "Başarılı",
        description: "İşyeri bilgileri güncellendi.",
        variant: "default",
      });
      
      setEditingId(null);
      setEditData(null);
      refetch();
    } catch (error) {
      console.error("Error updating workplace:", error);
      toast({
        title: "Hata",
        description: "İşyeri bilgileri güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-md border p-8">
        <LoadingSpinner />
      </div>
    );
  }

  const visibleColumnDefinitions = COLUMNS.filter(col => 
    visibleColumns.includes(col.id)
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <TableControls 
          visibleColumns={visibleColumns}
          toggleColumn={toggleColumn}
        />
      </div>
      
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#ea384c]">İşlem</TableHead>
              {visibleColumnDefinitions.map(column => (
                <TableHead key={column.id}>{column.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumnDefinitions.length + 1} className="text-center py-6">
                  Görüntülenecek veri bulunamadı
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.ID} className="hover:bg-muted/50">
                  <TableCell>
                    {editingId === item.ID ? (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleSave}
                          className="hover:bg-green-100 hover:text-green-600"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleCancel}
                          className="hover:bg-red-100 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(item)}
                        className="hover:bg-primary hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                  
                  {visibleColumnDefinitions.map(column => (
                    <TableCell key={`${item.ID}-${column.id}`}>
                      {editingId === item.ID && editData && column.editable ? (
                        <Input 
                          type="date"
                          value={editData[column.id] ? new Date(editData[column.id]).toISOString().split('T')[0] : ''}
                          onChange={(e) => handleChange(column.id, e.target.value)}
                          className="w-40"
                        />
                      ) : (
                        column.id.includes('TARİHİ') ? 
                          item[column.id] ? new Date(item[column.id]).toLocaleDateString('tr-TR') : ''
                          : item[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
