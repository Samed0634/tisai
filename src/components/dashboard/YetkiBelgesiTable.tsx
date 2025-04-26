
import React from "react";
import { EditableTableBase } from "./EditableTableBase";

interface WorkplaceItem {
  ID: number;
  [key: string]: any;
}

interface YetkiBelgesiTableProps {
  data: WorkplaceItem[];
  isLoading?: boolean;
  refetch: () => void;
}

export const YetkiBelgesiTable: React.FC<YetkiBelgesiTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="yetkiBelgesiColumns"
      editableField="ÇAĞRI TARİHİ"
      title="Yetki Belgesi Tebliğ Yapılan İşyerleri"
    />
  );
};
