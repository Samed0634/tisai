
import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody as TableBodyUI,
} from "@/components/ui/table";
import { TableBody } from "./TableBody";
import { TableHeader as TableHeaderComponent } from "./TableHeader";
import { TablePagination } from "./TablePagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Workplace } from "@/types/workplace";
import { COLUMNS } from "@/constants/tableColumns";
import { TableHeaderRow } from "./TableHeaderRow";
import { useTableColumnProcessor } from "@/hooks/useTableColumnProcessor";
import { useTableEdit } from "@/hooks/useTableEdit";
import { useTableColumns } from "@/hooks/useTableColumns";
import { FilterControls } from "./FilterControls";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TableContentProps {
  data: Workplace[];
  isLoading: boolean;
  refetch: () => void;
  tableType: string;
  editableField: string;
  title: string;
  defaultColumns?: string[];
  titleClassName?: string;
  pageSize: number;
  currentPage: number;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  showHorizontalScrollbar?: boolean;
  showTisUploader?: boolean;
  logActions?: boolean;
}

export const TableContent: React.FC<TableContentProps> = ({
  data,
  isLoading,
  refetch,
  tableType,
  editableField,
  title,
  defaultColumns,
  titleClassName,
  pageSize,
  currentPage,
  setPageSize,
  setCurrentPage,
  showHorizontalScrollbar = true,
  showTisUploader = false,
  logActions = true,
}) => {
  const { visibleColumns, toggleColumn } = useTableColumns({
    tableType,
    defaultColumns: defaultColumns || []
  });

  const { editingId, editData, handleEdit, handleCancel, handleChange, handleSave } = useTableEdit(refetch, logActions);

  // Get visible column definitions
  const visibleColumnDefinitions = COLUMNS.filter(col => 
    visibleColumns.includes(col.id)
  );

  // Process columns for special cases
  const processedColumns = useTableColumnProcessor(visibleColumnDefinitions, visibleColumns);
  
  // State for filtering
  const [filters, setFilters] = useState({
    search: "",
    expert: "",
    branch: "",
    status: ""
  });

  // State for sorting
  const [sortConfig, setSortConfig] = useState<{
    key: string | null,
    direction: 'ascending' | 'descending'
  }>({
    key: null,
    direction: 'ascending'
  });

  // Handle sort request
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  // Extract unique filter options
  const filterOptions = useMemo(() => {
    if (!data.length) return { experts: [], branches: [], statuses: [] };
    
    const experts = new Set<string>();
    const branches = new Set<string>();
    const statuses = new Set<string>();

    data.forEach(item => {
      if (item["SORUMLU UZMAN"]) experts.add(item["SORUMLU UZMAN"]);
      if (item["BAĞLI OLDUĞU ŞUBE"]) branches.add(item["BAĞLI OLDUĞU ŞUBE"]);
      if (item["durum"]) statuses.add(item["durum"]);
    });

    return {
      experts: Array.from(experts).sort(),
      branches: Array.from(branches).sort(),
      statuses: Array.from(statuses).sort()
    };
  }, [data]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    return data
      .filter(item => {
        // Apply all filters
        const matchesSearch = !filters.search || 
          Object.values(item).some(value => 
            typeof value === 'string' && 
            value.toLowerCase().includes(filters.search.toLowerCase())
          );
        
        const matchesExpert = !filters.expert || item["SORUMLU UZMAN"] === filters.expert;
        const matchesBranch = !filters.branch || item["BAĞLI OLDUĞU ŞUBE"] === filters.branch;
        const matchesStatus = !filters.status || item["durum"] === filters.status;
        
        return matchesSearch && matchesExpert && matchesBranch && matchesStatus;
      })
      .sort((a, b) => {
        // If no sort is applied, return default order
        if (!sortConfig.key) return 0;

        // Get values to compare
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        // Handle null/undefined values
        if (valueA === undefined || valueA === null) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valueB === undefined || valueB === null) return sortConfig.direction === 'ascending' ? 1 : -1;

        // Handle different data types
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA;
        }

        // Default string comparison
        const stringA = String(valueA).toLowerCase();
        const stringB = String(valueB).toLowerCase();
        
        if (stringA < stringB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (stringA > stringB) return sortConfig.direction === 'ascending' ? 1 : -1;
        
        return 0;
      });
  }, [data, filters, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + pageSize);

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  // Handle navigation to previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle navigation to next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-4">
      <TableHeaderComponent 
        title={title}
        titleClassName={titleClassName}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />
      
      <FilterControls
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        resetFilters={() => setFilters({search: "", expert: "", branch: "", status: ""})}
        dataCount={filteredAndSortedData.length}
        totalCount={data.length}
      />
      
      <div className="border rounded-md overflow-hidden shadow-sm">
        <ScrollArea className="w-full" showTopScrollbar={showHorizontalScrollbar} showBottomScrollbar={showHorizontalScrollbar}>
          <div className="min-w-max">
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  {showTisUploader && (
                    <TableHead className="action-column text-xs">TİS Yükleme</TableHead>
                  )}
                  <TableHead className={cn("action-column text-xs", !showTisUploader && "sticky left-0")}>İşlem</TableHead>
                  
                  {processedColumns.map(column => (
                    <TableHead 
                      key={column.id} 
                      className={cn(
                        "text-xs cursor-pointer select-none",
                        sortConfig.key === column.id && 
                          (sortConfig.direction === 'ascending' 
                            ? "sorting-asc" 
                            : "sorting-desc")
                      )}
                      onClick={() => requestSort(column.id)}
                    >
                      <div className="flex items-center">
                        {column.title}
                        <span className="ml-1.5 flex flex-col text-gray-400">
                          <ChevronUp 
                            size={14} 
                            className={cn(
                              sortConfig.key === column.id && sortConfig.direction === 'ascending' 
                                ? "text-primary-600" 
                                : "opacity-40"
                            )} 
                          />
                          <ChevronDown 
                            size={14} 
                            className={cn(
                              sortConfig.key === column.id && sortConfig.direction === 'descending' 
                                ? "text-primary-600" 
                                : "opacity-40",
                              "mt-[-8px]"
                            )} 
                          />
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBodyUI>
                <TableBody 
                  data={paginatedData}
                  visibleColumnDefinitions={processedColumns}
                  editingId={editingId}
                  editData={editData}
                  handleEdit={handleEdit}
                  handleCancel={handleCancel}
                  handleChange={handleChange}
                  handleSave={handleSave}
                  editableField={editableField}
                  showTisUploader={showTisUploader}
                  refetch={refetch} 
                  logActions={logActions}
                />
              </TableBodyUI>
            </Table>
          </div>
        </ScrollArea>
      </div>

      {filteredAndSortedData.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredAndSortedData.length}
          startIndex={startIndex}
          onPageSizeChange={handlePageSizeChange}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
};
