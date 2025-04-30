
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
  defaultColumns = ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İŞÇİ SAYISI", "ÜYE SAYISI"]
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="yhkGonderimColumns"
      editableField="YHK GÖNDERİM TARİHİ"
      title="YHK Gönderim Gereken İşyerleri"
      defaultColumns={defaultColumns}
    />
  );
};
