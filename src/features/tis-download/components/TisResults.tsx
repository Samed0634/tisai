
import React from 'react';
import { TisItem } from '../hooks/useTisData';
import { TisResultCard } from './TisResultCard';

interface TisResultsProps {
  results: TisItem[];
  isLoading: boolean;
  allResultsCount: number;
}

export const TisResults: React.FC<TisResultsProps> = ({ 
  results, 
  isLoading,
  allResultsCount
}) => {
  if (isLoading) {
    return (
      <p className="text-center text-muted-foreground">
        Yükleniyor...
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        {allResultsCount === 0 ? 'TİS belgesi bulunamadı.' : 'Arama sonucu bulunamadı.'}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {results.map(item => (
        <TisResultCard key={item.ID} item={item} />
      ))}
    </div>
  );
};
