
import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Workplace } from "@/types/workplace";
import { TableHeader as TableHeaderComponent } from "./TableHeader";
import { EditableCell } from "./EditableCell";

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
      setVisibleColumns(visibleColumns.filter(col => col !== column));
    } else {
      setVisibleColumns([...visibleColumns, column]);
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
      <TableHeaderComponent
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        hasPendingChanges={Object.keys(pendingChanges).length > 0}
        onSave={handleSave}
        visibleColumns={visibleColumns}
        allColumns={allColumns}
        toggleColumn={toggleColumn}
      />

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
                  <EditableCell
                    key={`${workplace.ID}-${column}`}
                    isEditing={editingCell?.id === workplace.ID && editingCell.column === column}
                    column={column}
                    value={editingCell?.id === workplace.ID && editingCell.column === column
                      ? editValue
                      : getCellValue(workplace, column)}
                    onChange={setEditValue}
                    onBlur={() => handleCellChange(workplace)}
                    isPending={pendingChanges[workplace.ID]?.[column] !== undefined}
                    onClick={() => handleCellClick(workplace, column)}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
