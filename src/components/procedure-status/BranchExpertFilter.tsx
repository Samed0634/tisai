
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { normalizeText } from '@/utils/searchUtils';

interface FilterOption {
  value: string;
  label: string;
}

interface BranchExpertFilterProps {
  selectedBranches: string[];
  onBranchChange: (branches: string[]) => void;
  selectedExperts: string[];
  onExpertChange: (experts: string[]) => void;
  branchOptions: FilterOption[];
  expertOptions: FilterOption[];
}

export const BranchExpertFilter: React.FC<BranchExpertFilterProps> = ({
  selectedBranches,
  onBranchChange,
  selectedExperts,
  onExpertChange,
  branchOptions,
  expertOptions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleBranch = (branch: string) => {
    if (branch === 'all') {
      // If "Tümü" is selected, clear or select all
      if (selectedBranches.length === branchOptions.length) {
        onBranchChange([]);
      } else {
        onBranchChange(branchOptions.map(opt => opt.value));
      }
      return;
    }
    
    if (selectedBranches.includes(branch)) {
      onBranchChange(selectedBranches.filter(b => b !== branch));
    } else {
      onBranchChange([...selectedBranches, branch]);
    }
  };

  const toggleExpert = (expert: string) => {
    if (expert === 'all') {
      // If "Tümü" is selected, clear or select all
      if (selectedExperts.length === expertOptions.length) {
        onExpertChange([]);
      } else {
        onExpertChange(expertOptions.map(opt => opt.value));
      }
      return;
    }
    
    if (selectedExperts.includes(expert)) {
      onExpertChange(selectedExperts.filter(e => e !== expert));
    } else {
      onExpertChange([...selectedExperts, expert]);
    }
  };
  
  const filterOptions = (options: FilterOption[]) => {
    if (!searchTerm) return options;
    
    const normalizedSearch = normalizeText(searchTerm);
    return options.filter(option => 
      normalizeText(option.label).includes(normalizedSearch)
    );
  };
  
  const filteredBranchOptions = filterOptions(branchOptions);
  const filteredExpertOptions = filterOptions(expertOptions);
  
  const allBranchesSelected = selectedBranches.length === branchOptions.length;
  const allExpertsSelected = selectedExperts.length === expertOptions.length;

  return (
    <div className="bg-white p-4 rounded-md border shadow-sm">
      <div className="mb-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <Tabs defaultValue="branches" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="branches">Şubeler</TabsTrigger>
          <TabsTrigger value="experts">Uzmanlar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="branches" className="mt-0">
          <ScrollArea className="h-[250px] pr-4">
            <div className="grid grid-cols-1 gap-2">
              <div key="all-branches" className="flex items-center space-x-2">
                <Checkbox
                  id="branch-all"
                  checked={allBranchesSelected}
                  onCheckedChange={() => toggleBranch('all')}
                />
                <Label
                  htmlFor="branch-all"
                  className="text-sm font-medium cursor-pointer"
                >
                  Tümü
                </Label>
              </div>
              
              {filteredBranchOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`branch-${option.value}`}
                    checked={selectedBranches.includes(option.value)}
                    onCheckedChange={() => toggleBranch(option.value)}
                  />
                  <Label
                    htmlFor={`branch-${option.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="experts" className="mt-0">
          <ScrollArea className="h-[250px] pr-4">
            <div className="grid grid-cols-1 gap-2">
              <div key="all-experts" className="flex items-center space-x-2">
                <Checkbox
                  id="expert-all"
                  checked={allExpertsSelected}
                  onCheckedChange={() => toggleExpert('all')}
                />
                <Label
                  htmlFor="expert-all"
                  className="text-sm font-medium cursor-pointer"
                >
                  Tümü
                </Label>
              </div>
              
              {filteredExpertOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`expert-${option.value}`}
                    checked={selectedExperts.includes(option.value)}
                    onCheckedChange={() => toggleExpert(option.value)}
                  />
                  <Label
                    htmlFor={`expert-${option.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
