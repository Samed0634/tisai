
import { useMemo } from 'react';
import { Workplace } from '@/types/workplace';

export const useFilteredWorkplaces = (
  workplaces: Workplace[] | undefined,
  searchTerm: string,
  sortBy: string,
  selectedStatuses: string[],
  selectedBranches: string[],
  selectedExperts: string[]
) => {
  const filteredAndSortedWorkplaces = useMemo(() => {
    if (!workplaces) return [];
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    let filtered = workplaces.filter(workplace => {
      // Status filter
      if (selectedStatuses.length > 0) {
        if (!workplace["durum"] || !selectedStatuses.includes(workplace["durum"].toString())) {
          return false;
        }
      }

      // Branch filter
      if (selectedBranches.length > 0) {
        if (!workplace["BAĞLI OLDUĞU ŞUBE"] || !selectedBranches.includes(workplace["BAĞLI OLDUĞU ŞUBE"].toString())) {
          return false;
        }
      }

      // Expert filter
      if (selectedExperts.length > 0) {
        if (!workplace["SORUMLU UZMAN"] || !selectedExperts.includes(workplace["SORUMLU UZMAN"].toString())) {
          return false;
        }
      }

      // Text search filter - case insensitive
      if (normalizedSearchTerm) {
        return workplace["İŞYERİ ADI"] && workplace["İŞYERİ ADI"].toString().toLowerCase().includes(normalizedSearchTerm) || 
               workplace["SORUMLU UZMAN"] && workplace["SORUMLU UZMAN"].toString().toLowerCase().includes(normalizedSearchTerm) || 
               workplace["BAĞLI OLDUĞU ŞUBE"] && workplace["BAĞLI OLDUĞU ŞUBE"].toString().toLowerCase().includes(normalizedSearchTerm) || 
               workplace["durum"] && workplace["durum"].toString().toLowerCase().includes(normalizedSearchTerm);
      }
      return true;
    });
    
    return [...filtered].sort((a, b) => {
      const aValue = (a[sortBy] || "").toString().toLowerCase();
      const bValue = (b[sortBy] || "").toString().toLowerCase();
      return aValue.localeCompare(bValue);
    });
  }, [workplaces, searchTerm, sortBy, selectedStatuses, selectedBranches, selectedExperts]);

  return filteredAndSortedWorkplaces;
};
