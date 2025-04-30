
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface GrevKarariTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const GrevKarariTable: React.FC<GrevKarariTableProps> = ({ 
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
      tableType="grevKarariColumns"
      editableField="GREV KARARI TARİHİ"
      title="Grev Kararı Alınması Gereken İşyerleri"
      defaultColumns={defaultColumns || ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV KARARI TARİHİ"]}
    />
  );
};
