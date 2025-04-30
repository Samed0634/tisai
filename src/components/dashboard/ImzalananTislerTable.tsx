
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface ImzalananTislerTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const ImzalananTislerTable: React.FC<ImzalananTislerTableProps> = ({ 
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
      tableType="imzalananTislerColumns"
      editableField="TİS GELİŞ TARİHİ"
      title="İmzalanan Tisler"
      defaultColumns={defaultColumns || ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "TİS GELİŞ TARİHİ"]}
    />
  );
};
