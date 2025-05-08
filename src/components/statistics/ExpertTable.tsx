
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { ExpertStatistics } from "@/hooks/useExpertStatistics";

interface ExpertTableProps {
  expertStats: ExpertStatistics[];
  isLoading: boolean;
}

const ExpertTable = ({ expertStats, isLoading }: ExpertTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uzman Bazlı Dosya Dağılımı</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-20 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : expertStats.length === 0 ? (
          <div className="h-20 flex items-center justify-center text-gray-500">
            Gösterilecek veri bulunamadı.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sıra
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uzman
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktif Dosya Sayısı
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expertStats.map((expert, index) => (
                  <tr key={expert.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: expert.color }}
                        ></div>
                        {expert.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expert.count} Dosya
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpertTable;
