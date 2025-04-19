import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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

const enhancedRecentActivities = recentActivities.map(activity => ({
  ...activity,
  category: activity.category || "default"
}));

const fetchDashboardData = async () => {
  const response = await fetch('https://primary-production-dcf9.up.railway.app/webhook/terminsorgu');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Dashboard = () => {
  const navigate = useNavigate();
  const staticDashboardData = getDashboardData();
  const [selectedCards, setSelectedCards] = useState<string[]>(
    staticDashboardData.map(item => item.id)
  );

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData
  });

  const getListLength = (listName: string) => {
    if (!dashboardData) return 0;
    return (dashboardData[listName] as any[] || []).length;
  };

  const allDashboardData = [
    { 
      ...staticDashboardData[0],
      value: getListLength('yetkiTespitIstenenListesi')
    },
    { 
      ...staticDashboardData[1],
      value: getListLength('yetkiBelgesiTebligYapilanListesi')
    },
    { 
      ...staticDashboardData[2],
      value: getListLength('cagriYapilacakListesi')
    },
    { 
      ...staticDashboardData[3],
      value: getListLength('yerVeGunTespitListesi')
    },
    { 
      ...staticDashboardData[4],
      value: getListLength('oncedenBelirlenenIlkOturumListesi')
    },
    { 
      ...staticDashboardData[5],
      value: getListLength('ilkOturumGerekenListesi')
    },
    { 
      ...staticDashboardData[6],
      value: getListLength('uyusmazlikGerekenListesi')
    },
    { 
      ...staticDashboardData[7],
      value: getListLength('arabulucuAtamasiSonTarihListesi')
    },
    { 
      ...staticDashboardData[8],
      value: getListLength('grevKarariAlinmasiGerekenListesi')
    },
    { 
      ...staticDashboardData[9],
      value: getListLength('grevOylamasiYapilmasiGerekenListesi')
    },
    { 
      ...staticDashboardData[10],
      value: getListLength('yhkGonderimGerekenListesi')
    },
    { 
      ...staticDashboardData[11],
      value: getListLength('yhkHatirlatmasiListesi')
    },
    { 
      ...staticDashboardData[12],
      value: getListLength('imzalananTislerListesi')
    },
    { 
      ...staticDashboardData[13],
      value: getListLength('sonaErecekTislerListesi')
    },
    { 
      ...staticDashboardData[14],
      value: getListLength('grevYasagiOlanListesi')
    }
  ];

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

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

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
        <RecentActivities activities={enhancedRecentActivities} />
        <UpcomingMeetings meetings={upcomingMeetings} />
      </div>
    </div>
  );
};

export default Dashboard;
