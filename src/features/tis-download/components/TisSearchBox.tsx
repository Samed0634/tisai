
import React from 'react';
import { Input } from "@/components/ui/input";

interface TisSearchBoxProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  resultCount?: number;
  totalCount?: number;
}

export const TisSearchBox: React.FC<TisSearchBoxProps> = ({ 
  searchTerm, 
  setSearchTerm,
  resultCount,
  totalCount
}) => {
  return (
    <div className="flex-1 min-w-[250px]">
      <div className="relative">
        <Input 
          type="text" 
          placeholder="İşyeri adı ile hızlı arama yapın..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          className="w-full"
          title="Büyük/küçük harf ve Türkçe karakter duyarlılığı olmadan arama yapar"
        />
        {resultCount !== undefined && totalCount !== undefined && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
            {resultCount}/{totalCount}
          </div>
        )}
      </div>
    </div>
  );
};
