import { useState } from "react";
import { Filter, Save, Edit } from "lucide-react";
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
  const [pendingChanges, setPendingChanges] = useState<{ [key: string]: any }>({});
  const [isEditing, setIsEditing] = useState(false);

  const allColumns = Object.keys(data[0] || {}).filter(key => key !== "ID");

  const handleCellClick = (workplace: Workplace, column: string) => {
    if (!isEditing) return;
    setEditingCell({ id: workplace.ID, column });
    setEditValue(workplace[column]?.toString() || "");
  };

  const handleCellChange = (workplace: Workplace) => {
    if (!editingCell) return;
    
    const newChanges = {
      ...pendingChanges,
      [workplace.ID]: {
        ...(pendingChanges[workplace.ID] || {}),
        [editingCell.column]: editValue,
        ID: workplace.ID
      }
    };
    
    setPendingChanges(newChanges);
    setEditingCell(null);
  };

  const handleSave = () => {
    Object.values(pendingChanges).forEach((workplace: any) => {
      const originalWorkplace = data.find(w => w.ID === workplace.ID);
      if (originalWorkplace) {
        const updatedWorkplace = {
          ...originalWorkplace,
          ...workplace
        };
        onUpdate(updatedWorkplace);
      }
    });
    setPendingChanges({});
    setIsEditing(false);
  };

  const toggleColumn = (column: string) => {
    if (visibleColumns.includes(column)) {
      const newColumns = visibleColumns.filter(col => col !== column);
      setVisibleColumns(newColumns);
    } else {
      const newColumns = [...visibleColumns, column];
      setVisibleColumns(newColumns);
    }
  };

  const getCellValue = (workplace: Workplace, column: string) => {
    const pendingValue = pendingChanges[workplace.ID]?.[column];
    if (pendingValue !== undefined) return pendingValue;
    return workplace[column];
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
        <div className="flex gap-2">
          <Button
            variant={isEditing ? "outline" : "default"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? "Düzenlemeyi İptal Et" : "Düzenle"}
          </Button>

          {isEditing && Object.keys(pendingChanges).length > 0 && (
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
            >
              <Save className="mr-2 h-4 w-4" />
              Kaydet
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Sütunları Filtrele
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] max-h-[400px] overflow-y-auto">
              {allColumns.map(column => (
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
      </div>

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
                    onClick={() => handleCellClick(workplace, column)}
                    className={`cursor-pointer hover:bg-muted/50 ${
                      pendingChanges[workplace.ID]?.[column] !== undefined
                        ? "bg-blue-50 dark:bg-blue-950/20"
                        : ""
                    }`}
                  >
                    {editingCell?.id === workplace.ID && editingCell.column === column ? (
                      <Input
                        type={column.includes("TARİHİ") ? "date" : "text"}
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => handleCellChange(workplace)}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            handleCellChange(workplace);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      column.includes("TARİHİ") && getCellValue(workplace, column)
                        ? new Date(getCellValue(workplace, column)).toLocaleDateString("tr-TR")
                        : getCellValue(workplace, column)
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
