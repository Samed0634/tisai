
import React from 'react';
import { Input } from '@/components/ui/input';
import { Workplace } from '@/types/workplace';

interface EditableCellProps {
  workplace: Workplace;
  column: string;
  editingCell: { id: number; column: string } | null;
  editValue: string;
  setEditValue: (value: string) => void;
  handleSave: (workplace: Workplace) => void;
  handleCellClick: (workplace: Workplace, column: string) => void;
  editableField: string;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  workplace,
  column,
  editingCell,
  editValue,
  setEditValue,
  handleSave,
  handleCellClick,
  editableField,
}) => {
  if (editingCell?.id === workplace.ID && editingCell.column === column) {
    return (
      <Input
        type={column.includes('TARİHİ') ? 'date' : 'text'}
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
        onBlur={() => handleSave(workplace)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSave(workplace);
          }
        }}
        autoFocus
      />
    );
  }

  return (
    <div
      onClick={() => column === editableField ? handleCellClick(workplace, column) : undefined}
      className={column === editableField ? "cursor-pointer hover:bg-muted/50" : ""}
    >
      {column.includes('TARİHİ') && workplace[column]
        ? new Date(workplace[column]).toLocaleDateString('tr-TR')
        : workplace[column]}
    </div>
  );
};
