
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useExpertStatistics } from "@/hooks/useExpertStatistics";
import StatisticsHeader from "@/components/statistics/StatisticsHeader";
import ExpertBarChart from "@/components/statistics/ExpertBarChart";
import ExpertPieChart from "@/components/statistics/ExpertPieChart";
import ExpertTable from "@/components/statistics/ExpertTable";

const Statistics = () => {
  const { expertStats, isLoading, refetch } = useExpertStatistics();
  
  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="container mx-auto py-6">
      <StatisticsHeader onRefresh={handleRefresh} isLoading={isLoading} />

      <Tabs defaultValue="chart">
        <TabsList className="mb-4">
          <TabsTrigger value="chart">Grafik Görünümü</TabsTrigger>
          <TabsTrigger value="table">Tablo Görünümü</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExpertBarChart expertStats={expertStats} isLoading={isLoading} />
            <ExpertPieChart expertStats={expertStats} isLoading={isLoading} />
          </div>
        </TabsContent>

        <TabsContent value="table">
          <ExpertTable expertStats={expertStats} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
