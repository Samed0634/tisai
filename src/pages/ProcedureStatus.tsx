
import React, { useState } from "react";
import { useWorkplaceData } from "@/hooks/useWorkplaceData";
import { EditableTableBase } from "@/components/dashboard/EditableTableBase";
import { SearchBox } from "@/components/data-details/SearchBox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";
import { tr } from "date-fns/locale";

const DEFAULT_VISIBLE_COLUMNS = [
  "İŞYERİ ADI",
  "BAĞLI OLDUĞU ŞUBE",
  "durum",
  "updated_at",
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

  const filteredAndSortedWorkplaces = React.useMemo(() => {
    if (!workplaces) return [];
    
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    let filtered = workplaces.filter(workplace => {
      // Case-insensitive search by converting both search term and data to lowercase
      return (
        (workplace["İŞYERİ ADI"] && workplace["İŞYERİ ADI"].toString().toLowerCase().includes(normalizedSearchTerm)) ||
        (workplace["SORUMLU UZMAN"] && workplace["SORUMLU UZMAN"].toString().toLowerCase().includes(normalizedSearchTerm)) ||
        (workplace["BAĞLI OLDUĞU ŞUBE"] && workplace["BAĞLI OLDUĞU ŞUBE"].toString().toLowerCase().includes(normalizedSearchTerm)) ||
        (workplace["durum"] && workplace["durum"].toString().toLowerCase().includes(normalizedSearchTerm))
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "updated_at") {
        const aDate = a[sortBy] ? new Date(a[sortBy]) : new Date(0);
        const bDate = b[sortBy] ? new Date(b[sortBy]) : new Date(0);
        return bDate.getTime() - aDate.getTime(); // Descending order for dates
      } else {
        const aValue = (a[sortBy] || "").toString().toLowerCase();
        const bValue = (b[sortBy] || "").toString().toLowerCase();
        return aValue.localeCompare(bValue);
      }
    });
  }, [workplaces, searchTerm, sortBy]);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Prosedür Durumu</h1>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBox 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="İşyeri veya uzman ara..."
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
          columnLabels={{
            "durum": "Durum",
            "updated_at": "Son Güncelleme"
          }}
          formatters={{
            "updated_at": (value) => {
              if (!value) return "";
              return formatInTimeZone(new Date(value), 'Europe/Istanbul', 'dd.MM.yyyy HH:mm', { locale: tr });
            }
          }}
        />
      </div>
    </div>
  );
};

export default ProcedureStatus;
