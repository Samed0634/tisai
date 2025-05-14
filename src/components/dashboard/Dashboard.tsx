
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
import { CagriYapilacakTable } from "@/components/dashboard/CagriYapilacakTable";
import { YetkiTespitTable } from "@/components/dashboard/YetkiTespitTable";
import { YetkiBelgesiTable } from "@/components/dashboard/YetkiBelgesiTable";
import { YerGunTespitTable } from "@/components/dashboard/YerGunTespitTable";
import { OncedenBelirlenenTable } from "@/components/dashboard/OncedenBelirlenenTable";
import { IlkOturumTable } from "@/components/dashboard/IlkOturumTable";
import { UyusmazlikTable } from "@/components/dashboard/UyusmazlikTable";
import { YhkGonderimTable } from "@/components/dashboard/YhkGonderimTable";
import { ImzalananTislerTable } from "@/components/dashboard/ImzalananTislerTable";
import { GrevYasakTable } from "@/components/dashboard/GrevYasakTable";
import { useDashboardData } from "@/hooks/useDashboardData";
import { GrevKarariTable } from "@/components/dashboard/GrevKarariTable";
import { SearchBox } from "@/components/data-details/SearchBox";

const Dashboard = () => {
  const navigate = useNavigate();
  const staticDashboardData = getDashboardData();
  
  const [selectedCards, setSelectedCards] = useState<string[]>(() => {
    const savedFilters = localStorage.getItem('dashboardCardFilters');
    return savedFilters ? JSON.parse(savedFilters) : staticDashboardData.map(item => item.id);
  });
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [showEditableTable, setShowEditableTable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const {
    data: dashboardData,
    isLoading,
    refetch
  } = useDashboardData();

  const getListItems = (listName: string) => {
    if (!dashboardData) return [];
    return dashboardData[listName] as any[] || [];
  };

  // Filter workplaces based on search term
  const filterItemsBySearchTerm = (items: any[]) => {
    if (!searchTerm.trim()) return items;
    
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    return items.filter(item => {
      return (
        (item["İŞYERİ ADI"] && item["İŞYERİ ADI"].toString().toLowerCase().includes(normalizedSearchTerm)) ||
        (item["SORUMLU UZMAN"] && item["SORUMLU UZMAN"].toString().toLowerCase().includes(normalizedSearchTerm)) ||
        (item["BAĞLI OLDUĞU ŞUBE"] && item["BAĞLI OLDUĞU ŞUBE"].toString().toLowerCase().includes(normalizedSearchTerm)) ||
        (item["durum"] && item["durum"].toString().toLowerCase().includes(normalizedSearchTerm))
      );
    });
  };

  const allDashboardData = staticDashboardData.map(item => {
    const originalItems = getListItems(item.dataSource);
    const filteredItems = filterItemsBySearchTerm(originalItems);
    
    return {
      ...item,
      value: filteredItems.length,
      items: filteredItems
    };
  });

  const handleCardClick = (categoryId: string) => {
    const category = allDashboardData.find(item => item.id === categoryId);
    if (categoryId === 'grevKarari' || categoryId === 'grevOylamasi' || categoryId === 'cagri' || 
        categoryId === 'yetkiTespit' || categoryId === 'yetkiBelgesi' || categoryId === 'yerGunTespit' || 
        categoryId === 'oncedenBelirlenen' || categoryId === 'ilkOturum' || 
        categoryId === 'uyusmazlik' || categoryId === 'yhk' || categoryId === 'imzalananTisler' || 
        categoryId === 'grevYasagi') {
      setSelectedCategory(categoryId);
      setShowEditableTable(true);
    } else if (category?.items) {
      navigate(`/details/${categoryId}`, {
        state: {
          items: category.items
        }
      });
    } else {
      console.log("No items found for this category:", categoryId);
    }
  };

  const toggleCard = (cardId: string) => {
    const newSelectedCards = selectedCards.includes(cardId) 
      ? selectedCards.filter(id => id !== cardId) 
      : [...selectedCards, cardId];
    
    setSelectedCards(newSelectedCards);
    localStorage.setItem('dashboardCardFilters', JSON.stringify(newSelectedCards));
  };

  const filteredDashboardData = allDashboardData.filter(item => selectedCards.includes(item.id));

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  const grevKarariData = filterItemsBySearchTerm(getListItems('grev_kararı_alınması_gereken_view'));
  const grevOylamasiData = filterItemsBySearchTerm(getListItems('grev_oylaması_yapılması_gereken_view'));
  const cagriYapilacakData = filterItemsBySearchTerm(getListItems('çağrı_yapılacak_view'));
  const yetkiTespitData = filterItemsBySearchTerm(getListItems('yetki_tespit_istenecek_view'));
  const yetkiBelgesiData = filterItemsBySearchTerm(getListItems('yetki_belgesi_tebliğ_yapılan_view'));
  const yerGunTespitData = filterItemsBySearchTerm(getListItems('yer_ve_gün_tespit_tarihli_view'));
  const oncedenBelirlenenData = filterItemsBySearchTerm(getListItems('önceden_belirlenen_ilk_oturum_view'));
  const ilkOturumData = filterItemsBySearchTerm(getListItems('ilk_oturum_tutulması_gereken_view'));
  const uyusmazlikData = filterItemsBySearchTerm(getListItems('uyuşmazlık_bildirimi_yapılması_gereken_view'));
  const yhkGonderimData = filterItemsBySearchTerm(getListItems('yhk_gönderim_gereken_view'));
  const imzalananTislerData = filterItemsBySearchTerm(getListItems('imzalanan_tisler_view'));
  const grevYasagiData = filterItemsBySearchTerm(getListItems('grev_yasağı_olan_view'));

  return <div className="space-y-6">
      <DashboardHeader 
        allDashboardData={allDashboardData} 
        selectedCards={selectedCards} 
        onToggleCard={toggleCard}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm} 
      />

      {showEditableTable ? <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setShowEditableTable(false)}>
              Gösterge Paneline Dön
            </Button>
          </div>
          
          {selectedCategory === 'grevKarari' && (
            <GrevKarariTable 
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

          {selectedCategory === 'cagri' && (
            <CagriYapilacakTable 
              data={cagriYapilacakData} 
              isLoading={isLoading} 
              refetch={refetch} 
            />
          )}

          {selectedCategory === 'yetkiTespit' && (
            <YetkiTespitTable 
              data={yetkiTespitData} 
              isLoading={isLoading} 
              refetch={refetch} 
            />
          )}

          {selectedCategory === 'yetkiBelgesi' && (
            <YetkiBelgesiTable 
              data={yetkiBelgesiData} 
              isLoading={isLoading} 
              refetch={refetch} 
            />
          )}

          {selectedCategory === 'yerGunTespit' && (
            <YerGunTespitTable 
              data={yerGunTespitData} 
              isLoading={isLoading} 
              refetch={refetch} 
            />
          )}
          
          {selectedCategory === 'oncedenBelirlenen' && (
            <OncedenBelirlenenTable 
              data={oncedenBelirlenenData} 
              isLoading={isLoading} 
              refetch={refetch} 
            />
          )}

          {selectedCategory === 'ilkOturum' && (
            <IlkOturumTable 
              data={ilkOturumData} 
              isLoading={isLoading} 
              refetch={refetch} 
            />
          )}

          {selectedCategory === 'uyusmazlik' && (
            <UyusmazlikTable 
              data={uyusmazlikData} 
              isLoading={isLoading} 
              refetch={refetch} 
            />
          )}

          {selectedCategory === 'yhk' && (
            <YhkGonderimTable 
              data={yhkGonderimData} 
              isLoading={isLoading} 
              refetch={refetch} 
            />
          )}

          {selectedCategory === 'imzalananTisler' && (
            <ImzalananTislerTable 
              data={imzalananTislerData} 
              isLoading={isLoading} 
              refetch={refetch} 
            />
          )}

          {selectedCategory === 'grevYasagi' && (
            <GrevYasakTable 
              data={grevYasagiData} 
              isLoading={isLoading} 
              refetch={refetch} 
            />
          )}
        </div> : <DashboardGrid items={filteredDashboardData} onCardClick={handleCardClick} />}

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>İşyeri Detayları</DialogTitle>
          </DialogHeader>
          {selectedItem && <WorkplaceItemDetails item={selectedItem} />}
        </DialogContent>
      </Dialog>
    </div>;
};

export default Dashboard;
