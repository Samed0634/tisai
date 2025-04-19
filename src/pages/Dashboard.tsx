
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import UpcomingMeetings from "@/components/dashboard/UpcomingMeetings";
import { getDashboardData, recentActivities, upcomingMeetings } from "@/components/dashboard/dashboardData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const allDashboardData = getDashboardData();
  const [selectedCards, setSelectedCards] = useState<string[]>(
    allDashboardData.map(item => item.id)
  );

  const handleCardClick = (categoryId: string) => {
    navigate(`/details/${categoryId}`);
  };

  const toggleCard = (cardId: string) => {
    setSelectedCards(current =>
      current.includes(cardId)
        ? current.filter(id => id !== cardId)
        : [...current, cardId]
    );
  };

  const filteredDashboardData = allDashboardData.filter(item =>
    selectedCards.includes(item.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gösterge Paneli</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px] max-h-[400px] overflow-y-auto">
            {allDashboardData.map((item) => (
              <DropdownMenuCheckboxItem
                key={item.id}
                checked={selectedCards.includes(item.id)}
                onCheckedChange={() => toggleCard(item.id)}
              >
                {item.title}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDashboardData.map((item) => (
          <DashboardCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivities activities={recentActivities} />
        <UpcomingMeetings meetings={upcomingMeetings} />
      </div>
    </div>
  );
};

export default Dashboard;
