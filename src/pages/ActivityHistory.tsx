
import React, { useState, useEffect } from "react";
import { recentActivities } from "@/components/dashboard/dashboardData";
import ActivityHistoryComponent from "@/components/ActivityHistory";

interface Activity {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
}

const ActivityHistory = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Convert dashboard activities to the format needed by ActivityHistory component
    const formattedActivities = recentActivities.map(activity => ({
      id: activity.id,
      title: activity.title,
      date: activity.date,
      time: activity.time,
      category: activity.category || "default"
    }));
    
    setActivities(formattedActivities);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">İşlem Geçmişi</h1>
      <ActivityHistoryComponent activities={activities} />
    </div>
  );
};

export default ActivityHistory;
