
import { LucideIcon } from "lucide-react";

export interface DashboardItem {
  id: string;
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  items?: any[];
  dataSource: string;
}

export interface RecentActivity {
  id: number;
  title: string;
  time: string;
  date: string;
  icon: React.ReactNode;
  category?: string;
}

export interface UpcomingMeeting {
  id: number;
  title: string;
  date: string;
  month: string;
  time: string;
}
