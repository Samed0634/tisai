
import React from 'react';
import { Input } from "@/components/ui/input";

interface TisSearchBoxProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const TisSearchBox: React.FC<TisSearchBoxProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex-1 min-w-[250px]">
      <Input 
        type="text" 
        placeholder="İşyeri adı ile hızlı arama yapın..." 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        className="w-full"
        title="Büyük/küçük harf ve Türkçe karakter duyarlılığı olmadan arama yapar"
      />
    </div>
  );
};
