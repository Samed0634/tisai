
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface GrevOylamasiTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const GrevOylamasiTable: React.FC<GrevOylamasiTableProps> = ({ 
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
      tableType="oylamaColumns"
      editableField="GREV OYLAMASI TARİHİ"
      title="Grev Oylaması Yapılması Gereken İşyerleri"
      defaultColumns={defaultColumns}
    />
  );
};
