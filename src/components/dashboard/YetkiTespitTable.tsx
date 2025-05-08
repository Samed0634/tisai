
import React, { useState } from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface YetkiTespitTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
}

export const YetkiTespitTable: React.FC<YetkiTespitTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="yetkiTespitColumns"
      editableField="YETKİ BELGESİ TEBLİĞ TARİHİ"
      title="Yetki Tespiti İstenen İşyerleri"
      pageSize={pageSize}
      currentPage={currentPage}
      setPageSize={setPageSize}
      setCurrentPage={setCurrentPage}
    />
  );
};
