
import React, { useState, useMemo } from "react";
import { useWorkplaceData } from "@/hooks/useWorkplaceData";
import { EditableTableBase } from "@/components/dashboard/EditableTableBase";
import { SearchBox } from "@/components/data-details/SearchBox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { StatusFilter, ALL_STATUS_OPTIONS } from "@/components/data-details/StatusFilter";

const DEFAULT_VISIBLE_COLUMNS = [
  "SORUMLU UZMAN",
  "BAĞLI OLDUĞU ŞUBE",
  "İŞYERİ ADI",
  "İŞÇİ SAYISI",
  "ÜYE SAYISI",
  "durum",
  "updated_at"
];

type SortOption = {
  value: string;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "İŞYERİ ADI", label: "İşyeri Adı" },
  { value: "SORUMLU UZMAN", label: "Sorumlu Uzman" },
  { value: "BAĞLI OLDUĞU ŞUBE", label: "Bağlı Olduğu Şube" },
  { value: "durum", label: "Durum" },
  { value: "updated_at", label: "Son Güncelleme" }
];

const ProcedureStatus = () => {
  const { workplaces, isLoading, refetch } = useWorkplaceData();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("İŞYERİ ADI");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([...ALL_STATUS_OPTIONS]);

  const filteredAndSortedWorkplaces = useMemo(() => {
    if (!workplaces) return [];
    
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    let filtered = workplaces.filter(workplace => {
      // First filter by selected statuses
      const statusMatch = selectedStatuses.includes(workplace["durum"] || "");
      
      if (!statusMatch) return false;
      
      // Then filter by search term
      return (
        searchTerm === "" || 
        (workplace["İŞYERİ ADI"] && workplace["İŞYERİ ADI"].toString().toLowerCase().includes(normalizedSearchTerm)) ||
        (workplace["SORUMLU UZMAN"] && workplace["SORUMLU UZMAN"].toString().toLowerCase().includes(normalizedSearchTerm)) ||
        (workplace["BAĞLI OLDUĞU ŞUBE"] && workplace["BAĞLI OLDUĞU ŞUBE"].toString().toLowerCase().includes(normalizedSearchTerm)) ||
        (workplace["durum"] && workplace["durum"].toString().toLowerCase().includes(normalizedSearchTerm))
      );
    });

    return [...filtered].sort((a, b) => {
      // Special handling for date fields
      if (sortBy === "updated_at") {
        const dateA = a[sortBy] ? new Date(a[sortBy]).getTime() : 0;
        const dateB = b[sortBy] ? new Date(b[sortBy]).getTime() : 0;
        return dateB - dateA; // Sort by most recent first
      }
      
      const aValue = (a[sortBy] || "").toString().toLowerCase();
      const bValue = (b[sortBy] || "").toString().toLowerCase();
      return aValue.localeCompare(bValue);
    });
  }, [workplaces, searchTerm, sortBy, selectedStatuses]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatuses]);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Prosedür Durumu</h1>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBox 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="İşyeri, uzman veya duruma göre ara..."
        />
        
        <div className="flex flex-col sm:flex-row gap-2">
          <StatusFilter 
            selectedStatuses={selectedStatuses}
            onStatusChange={setSelectedStatuses}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[240px]">
                <ArrowDown className="mr-2 h-4 w-4" />
                Sıralama: {sortOptions.find(opt => opt.value === sortBy)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px]">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                {sortOptions.map((option) => (
                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border shadow-sm overflow-hidden">
        <EditableTableBase
          data={filteredAndSortedWorkplaces}
          isLoading={isLoading}
          refetch={refetch}
          tableType="default"
          editableField=""
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
    </div>
  );
};

export default ProcedureStatus;
