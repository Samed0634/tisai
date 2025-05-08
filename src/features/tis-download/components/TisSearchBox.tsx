
import React from 'react';
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface TisSearchBoxProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  resultCount?: number;
  totalCount?: number;
  isLoading?: boolean;
}

export const TisSearchBox: React.FC<TisSearchBoxProps> = ({ 
  searchTerm, 
  setSearchTerm,
  resultCount,
  totalCount,
  isLoading = false
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
          disabled={isLoading}
        />
        {isLoading ? (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          resultCount !== undefined && totalCount !== undefined && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
              {resultCount}/{totalCount}
            </div>
          )
        )}
      </div>
    </div>
  );
};
