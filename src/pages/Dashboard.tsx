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
import { MuzakereSuresiTable } from "@/components/dashboard/MuzakereSuresiTable";
import { UyusmazlikTable } from "@/components/dashboard/UyusmazlikTable";
import { YhkGonderimTable } from "@/components/dashboard/YhkGonderimTable";
import { ImzalananTislerTable } from "@/components/dashboard/ImzalananTislerTable";
import { GrevYasakTable } from "@/components/dashboard/GrevYasakTable";
import { useDashboardData } from "@/hooks/useDashboardData";
import { GrevKarariTable } from "@/components/dashboard/GrevKarariTable";
import { formatInTimeZone } from "date-fns-tz";
import { tr } from "date-fns/locale";

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
  const {
    data: dashboardData,
    isLoading,
    refetch
  } = useDashboardData();

  const formatUpdatedAt = (date: string) => {
    if (!date) return "";
    return formatInTimeZone(new Date(date), 'Europe/Istanbul', 'dd.MM.yyyy HH:mm', { locale: tr });
  };

  const getListItems = (listName: string) => {
    if (!dashboardData) return [];
    return dashboardData[listName] as any[] || [];
  };

  const allDashboardData = staticDashboardData.map(item => ({
    ...item,
    value: getListItems(item.dataSource).length,
    items: getListItems(item.dataSource).map(workplace => ({
      ...workplace,
      formattedUpdatedAt: formatUpdatedAt(workplace.updated_at)
    }))
  }));

  const handleCardClick = (categoryId: string) => {
    const category = allDashboardData.find(item => item.id === categoryId);
    if (categoryId === 'grevKarari' || categoryId === 'grevOylamasi' || categoryId === 'cagri' || 
        categoryId === 'yetkiTespit' || categoryId === 'yetkiBelgesi' || categoryId === 'yerGunTespit' || 
        categoryId === 'oncedenBelirlenen' || categoryId === 'ilkOturum' || categoryId === 'muzakereSuresi' || 
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
    setSelectedCards(current => current.includes(cardId) ? current.filter(id => id !== cardId) : [...current, cardId]);
  };

  const filteredDashboardData = allDashboardData.filter(item => selectedCards.includes(item.id));

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  const grevKarariData = getListItems('grev_kararı_alınması_gereken_view');
  const grevOylamasiData = getListItems('grev_oylaması_yapılması_gereken_view');
  const cagriYapilacakData = getListItems('çağrı_yapılacak_view');
  const yetkiTespitData = getListItems('yetki_tespit_istenecek_view');
  const yetkiBelgesiData = getListItems('yetki_belgesi_tebliğ_yapılan_view');
  const yerGunTespitData = getListItems('yer_ve_gün_tespit_tarihli_view');
  const oncedenBelirlenenData = getListItems('önceden_belirlenen_ilk_oturum_view');
  const ilkOturumData = getListItems('ilk_oturum_tutulması_gereken_view');
  const muzakereSuresiData = getListItems('müzakere_süresi_dolan_view');
  const uyusmazlikData = getListItems('uyuşmazlık_bildirimi_yapılması_gereken_view');
  const yhkGonderimData = getListItems('yhk_gönderim_gereken_view');
  const imzalananTislerData = getListItems('imzalanan_tisler_view');
  const grevYasagiData = getListItems('grev_yasağı_olan_view');

  // Define consistent default columns to use across all tables
  const defaultColumns = ["İŞYERİ ADI", "BAĞLI OLDUĞU ŞUBE"]; 

  return <div className="space-y-6">
      <DashboardHeader allDashboardData={allDashboardData} selectedCards={selectedCards} onToggleCard={toggleCard} />

      {showEditableTable ? <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setShowEditableTable(false)}>
              Gösterge Paneline Dön
            </Button>
          </div>
          
          {selectedCategory === 'grevKarari' && <GrevKarariTable data={grevKarariData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}
          
          {selectedCategory === 'grevOylamasi' && <GrevOylamasiTable data={grevOylamasiData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}

          {selectedCategory === 'cagri' && <CagriYapilacakTable data={cagriYapilacakData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}

          {selectedCategory === 'yetkiTespit' && <YetkiTespitTable data={yetkiTespitData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}

          {selectedCategory === 'yetkiBelgesi' && <YetkiBelgesiTable data={yetkiBelgesiData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}

          {selectedCategory === 'yerGunTespit' && <YerGunTespitTable data={yerGunTespitData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}
          
          {selectedCategory === 'oncedenBelirlenen' && <OncedenBelirlenenTable data={oncedenBelirlenenData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}

          {selectedCategory === 'ilkOturum' && <IlkOturumTable data={ilkOturumData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}

          {selectedCategory === 'muzakereSuresi' && <MuzakereSuresiTable data={muzakereSuresiData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}

          {selectedCategory === 'uyusmazlik' && <UyusmazlikTable data={uyusmazlikData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}

          {selectedCategory === 'yhk' && <YhkGonderimTable data={yhkGonderimData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}

          {selectedCategory === 'imzalananTisler' && <ImzalananTislerTable data={imzalananTislerData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}

          {selectedCategory === 'grevYasagi' && <GrevYasakTable data={grevYasagiData} isLoading={isLoading} refetch={refetch} defaultColumns={defaultColumns} />}
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
