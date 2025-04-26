
import React from "react";
import { EditableTableBase } from "./EditableTableBase";

interface WorkplaceItem {
  ID: number;
  [key: string]: any;
}

interface YhkGonderimTableProps {
  data: WorkplaceItem[];
  isLoading?: boolean;
  refetch: () => void;
}

export const YhkGonderimTable: React.FC<YhkGonderimTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="yhkGonderimColumns"
      editableField="YHK GÖNDERİM TARİHİ"
      title="YHK Gönderim Gereken İşyerleri"
    />
  );
};
