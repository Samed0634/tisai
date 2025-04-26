
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "@/components/dashboard/dashboardCards";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WorkplaceItemDetails from "@/components/dashboard/WorkplaceItemDetails";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import { EditableWorkplaceTable } from "@/components/dashboard/EditableWorkplaceTable";
import { GrevOylamasiTable } from "@/components/dashboard/GrevOylamasiTable";
import { useDashboardData } from "@/hooks/useDashboardData";

const Dashboard = () => {
  const navigate = useNavigate();
  const staticDashboardData = getDashboardData();
  const [selectedCards, setSelectedCards] = useState<string[]>(
    staticDashboardData.map(item => item.id)
  );
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [showEditableTable, setShowEditableTable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: n8nDashboardData, isLoading, refetch } = useDashboardData();

  const getListItems = (listName: string) => {
    if (!n8nDashboardData) return [];
    return (n8nDashboardData[listName] as any[] || []);
  };

  const allDashboardData = staticDashboardData.map(item => ({
    ...item,
    value: getListItems(item.dataSource).length,
    items: getListItems(item.dataSource)
  }));

  const handleCardClick = (categoryId: string) => {
    const category = allDashboardData.find(item => item.id === categoryId);
    
    if (categoryId === 'grevKarari') {
      setSelectedCategory(categoryId);
      setShowEditableTable(true);
    } else if (categoryId === 'grevOylamasi') {
      setSelectedCategory(categoryId);
      setShowEditableTable(true);
    } else if (category?.items) {
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

  const grevKarariData = getListItems('grevKarariAlinmasiGerekenListesi');
  const grevOylamasiData = getListItems('grevOylamasiYapilmasiGerekenListesi');

  const getTableTitle = () => {
    if (selectedCategory === 'grevKarari') {
      return "Grev Kararı Alınması Gereken İşyerleri";
    } else if (selectedCategory === 'grevOylamasi') {
      return "Grev Oylaması Yapılması Gereken İşyerleri";
    }
    return "";
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        allDashboardData={allDashboardData}
        selectedCards={selectedCards}
        onToggleCard={toggleCard}
      />

      {showEditableTable ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{getTableTitle()}</h2>
            <Button variant="outline" onClick={() => setShowEditableTable(false)}>
              Gösterge Paneline Dön
            </Button>
          </div>
          
          {selectedCategory === 'grevKarari' && (
            <EditableWorkplaceTable 
              data={grevKarariData}
              isLoading={isLoading}
              refetch={refetch}
            />
          )}
          
          {selectedCategory === 'grevOylamasi' && (
            <GrevOylamasiTable 
              data={grevOylamasiData}
              isLoading={isLoading}
              refetch={refetch}
            />
          )}
        </div>
      ) : (
        <DashboardGrid
          items={filteredDashboardData}
          onCardClick={handleCardClick}
        />
      )}

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
