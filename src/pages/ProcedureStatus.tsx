
import React from "react";
import { useWorkplaceData } from "@/hooks/useWorkplaceData";
import { EditableTableBase } from "@/components/dashboard/EditableTableBase";
import { SearchBox } from "@/components/data-details/SearchBox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown, FileDown, Filter } from "lucide-react";
import { StatusFilter } from "@/components/procedure-status/StatusFilter";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useFilterMemory } from "@/hooks/useFilterMemory";
import { exportToExcel } from "@/utils/exportUtils";

// Define visible columns but explicitly exclude kurum_id
const DEFAULT_VISIBLE_COLUMNS = ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İŞÇİ SAYISI", "ÜYE SAYISI", "durum"];

type SortOption = {
  value: string;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "İŞYERİ ADI", label: "İşyeri Adı" },
  { value: "SORUMLU UZMAN", label: "Sorumlu Uzman" },
  { value: "BAĞLI OLDUĞU ŞUBE", label: "Bağlı Olduğu Şube" },
  { value: "durum", label: "Durum" }
];

const ProcedureStatus = () => {
  const {
    workplaces,
    isLoading,
    refetch
  } = useWorkplaceData();
  
  const [pageSize, setPageSize] = useFilterMemory("procedureStatus_pageSize", 10);
  const [currentPage, setCurrentPage] = useFilterMemory("procedureStatus_currentPage", 1);
  const [searchTerm, setSearchTerm] = useFilterMemory("procedureStatus_searchTerm", "");
  const [sortBy, setSortBy] = useFilterMemory("procedureStatus_sortBy", "İŞYERİ ADI");
  const [selectedStatuses, setSelectedStatuses] = useFilterMemory("procedureStatus_selectedStatuses", [] as string[]);

  const filteredAndSortedWorkplaces = React.useMemo(() => {
    if (!workplaces) return [];
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    let filtered = workplaces.filter(workplace => {
      // Status filter
      if (selectedStatuses.length > 0) {
        if (!workplace["durum"] || !selectedStatuses.includes(workplace["durum"].toString())) {
          return false;
        }
      }

      // Text search filter - case insensitive
      if (normalizedSearchTerm) {
        return workplace["İŞYERİ ADI"] && workplace["İŞYERİ ADI"].toString().toLowerCase().includes(normalizedSearchTerm) || 
               workplace["SORUMLU UZMAN"] && workplace["SORUMLU UZMAN"].toString().toLowerCase().includes(normalizedSearchTerm) || 
               workplace["BAĞLI OLDUĞU ŞUBE"] && workplace["BAĞLI OLDUĞU ŞUBE"].toString().toLowerCase().includes(normalizedSearchTerm) || 
               workplace["durum"] && workplace["durum"].toString().toLowerCase().includes(normalizedSearchTerm);
      }
      return true;
    });
    return [...filtered].sort((a, b) => {
      const aValue = (a[sortBy] || "").toString().toLowerCase();
      const bValue = (b[sortBy] || "").toString().toLowerCase();
      return aValue.localeCompare(bValue);
    });
  }, [workplaces, searchTerm, sortBy, selectedStatuses]);

  const handleStatusChange = (statuses: string[]) => {
    setSelectedStatuses(statuses);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleExportToExcel = () => {
    if (filteredAndSortedWorkplaces.length > 0) {
      // Create export data without kurum_id field
      const exportData = filteredAndSortedWorkplaces.map(workplace => {
        const { kurum_id, ...exportWorkplace } = workplace;
        return exportWorkplace;
      });
      
      exportToExcel(exportData, "Prosedür_Durumu");
    }
  };

  const statusFilterCount = selectedStatuses.length;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleExportToExcel}>
          <FileDown className="h-4 w-4" />
          <span>Excel İndir</span>
        </Button>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-2 sm:items-center">
          <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="İşyeri, uzman veya durum ara..." />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4" />
                <span>Durum Filtresi</span>
                {statusFilterCount > 0 && <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                    {statusFilterCount}
                  </span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0" align="start">
              <StatusFilter selectedStatuses={selectedStatuses} onChange={handleStatusChange} />
            </PopoverContent>
          </Popover>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-[240px]">
              <ArrowDown className="mr-2 h-4 w-4" />
              Sıralama: {sortOptions.find(opt => opt.value === sortBy)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px]">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              {sortOptions.map(option => <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>)}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border shadow-sm overflow-hidden">
        <EditableTableBase 
          data={filteredAndSortedWorkplaces} 
          isLoading={isLoading} 
          refetch={refetch} 
          tableType="default" 
          editableField="durum" 
          title="Prosedür Durumu" 
          defaultColumns={DEFAULT_VISIBLE_COLUMNS} 
          titleClassName="text-xl" 
          pageSize={pageSize} 
          currentPage={currentPage} 
          setPageSize={setPageSize} 
          setCurrentPage={setCurrentPage} 
          pageSizeOptions={[10, 20, 30, 40, 50]} 
          showHorizontalScrollbar={true}
          logActions={true}
        />
      </div>
    </div>
  );
};

export default ProcedureStatus;
