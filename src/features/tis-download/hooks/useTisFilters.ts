
import { useState, useMemo } from 'react';
import { fuzzySearch } from '@/utils/searchUtils';
import { TisItem } from './useTisData';

export type SortOption = "alphabetical" | "expiryDate" | "receivedDate";

export const useTisFilters = (allResults: TisItem[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [expertFilter, setExpertFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('expiryDate');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    // First apply filters
    let filtered = allResults.filter(item => {
      // Text search
      const textMatch = !searchTerm || 
        fuzzySearch(searchTerm, item['İŞYERİ ADI'] || '') || 
        fuzzySearch(searchTerm, item['SORUMLU UZMAN'] || '') ||
        fuzzySearch(searchTerm, item['SGK NO'] || '');
      
      // Branch filter
      const branchMatch = branchFilter === 'all' || 
        item['BAĞLI OLDUĞU ŞUBE'] === branchFilter;
      
      // Year filter (from TİS İMZA TARİHİ)
      const yearMatch = yearFilter === 'all' || 
        (item['TİS İMZA TARİHİ'] && 
          new Date(item['TİS İMZA TARİHİ']).getFullYear().toString() === yearFilter);
      
      // Expert filter
      const expertMatch = expertFilter === 'all' || 
        item['SORUMLU UZMAN'] === expertFilter;
      
      return textMatch && branchMatch && yearMatch && expertMatch;
    });

    // Then apply sorting
    return filtered.sort((a, b) => {
      switch (sortOption) {
        case 'alphabetical':
          return (a['İŞYERİ ADI'] || '').localeCompare(b['İŞYERİ ADI'] || '');
        
        case 'expiryDate':
          // Sort by TİS BİTİŞ TARİHİ (closest to expiry first)
          const dateA = a['TİS BİTİŞ TARİHİ'] ? new Date(a['TİS BİTİŞ TARİHİ']).getTime() : Number.MAX_SAFE_INTEGER;
          const dateB = b['TİS BİTİŞ TARİHİ'] ? new Date(b['TİS BİTİŞ TARİHİ']).getTime() : Number.MAX_SAFE_INTEGER;
          return dateA - dateB;
        
        case 'receivedDate':
          // Sort by TİS GELİŞ TARİHİ (most recent first)
          const receivedA = a['TİS GELİŞ TARİHİ'] ? new Date(a['TİS GELİŞ TARİHİ']).getTime() : 0;
          const receivedB = b['TİS GELİŞ TARİHİ'] ? new Date(b['TİS GELİŞ TARİHİ']).getTime() : 0;
          return receivedB - receivedA;
          
        default:
          return 0;
      }
    });
  }, [searchTerm, allResults, branchFilter, yearFilter, expertFilter, sortOption]);

  const clearFilters = () => {
    setBranchFilter('all');
    setYearFilter('all');
    setExpertFilter('all');
  };

  return {
    searchTerm,
    setSearchTerm,
    branchFilter,
    setBranchFilter,
    yearFilter,
    setYearFilter,
    expertFilter,
    setExpertFilter,
    sortOption,
    setSortOption,
    isFilterOpen,
    setIsFilterOpen,
    filteredResults,
    clearFilters
  };
};
