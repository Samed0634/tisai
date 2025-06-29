
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface UyusmazlikTableProps {
  data: Workplace[];
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
      showControls={true}
      logActions={true}
    />
  );
};
