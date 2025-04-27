
import { useState } from "react";
import { useWorkplaceData } from "@/hooks/useWorkplaceData";
import { EditableTableBase } from "@/components/dashboard/EditableTableBase";

const DEFAULT_VISIBLE_COLUMNS = [
  "SORUMLU UZMAN",
  "BAĞLI OLDUĞU ŞUBE",
  "İŞYERİ ADI",
  "İŞÇİ SAYISI",
  "ÜYE SAYISI"
];

const ProcedureStatus = () => {
  const { workplaces, isLoading, refetch } = useWorkplaceData();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container mx-auto py-6">
      <EditableTableBase
        data={workplaces || []}
        isLoading={isLoading}
        refetch={refetch}
        tableType="default"
        editableField="GREV YASAĞI DURUMU"
        title="Prosedür Durumu"
        defaultColumns={DEFAULT_VISIBLE_COLUMNS}
        titleClassName="text-xl"
        pageSize={pageSize}
        currentPage={currentPage}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        showHorizontalScrollbar={true}
      />
    </div>
  );
};

export default ProcedureStatus;
