
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface IlkOturumTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const IlkOturumTable: React.FC<IlkOturumTableProps> = ({ 
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
      tableType="ilkOturumColumns"
      editableField="İLK OTURUM TARİHİ"
      title="İlk Oturum Gereken İşyerleri"
      defaultColumns={defaultColumns}
    />
  );
};
