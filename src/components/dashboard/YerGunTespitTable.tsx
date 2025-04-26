
import React from "react";
import { EditableTableBase } from "./EditableTableBase";

interface WorkplaceItem {
  ID: number;
  [key: string]: any;
}

interface YerGunTespitTableProps {
  data: WorkplaceItem[];
  isLoading?: boolean;
  refetch: () => void;
}

export const YerGunTespitTable: React.FC<YerGunTespitTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="yerGunTespitColumns"
      editableField="YER VE GÜN TESPİT TARİHİ"
      title="Yer ve Gün Tespiti Yapılan İşyerleri"
    />
  );
};
