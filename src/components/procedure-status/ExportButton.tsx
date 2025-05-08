
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { exportToExcel } from '@/utils/exportUtils';
import { Workplace } from '@/types/workplace';

interface ExportButtonProps {
  data: Workplace[];
  title: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ data, title }) => {
  const handleExportToExcel = () => {
    if (data.length > 0) {
      exportToExcel(data, title);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2" 
      onClick={handleExportToExcel}
    >
      <FileDown className="h-4 w-4" />
      <span>Excel İndir</span>
    </Button>
  );
};
