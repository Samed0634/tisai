
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBox = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "İşyeri Ara..."
}: SearchBoxProps) => {
  return (
    <div className="relative w-full sm:w-96">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8"
        aria-label="Arama yapın"
        title="Büyük/küçük harf ve Türkçe karakter duyarlılığı olmadan arama yapar"
      />
    </div>
  );
};
