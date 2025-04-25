
import React, { useState, useEffect } from "react";
import { Edit, Check, X } from "lucide-react";
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
  
  const handleEdit = (item: WorkplaceItem) => {
    setEditingId(item.ID);
    setEditData({ ...item });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleChange = (field: string, value: string | number) => {
    if (editData) {
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
        .from('isyerleri') // Using the base table, not the view
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

  const visibleColumns = [
    'İŞYERİ ADI',
    'SORUMLU UZMAN',
    'İŞÇİ SAYISI',
    'ÜYE SAYISI',
    'ARABULUCU RAPORU TEBLİĞ TARİHİ',
    'GREV KARARI TARİHİ'
  ];

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[#ea384c]">İşlem</TableHead>
            {visibleColumns.map(column => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={visibleColumns.length + 1} className="text-center py-6">
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
                
                {visibleColumns.map(column => (
                  <TableCell key={`${item.ID}-${column}`}>
                    {editingId === item.ID && editData ? (
                      column === 'İŞÇİ SAYISI' || column === 'ÜYE SAYISI' ? (
                        <Input 
                          type="number"
                          value={editData[column] || ''}
                          onChange={(e) => handleChange(column, parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                      ) : column === 'ARABULUCU RAPORU TEBLİĞ TARİHİ' || column === 'GREV KARARI TARİHİ' ? (
                        <Input 
                          type="date"
                          value={editData[column] ? new Date(editData[column]).toISOString().split('T')[0] : ''}
                          onChange={(e) => handleChange(column, e.target.value)}
                          className="w-40"
                        />
                      ) : (
                        <Input 
                          value={editData[column] || ''}
                          onChange={(e) => handleChange(column, e.target.value)}
                          className="w-full"
                        />
                      )
                    ) : (
                      column === 'ARABULUCU RAPORU TEBLİĞ TARİHİ' || column === 'GREV KARARI TARİHİ' ? (
                        item[column] ? new Date(item[column]).toLocaleDateString('tr-TR') : ''
                      ) : (
                        item[column]
                      )
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
