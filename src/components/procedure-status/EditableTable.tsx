
import { useState, useEffect } from "react";
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
import { formatInTimeZone } from "date-fns-tz";
import { tr } from "date-fns/locale";

interface EditableTableProps {
  data: Workplace[];
  isLoading: boolean;
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
  onUpdate: (workplace: Workplace) => void;
  defaultColumns: string[];
}

export const EditableTable = ({
  data,
  isLoading,
  visibleColumns,
  setVisibleColumns,
  onUpdate,
  defaultColumns
}: EditableTableProps) => {
  const [editingCell, setEditingCell] = useState<{ id: number; column: string } | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  // Load saved column visibility from localStorage
  useEffect(() => {
    const savedColumns = localStorage.getItem('procedureStatusColumns');
    if (savedColumns) {
      setVisibleColumns(JSON.parse(savedColumns));
    }
  }, []);

  // Save column visibility to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('procedureStatusColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  const allColumns = Object.keys(data[0] || {}).filter(key => key !== "ID");

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
    
    onUpdate(updatedWorkplace);
    setEditingCell(null);
  };

  const toggleColumn = (column: string) => {
    const newVisibleColumns = visibleColumns.includes(column)
      ? visibleColumns.filter(col => col !== column)
      : [...visibleColumns, column];
      
    setVisibleColumns(newVisibleColumns);
  };

  // Helper function to check if a value is a valid date
  const isValidDate = (dateValue: any): boolean => {
    if (dateValue === null || dateValue === undefined || dateValue === '') {
      return false;
    }
    
    // Try to create a date object
    const date = new Date(dateValue);
    return !isNaN(date.getTime());
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Prosedür Durumu</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Sütunları Filtrele
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {allColumns.map(column => (
              <DropdownMenuCheckboxItem
                key={column}
                checked={visibleColumns.includes(column)}
                onCheckedChange={() => toggleColumn(column)}
              >
                {column === 'updated_at' ? 'Son Güncelleme' : column}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map(column => (
                <TableHead key={column}>
                  {column === 'updated_at' ? 'Son Güncelleme' : column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(workplace => (
              <TableRow key={workplace.ID}>
                {visibleColumns.map(column => (
                  <TableCell
                    key={column}
                    onClick={() => handleCellClick(workplace, column)}
                    className="cursor-pointer hover:bg-muted/50"
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
                      column === 'updated_at' && isValidDate(workplace[column])
                        ? formatInTimeZone(new Date(workplace[column]), 'Europe/Istanbul', 'dd.MM.yyyy HH:mm', { locale: tr })
                        : column.includes("TARİHİ") && isValidDate(workplace[column])
                          ? formatInTimeZone(new Date(workplace[column]), 'Europe/Istanbul', 'dd.MM.yyyy', { locale: tr })
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
