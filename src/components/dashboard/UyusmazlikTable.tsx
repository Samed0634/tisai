
import React, { useState } from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface UyusmazlikTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
}

export const UyusmazlikTable: React.FC<UyusmazlikTableProps> = ({ 
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
      tableType="uyusmazlikColumns"
      editableField="UYUŞMAZLIK TARİHİ"
      title="Uyuşmazlık Gereken İşyerleri"
      pageSize={pageSize}
      currentPage={currentPage}
      setPageSize={setPageSize}
      setCurrentPage={setCurrentPage}
    />
  );
};
