
import { Filter, Save, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TableHeaderProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  hasPendingChanges: boolean;
  onSave: () => void;
  visibleColumns: string[];
  allColumns: string[];
  toggleColumn: (column: string) => void;
}

export const TableHeader = ({
  isEditing,
  setIsEditing,
  hasPendingChanges,
  onSave,
  visibleColumns,
  allColumns,
  toggleColumn,
}: TableHeaderProps) => {
  return (
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

        {isEditing && hasPendingChanges && (
          <Button variant="default" size="sm" onClick={onSave}>
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
  );
};
