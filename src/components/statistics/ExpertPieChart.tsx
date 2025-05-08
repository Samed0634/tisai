
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RefreshCw } from "lucide-react";
import { ExpertStatistics } from "@/hooks/useExpertStatistics";

interface ExpertPieChartProps {
  expertStats: ExpertStatistics[];
  isLoading: boolean;
}

const ExpertPieChart = ({ expertStats, isLoading }: ExpertPieChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dosya Dağılımı</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : expertStats.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Gösterilecek veri bulunamadı.
          </div>
        ) : (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expertStats}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expertStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} Dosya`, name]} 
                />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpertPieChart;
