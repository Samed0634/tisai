
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface MuzakereSuresiTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const MuzakereSuresiTable: React.FC<MuzakereSuresiTableProps> = ({ 
  data, 
  isLoading = false,
  refetch,
  defaultColumns = ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İLK OTURUM TARİHİ"]
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="muzakereSuresiColumns"
      editableField="UYUŞMAZLIK TARİHİ"
      title="Müzakere Süresi Dolan İşyerleri"
      defaultColumns={defaultColumns}
    />
  );
};
