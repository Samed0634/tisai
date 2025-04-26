
import React from "react";
import { EditableTableBase } from "./EditableTableBase";

interface WorkplaceItem {
  ID: number;
  [key: string]: any;
}

interface UyusmazlikTableProps {
  data: WorkplaceItem[];
  isLoading?: boolean;
  refetch: () => void;
}

export const UyusmazlikTable: React.FC<UyusmazlikTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="uyusmazlikColumns"
      editableField="UYUŞMAZLIK TARİHİ"
      title="Uyuşmazlık Gereken İşyerleri"
    />
  );
};
