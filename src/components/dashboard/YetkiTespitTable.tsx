
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface YetkiTespitTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const YetkiTespitTable: React.FC<YetkiTespitTableProps> = ({ 
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
      tableType="yetkiTespitColumns"
      editableField="YETKİ BELGESİ TEBLİĞ TARİHİ"
      title="Yetki Tespiti İstenen İşyerleri"
      defaultColumns={defaultColumns || ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YETKİ BELGESİ TEBLİĞ TARİHİ"]}
    />
  );
};
