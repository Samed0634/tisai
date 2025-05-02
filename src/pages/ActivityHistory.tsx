
import React from "react";
import ActivityHistoryComponent from "@/components/ActivityHistory";

const ActivityHistory = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">İşlem Geçmişi</h1>
      <ActivityHistoryComponent />
    </div>
  );
};

export default ActivityHistory;
