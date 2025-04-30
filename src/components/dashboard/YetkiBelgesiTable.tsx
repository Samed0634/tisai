
import React, { useState } from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface YetkiBelgesiTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const YetkiBelgesiTable: React.FC<YetkiBelgesiTableProps> = ({ 
  data, 
  isLoading = false,
  refetch,
  defaultColumns
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="yetkiBelgesiColumns"
      editableField="ÇAĞRI TARİHİ"
      title="Yetki Belgesi Tebliğ Yapılan İşyerleri"
      currentPage={currentPage}
      pageSize={pageSize}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      defaultColumns={defaultColumns || ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YETKİ BELGESİ TEBLİĞ TARİHİ"]}
    />
  );
};
