
import React, { useState } from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface YhkGonderimTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
}

export const YhkGonderimTable: React.FC<YhkGonderimTableProps> = ({ 
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
      tableType="yhkGonderimColumns"
      editableField="YHK GÖNDERİM TARİHİ"
      title="YHK Gönderim Gereken İşyerleri"
      pageSize={pageSize}
      currentPage={currentPage}
      setPageSize={setPageSize}
      setCurrentPage={setCurrentPage}
    />
  );
};
