
import React, { useState } from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface YerGunTespitTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
}

export const YerGunTespitTable: React.FC<YerGunTespitTableProps> = ({ 
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
      tableType="yerGunTespitColumns"
      editableField="YER VE GÜN TESPİT TARİHİ"
      title="Yer ve Gün Tespiti Yapılan İşyerleri"
      pageSize={pageSize}
      currentPage={currentPage}
      setPageSize={setPageSize}
      setCurrentPage={setCurrentPage}
    />
  );
};
