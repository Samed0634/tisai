
import React, { useState } from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface CagriYapilacakTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
}

export const CagriYapilacakTable: React.FC<CagriYapilacakTableProps> = ({ 
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
      tableType="cagriColumns"
      editableField="ÇAĞRI TARİHİ"
      title="Çağrı Yapılacak İşyerleri"
      pageSize={pageSize}
      currentPage={currentPage}
      setPageSize={setPageSize}
      setCurrentPage={setCurrentPage}
      showHorizontalScrollbar={true}
    />
  );
};

