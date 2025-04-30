
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface YhkGonderimTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const YhkGonderimTable: React.FC<YhkGonderimTableProps> = ({ 
  data, 
  isLoading = false,
  refetch,
  defaultColumns
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="yhkColumns"
      editableField="YHK GÖNDERİM TARİHİ"
      title="YHK Gönderimi Gereken İşyerleri"
      defaultColumns={defaultColumns}
    />
  );
};
