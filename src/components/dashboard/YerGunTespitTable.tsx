
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface YerGunTespitTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const YerGunTespitTable: React.FC<YerGunTespitTableProps> = ({ 
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
      tableType="yerGunTespitColumns"
      editableField="YER VE GÜN TESPİT TARİHİ"
      title="Yer ve Gün Tespiti Yapılan İşyerleri"
      defaultColumns={defaultColumns}
    />
  );
};
