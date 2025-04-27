
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface YetkiBelgesiTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
}

export const YetkiBelgesiTable: React.FC<YetkiBelgesiTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="yetkiBelgesiColumns"
      editableField="ÇAĞRI TARİHİ"
      title="Yetki Belgesi Tebliğ Yapılan İşyerleri"
    />
  );
};
