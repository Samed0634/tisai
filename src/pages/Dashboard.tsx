
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import UpcomingMeetings from "@/components/dashboard/UpcomingMeetings";
import WorkplaceItemDetails from "@/components/dashboard/WorkplaceItemDetails";
import { getDashboardData, recentActivities, upcomingMeetings } from "@/components/dashboard/dashboardData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const { data: n8nDashboardData, isLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData
  });

  const getListItems = (listName: string) => {
    if (!n8nDashboardData) return [];
    return (n8nDashboardData[listName] as any[] || []);
  };

  const allDashboardData = [
    { 
      ...staticDashboardData[0],
      value: getListItems('yetkiTespitIstenenListesi').length,
      items: getListItems('yetkiTespitIstenenListesi')
    },
    { 
      ...staticDashboardData[1],
      value: getListItems('yetkiBelgesiTebligYapilanListesi').length,
      items: getListItems('yetkiBelgesiTebligYapilanListesi')
    },
    { 
      ...staticDashboardData[2],
      value: getListItems('cagriYapilacakListesi').length,
      items: getListItems('cagriYapilacakListesi')
    },
    { 
      ...staticDashboardData[3],
      value: getListItems('yerVeGunTespitListesi').length,
      items: getListItems('yerVeGunTespitListesi')
    },
    { 
      ...staticDashboardData[4],
      value: getListItems('oncedenBelirlenenIlkOturumListesi').length,
      items: getListItems('oncedenBelirlenenIlkOturumListesi')
    },
    { 
      ...staticDashboardData[5],
      value: getListItems('ilkOturumGerekenListesi').length,
      items: getListItems('ilkOturumGerekenListesi')
    },
    { 
      ...staticDashboardData[6],
      value: getListItems('uyusmazlikGerekenListesi').length,
      items: getListItems('uyusmazlikGerekenListesi')
    },
    { 
      ...staticDashboardData[7],
      value: getListItems('arabulucuAtamasiSonTarihListesi').length,
      items: getListItems('arabulucuAtamasiSonTarihListesi')
    },
    { 
      ...staticDashboardData[8],
      value: getListItems('grevKarariAlinmasiGerekenListesi').length,
      items: getListItems('grevKarariAlinmasiGerekenListesi')
    },
    { 
      ...staticDashboardData[9],
      value: getListItems('grevOylamasiYapilmasiGerekenListesi').length,
      items: getListItems('grevOylamasiYapilmasiGerekenListesi')
    },
    { 
      ...staticDashboardData[10],
      value: getListItems('yhkGonderimGerekenListesi').length,
      items: getListItems('yhkGonderimGerekenListesi')
    },
    { 
      ...staticDashboardData[11],
      value: getListItems('yhkHatirlatmasiListesi').length,
      items: getListItems('yhkHatirlatmasiListesi')
    },
    { 
      ...staticDashboardData[12],
      value: getListItems('imzalananTislerListesi').length,
      items: getListItems('imzalananTislerListesi')
    },
    { 
      ...staticDashboardData[13],
      value: getListItems('sonaErecekTislerListesi').length,
      items: getListItems('sonaErecekTislerListesi')
    },
    { 
      ...staticDashboardData[14],
      value: getListItems('grevYasagiOlanListesi').length,
      items: getListItems('grevYasagiOlanListesi')
    }
  ];

  const handleCardClick = (categoryId: string) => {
    const category = allDashboardData.find(item => item.id === categoryId);
    if (category?.items) {
      if (categoryId === 'authorization-requests') {
        // For Yetki Tespiti İstenecek İşyerleri, show the dialog
        const firstItem = category.items[0];
        if (firstItem) {
          setSelectedItem(firstItem);
        }
      } else {
        // For other categories, navigate to details page
        navigate(`/details/${categoryId}`, { state: { items: category.items } });
      }
    }
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

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>İşyeri Detayları</DialogTitle>
          </DialogHeader>
          {selectedItem && <WorkplaceItemDetails item={selectedItem} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
