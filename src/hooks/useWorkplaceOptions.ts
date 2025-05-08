
import { useMemo } from 'react';
import { Workplace } from '@/types/workplace';

export interface OptionType {
  value: string;
  label: string;
}

export const useWorkplaceOptions = (workplaces: Workplace[] | undefined) => {
  // Extract unique branches from workplaces data
  const branchOptions = useMemo(() => {
    if (!workplaces) return [];
    const branches = new Set<string>();
    
    workplaces.forEach(workplace => {
      if (workplace["BAĞLI OLDUĞU ŞUBE"]) {
        branches.add(workplace["BAĞLI OLDUĞU ŞUBE"].toString());
      }
    });
    
    return Array.from(branches).sort().map(branch => ({
      value: branch,
      label: branch
    }));
  }, [workplaces]);

  // Extract unique experts from workplaces data
  const expertOptions = useMemo(() => {
    if (!workplaces) return [];
    const experts = new Set<string>();
    
    workplaces.forEach(workplace => {
      if (workplace["SORUMLU UZMAN"]) {
        experts.add(workplace["SORUMLU UZMAN"].toString());
      }
    });
    
    return Array.from(experts).sort().map(expert => ({
      value: expert,
      label: expert
    }));
  }, [workplaces]);

  return {
    branchOptions,
    expertOptions
  };
};
