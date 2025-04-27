
import React, { useState, useEffect, useCallback } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Workplace } from "@/types/workplace";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkplaceData } from "@/hooks/useWorkplaceData";

interface EditableTableBaseProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  tableType?: string;
  editableField: string;
  title: string;
  defaultColumns?: string[];
  titleClassName?: string;
  showControls?: boolean;
}

const getDefaultColumns = (tableType: string): string[] => {
  switch (tableType) {
    case "oylamaColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV OYLAMASI TARİHİ"];
    case "cagriColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "ÇAĞRI TARİHİ"];
    case "yetkiTespitColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YETKİ BELGESİ TEBLİĞ TARİHİ"];
    case "yetkiBelgesiColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "ÇAĞRI TARİHİ"];
    case "yerGunTespitColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YER VE GÜN TESPİT TARİHİ"];
    case "ilkOturumColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İLK OTURUM TARİHİ"];
    case "muzakereSuresiColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "UYUŞMAZLIK TARİHİ"];
    case "uyusmazlikColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "UYUŞMAZLIK TARİHİ"];
    case "yhkColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YHK GÖNDERİM TARİHİ"];
      case "imzalananTislerColumns":
        return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "TİS GELİŞ TARİHİ"];
    case "grevYasagiColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV YASAĞI DURUMU"];
    default:
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İŞÇİ SAYISI", "ÜYE SAYISI"];
  }
};

export const EditableTableBase: React.FC<EditableTableBaseProps> = ({
  data,
  isLoading = false,
  refetch,
  tableType = "default",
  editableField,
  title,
  defaultColumns,
  titleClassName = "text-2xl",
  showControls = true
}) => {
  // Initialize column visibility from localStorage or defaults
  const getInitialColumns = () => {
    const storageKey = `tableColumns_${tableType}`;
    const savedColumns = localStorage.getItem(storageKey);
    return savedColumns ? JSON.parse(savedColumns) : (defaultColumns || getDefaultColumns(tableType));
  };

  const [visibleColumns, setVisibleColumns] = useState<string[]>(getInitialColumns());
  const availableColumns = data && data.length > 0 ? Object.keys(data[0] || {}).filter(key => key !== "ID") : [];

  // Save column visibility to localStorage whenever it changes
  useEffect(() => {
    const storageKey = `tableColumns_${tableType}`;
    localStorage.setItem(storageKey, JSON.stringify(visibleColumns));
  }, [visibleColumns, tableType]);

  const toggleColumn = useCallback((column: string) => {
    setVisibleColumns(prevColumns =>
      prevColumns.includes(column)
        ? prevColumns.filter(col => col !== column)
        : [...prevColumns, column]
    );
  }, []);

  const [editingCell, setEditingCell] = useState<{ id: number; column: string } | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const { updateWorkplace } = useWorkplaceData();

  const handleCellClick = (workplace: Workplace, column: string) => {
    setEditingCell({ id: workplace.ID, column });
    setEditValue(workplace[column]?.toString() || "");
  };

  const handleSave = (workplace: Workplace) => {
    if (!editingCell) return;
    
    const updatedWorkplace = {
      ...workplace,
      [editingCell.column]: editValue
    };
    
    updateWorkplace(updatedWorkplace);
    setEditingCell(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showControls && (
        <div className="flex justify-between items-center">
          <h1 className={titleClassName}>{title}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Sütunları Filtrele
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {availableColumns.map(column => (
                <DropdownMenuCheckboxItem
                  key={column}
                  checked={visibleColumns.includes(column)}
                  onCheckedChange={() => toggleColumn(column)}
                >
                  {column}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map(column => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(workplace => (
              <TableRow key={workplace.ID}>
                {visibleColumns.map(column => (
                  <TableCell
                    key={column}
                    onClick={() => column === editableField ? handleCellClick(workplace, column) : undefined}
                    className={column === editableField ? "cursor-pointer hover:bg-muted/50" : ""}
                  >
                    {editingCell?.id === workplace.ID && editingCell.column === column ? (
                      <Input
                        type={column.includes("TARİHİ") ? "date" : "text"}
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => handleSave(workplace)}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            handleSave(workplace);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      column.includes("TARİHİ") && workplace[column]
                        ? new Date(workplace[column]).toLocaleDateString("tr-TR")
                        : workplace[column]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
