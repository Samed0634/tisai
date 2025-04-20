import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData, recentActivities, upcomingMeetings } from "@/components/dashboard/dashboardData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WorkplaceItemDetails from "@/components/dashboard/WorkplaceItemDetails";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import { useDashboardData } from "@/hooks/useDashboardData";

const enhancedRecentActivities = recentActivities.map(activity => ({
  ...activity,
  category: activity.category || "default"
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const staticDashboardData = getDashboardData();
  const [selectedCards, setSelectedCards] = useState<string[]>(
    staticDashboardData.map(item => item.id)
  );
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const { data: n8nDashboardData, isLoading } = useDashboardData();

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
      navigate(`/details/${categoryId}`, { state: { items: category.items } });
    } else {
      console.log("No items found for this category:", categoryId);
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
      <DashboardHeader
        allDashboardData={allDashboardData}
        selectedCards={selectedCards}
        onToggleCard={toggleCard}
      />

      <DashboardGrid
        items={filteredDashboardData}
        onCardClick={handleCardClick}
      />

      <DashboardAnalytics
        activities={enhancedRecentActivities}
        meetings={upcomingMeetings}
      />

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
