
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const toggleBranch = (branch: string) => {
    if (selectedBranches.includes(branch)) {
      onBranchChange(selectedBranches.filter(b => b !== branch));
    } else {
      onBranchChange([...selectedBranches, branch]);
    }
  };

  const toggleExpert = (expert: string) => {
    if (selectedExperts.includes(expert)) {
      onExpertChange(selectedExperts.filter(e => e !== expert));
    } else {
      onExpertChange([...selectedExperts, expert]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md border shadow-sm">
      <Tabs defaultValue="branches" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="branches">Şubeler</TabsTrigger>
          <TabsTrigger value="experts">Uzmanlar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="branches" className="mt-0">
          <ScrollArea className="h-[250px] pr-4">
            <div className="grid grid-cols-1 gap-2">
              {branchOptions.map((option) => (
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
              {expertOptions.map((option) => (
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
