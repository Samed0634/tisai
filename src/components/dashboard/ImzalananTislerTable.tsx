
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface ImzalananTislerTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
}

export const ImzalananTislerTable: React.FC<ImzalananTislerTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="imzalananTislerColumns"
      editableField="TİS GELİŞ TARİHİ"
      title="İmzalanan Tisler"
    />
  );
};
