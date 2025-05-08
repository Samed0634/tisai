
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users } from "lucide-react";

interface StatisticsHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const StatisticsHeader = ({ onRefresh, isLoading }: StatisticsHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Canlı İstatistikler</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Yenileniyor...' : 'Yenile'}
        </Button>
      </div>
      
      <div className="flex items-center mb-6">
        <Users className="mr-2 h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Uzman Bazlı Aktif Dosya Sayıları</h2>
      </div>
    </>
  );
};

export default StatisticsHeader;
