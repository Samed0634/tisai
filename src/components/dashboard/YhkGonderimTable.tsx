
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface YhkGonderimTableProps {
  data: Workplace[];
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
      tableType="yhkColumns"
      editableField="YHK GÖNDERİM TARİHİ"
      title="YHK Gönderim Gereken İşyerleri"
      showControls={true}
      logActions={true}
    />
  );
};
