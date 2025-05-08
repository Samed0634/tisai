
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { RefreshCw } from "lucide-react";
import { ExpertStatistics } from "@/hooks/useExpertStatistics";

interface ExpertBarChartProps {
  expertStats: ExpertStatistics[];
  isLoading: boolean;
}

const ExpertBarChart = ({ expertStats, isLoading }: ExpertBarChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uzman Bazlı Dosya Sayıları</CardTitle>
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
              <BarChart
                data={expertStats}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={80} 
                  tick={{ fontSize: 12 }} 
                />
                <Tooltip formatter={(value) => [`${value} Dosya`, 'Dosya Sayısı']} />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Dosya Sayısı" 
                  fill="#8884d8"
                >
                  {expertStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpertBarChart;
