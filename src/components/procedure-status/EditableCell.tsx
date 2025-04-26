
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";

interface EditableCellProps {
  isEditing: boolean;
  column: string;
  value: any;
  onChange: (value: string) => void;
  onBlur: () => void;
  isPending?: boolean;
  onClick: () => void;
}

export const EditableCell = ({
  isEditing,
  column,
  value,
  onChange,
  onBlur,
  isPending,
  onClick,
}: EditableCellProps) => {
  const isEditable = isEditing;
  const isDate = column.includes("TARİHİ");

  return (
    <TableCell
      onClick={onClick}
      className={`cursor-pointer hover:bg-muted/50 ${
        isPending ? "bg-blue-50 dark:bg-blue-950/20" : ""
      }`}
    >
      {isEditable ? (
        <Input
          type={isDate ? "date" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onBlur();
            }
          }}
          autoFocus
        />
      ) : (
        isDate && value
          ? new Date(value).toLocaleDateString("tr-TR")
          : value
      )}
    </TableCell>
  );
};
