
import React from "react";
import RecentActivities from "./RecentActivities";
import UpcomingMeetings from "./UpcomingMeetings";
import { RecentActivity, UpcomingMeeting } from "./dashboardData";

interface DashboardAnalyticsProps {
  activities: RecentActivity[];
  meetings: UpcomingMeeting[];
}

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  activities,
  meetings,
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <RecentActivities activities={activities} />
      <UpcomingMeetings meetings={meetings} />
    </div>
  );
};

export default DashboardAnalytics;
