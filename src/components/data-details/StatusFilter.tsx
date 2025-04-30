
import React, { useState } from "react";
import { Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "./StatusBadge";

// Define all available status options
export const ALL_STATUS_OPTIONS = [
  "YETKİ BELGESİ BEKLENİYOR",
  "ÇAĞRI YAPILMASI BEKLENİYOR",
  "İLK OTURUM BEKLENİYOR",
  "MÜZAKERE SÜRESİNDE",
  "UYUŞMAZLIK İÇİN BEKLENİYOR",
  "ARABULUCU RAPORU BEKLENİYOR",
  "GREV KARARI AŞAMASINDA",
  "GREV OYLAMASI BEKLENİYOR",
  "YHK'YA GÖNDERİLMESİ BEKLENİYOR",
  "TİS İMZALANDI",
];

interface StatusFilterProps {
  selectedStatuses: string[];
  onStatusChange: (statuses: string[]) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatuses,
  onStatusChange,
}) => {
  const [open, setOpen] = useState(false);

  // Toggle individual status
  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  };

  // Toggle all statuses
  const toggleAll = () => {
    if (selectedStatuses.length === ALL_STATUS_OPTIONS.length) {
      onStatusChange([]);
    } else {
      onStatusChange([...ALL_STATUS_OPTIONS]);
    }
  };

  // Check if all statuses are selected
  const allSelected = selectedStatuses.length === ALL_STATUS_OPTIONS.length;
  
  // Check if some (but not all) statuses are selected
  const someSelected = selectedStatuses.length > 0 && !allSelected;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Prosedür Durumu
          {selectedStatuses.length > 0 && selectedStatuses.length < ALL_STATUS_OPTIONS.length && (
            <Badge 
              variant="secondary" 
              className="ml-2 bg-primary text-primary-foreground text-xs px-1.5"
            >
              {selectedStatuses.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="border-b border-gray-200 px-3 py-2">
          <div className="flex items-center">
            <Checkbox 
              id="select-all"
              checked={allSelected}
              className="mr-2 data-[state=checked]:bg-primary data-[state=checked]:text-white"
              onCheckedChange={toggleAll}
            />
            <label 
              htmlFor="select-all"
              className="text-sm font-medium flex-1 cursor-pointer"
            >
              Tüm Durumları {allSelected ? "Kaldır" : "Seç"}
            </label>
            <span className="text-xs text-muted-foreground">
              {selectedStatuses.length}/{ALL_STATUS_OPTIONS.length} seçili
            </span>
          </div>
        </div>
        <ScrollArea className="h-72 py-1">
          <div className="space-y-1 p-2">
            {ALL_STATUS_OPTIONS.map((status) => (
              <div 
                key={status} 
                className="flex items-center space-x-2 rounded-md p-1 hover:bg-muted/50"
              >
                <Checkbox
                  id={`status-${status}`}
                  checked={selectedStatuses.includes(status)}
                  onCheckedChange={() => toggleStatus(status)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
                <label
                  htmlFor={`status-${status}`}
                  className="flex-1 cursor-pointer text-sm"
                >
                  <div className="inline-block min-w-[150px]">
                    <StatusBadge status={status} />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
