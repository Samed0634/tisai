
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface MuzakereSuresiTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
}

export const MuzakereSuresiTable: React.FC<MuzakereSuresiTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="muzakereSuresiColumns"
      editableField="MÜZAKERE SÜRESİ SON TARİH"
      title="Müzakere Süresi Dolan İşyerleri"
      showControls={true}
      logActions={true}
    />
  );
};
