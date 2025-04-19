
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivity {
  id: number;
  title: string;
  time: string;
  date: string;
  icon: React.ReactNode;
  category: string;
}

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

const getActivityColor = (category: string): string => {
  const colorMap: { [key: string]: string } = {
    "authorization-requests": "bg-blue-100 text-blue-800",
    "authorization-notices": "bg-green-100 text-green-800",
    "call-required": "bg-yellow-100 text-yellow-800",
    "first-session": "bg-purple-100 text-purple-800",
    "dispute-notices": "bg-orange-100 text-orange-800",
    "strike-decisions": "bg-red-100 text-red-800",
    "yhk-submissions": "bg-teal-100 text-teal-800",
  };
  return colorMap[category] || "bg-gray-100 text-gray-800";
};

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const lastTenActivities = activities.slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Son İşlemler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lastTenActivities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
            <div className={`rounded-full p-2 ${getActivityColor(activity.category)}`}>
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">
                İşlem Tarihi: {activity.date} ({activity.time})
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
