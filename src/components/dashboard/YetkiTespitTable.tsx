
import React from "react";
import { EditableTableBase } from "./EditableTableBase";

interface WorkplaceItem {
  ID: number;
  [key: string]: any;
}

interface YetkiTespitTableProps {
  data: WorkplaceItem[];
  isLoading?: boolean;
  refetch: () => void;
}

export const YetkiTespitTable: React.FC<YetkiTespitTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="yetkiTespitColumns"
      editableField="YETKİ BELGESİ TEBLİĞ TARİHİ"
      title="Yetki Tespiti İstenen İşyerleri"
    />
  );
};
