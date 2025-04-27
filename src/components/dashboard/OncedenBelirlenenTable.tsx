
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface OncedenBelirlenenTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
}

export const OncedenBelirlenenTable: React.FC<OncedenBelirlenenTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="oncedenBelirlenenColumns"
      editableField="ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"
      title="Önceden Belirlenen İlk Oturum İşyerleri"
    />
  );
};
