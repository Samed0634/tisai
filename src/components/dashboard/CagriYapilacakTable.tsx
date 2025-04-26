
import React from "react";
import { EditableTableBase } from "./EditableTableBase";

interface WorkplaceItem {
  ID: number;
  [key: string]: any;
}

interface CagriYapilacakTableProps {
  data: WorkplaceItem[];
  isLoading?: boolean;
  refetch: () => void;
}

export const CagriYapilacakTable: React.FC<CagriYapilacakTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="cagriColumns"
      editableField="ÇAĞRI TARİHİ"
      title="Çağrı Yapılacak İşyerleri"
    />
  );
};
