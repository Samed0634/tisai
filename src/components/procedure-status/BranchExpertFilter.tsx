
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface BranchExpertFilterProps {
  branches: string[];
  experts: string[];
  selectedBranch: string | null;
  selectedExpert: string | null;
  onBranchChange: (branch: string | null) => void;
  onExpertChange: (expert: string | null) => void;
}

export const BranchExpertFilter: React.FC<BranchExpertFilterProps> = ({
  branches,
  experts,
  selectedBranch,
  selectedExpert,
  onBranchChange,
  onExpertChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-md border shadow-sm">
      <h3 className="text-lg font-medium mb-3">Şube ve Uzman Filtresi</h3>
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="branch-filter" className="text-sm">Bağlı Olduğu Şube</Label>
            {selectedBranch && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => onBranchChange(null)}
              >
                <X className="h-3 w-3 mr-1" />
                Temizle
              </Button>
            )}
          </div>
          <Select 
            value={selectedBranch || ""} 
            onValueChange={(value) => onBranchChange(value || null)}
          >
            <SelectTrigger id="branch-filter" className="w-full">
              <SelectValue placeholder="Şube seçin" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="expert-filter" className="text-sm">Sorumlu Uzman</Label>
            {selectedExpert && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => onExpertChange(null)}
              >
                <X className="h-3 w-3 mr-1" />
                Temizle
              </Button>
            )}
          </div>
          <Select 
            value={selectedExpert || ""} 
            onValueChange={(value) => onExpertChange(value || null)}
          >
            <SelectTrigger id="expert-filter" className="w-full">
              <SelectValue placeholder="Uzman seçin" />
            </SelectTrigger>
            <SelectContent>
              {experts.map((expert) => (
                <SelectItem key={expert} value={expert}>
                  {expert}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
