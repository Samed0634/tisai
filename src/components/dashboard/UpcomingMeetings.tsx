
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { upcomingMeetings } from "./upcomingMeetings";

interface Meeting {
  id: number;
  title: string;
  date: string;
  month: string;
  time: string;
}

interface UpcomingMeetingsProps {
  meetings?: Meeting[];
}

const UpcomingMeetings: React.FC<UpcomingMeetingsProps> = ({ meetings = upcomingMeetings }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yaklaşan Toplantılar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
            <div className="text-center min-w-[50px]">
              <p className="text-sm font-medium bg-primary-50 rounded-t-md text-primary-700 py-1">{meeting.month}</p>
              <p className="text-xl font-bold bg-white border rounded-b-md py-1">{meeting.date}</p>
            </div>
            <div>
              <p className="font-medium">{meeting.title}</p>
              <p className="text-sm text-muted-foreground">{meeting.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetings;
