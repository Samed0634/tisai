
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface CagriYapilacakTableProps {
  data: Workplace[];
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
