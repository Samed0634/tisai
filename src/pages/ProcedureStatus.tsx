
import React, { useState } from "react";
import { useWorkplaceData } from "@/hooks/useWorkplaceData";
import { EditableTableBase } from "@/components/dashboard/EditableTableBase";
import { SearchBox } from "@/components/data-details/SearchBox";
import { Workplace } from "@/types/workplace";

const DEFAULT_VISIBLE_COLUMNS = [
  "SORUMLU UZMAN",
  "BAĞLI OLDUĞU ŞUBE",
  "İŞYERİ ADI",
  "İŞÇİ SAYISI",
  "ÜYE SAYISI"
];

const ProcedureStatus = () => {
  const { workplaces, isLoading, refetch, updateWorkplace } = useWorkplaceData();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkplaces = workplaces?.filter(workplace => 
    workplace["İŞYERİ ADI"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workplace["SORUMLU UZMAN"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workplace["BAĞLI OLDUĞU ŞUBE"]?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleUpdateWorkplace = async (updatedWorkplace: Workplace): Promise<void> => {
    try {
      await updateWorkplace(updatedWorkplace);
      await refetch();
    } catch (error) {
      console.error("Error updating workplace:", error);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Prosedür Durumu</h1>
      
      <SearchBox 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="İşyeri veya uzman ara..."
      />

      <EditableTableBase
        data={filteredWorkplaces}
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
        onUpdateData={handleUpdateWorkplace}
      />
    </div>
  );
};

export default ProcedureStatus;
