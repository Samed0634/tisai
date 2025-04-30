
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface OncedenBelirlenenTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const OncedenBelirlenenTable: React.FC<OncedenBelirlenenTableProps> = ({ 
  data, 
  isLoading = false,
  refetch,
  defaultColumns = ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İŞÇİ SAYISI", "ÜYE SAYISI"]
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="oncedenBelirlenenColumns"
      editableField="ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"
      title="Önceden Belirlenen İlk Oturum İşyerleri"
      defaultColumns={defaultColumns}
    />
  );
};
