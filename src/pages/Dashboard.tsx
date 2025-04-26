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
import { IlkOturumTable } from "@/components/dashboard/IlkOturumTable";
import { MuzakereSuresiTable } from "@/components/dashboard/MuzakereSuresiTable";
import { UyusmazlikTable } from "@/components/dashboard/UyusmazlikTable";
import { YhkGonderimTable } from "@/components/dashboard/YhkGonderimTable";
import { ImzalananTislerTable } from "@/components/dashboard/ImzalananTislerTable";
import { GrevYasakTable } from "@/components/dashboard/GrevYasakTable";
import { useDashboardData } from "@/hooks/useDashboardData";

const Dashboard = () => {
  const navigate = useNavigate();
  const staticDashboardData = getDashboardData();
  const [selectedCards, setSelectedCards] = useState<string[]>(staticDashboardData.map(item => item.id));
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [showEditableTable, setShowEditableTable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {
    data: n8nDashboardData,
    isLoading,
    refetch
  } = useDashboardData();

  const getListItems = (listName: string) => {
    if (!n8nDashboardData) return [];
    return n8nDashboardData[listName] as any[] || [];
  };

  const allDashboardData = staticDashboardData.map(item => ({
    ...item,
    value: getListItems(item.dataSource).length,
    items: getListItems(item.dataSource)
  }));

  const handleCardClick = (categoryId: string) => {
    const category = allDashboardData.find(item => item.id === categoryId);
    if (categoryId === 'grevKarari' || categoryId === 'grevOylamasi' || categoryId === 'cagri' || categoryId === 'yetkiTespit' || categoryId === 'yetkiBelgesi' || categoryId === 'yerGunTespit' || categoryId === 'ilkOturum' || categoryId === 'muzakereSuresi' || categoryId === 'uyusmazlik' || categoryId === 'yhk' || categoryId === 'imzalananTisler' || categoryId === 'grevYasagi') {
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

  const grevKarariData = getListItems('grevKarariAlinmasiGerekenListesi');
  const grevOylamasiData = getListItems('grevOylamasiYapilmasiGerekenListesi');
  const cagriYapilacakData = getListItems('cagriYapilacakListesi');
  const yetkiTespitData = getListItems('yetkiTespitIstenenListesi');
  const yetkiBelgesiData = getListItems('yetkiBelgesiTebligYapilanListesi');
  const yerGunTespitData = getListItems('yerVeGunTespitListesi');
  const ilkOturumData = getListItems('ilkOturumGerekenListesi');
  const muzakereSuresiData = getListItems('muzakereSuresiDolanListesi');
  const uyusmazlikData = getListItems('uyusmazlikGerekenListesi');
  const yhkGonderimData = getListItems('yhkGonderimGerekenListesi');
  const imzalananTislerData = getListItems('imzalananTislerListesi');
  const grevYasagiData = getListItems('grevYasagiOlanListesi');

  const getTableTitle = () => {
    switch (selectedCategory) {
      case 'grevKarari':
        return "Grev Kararı Alınması Gereken İşyerleri";
      case 'grevOylamasi':
        return "Grev Oylaması Yapılması Gereken İşyerleri";
      case 'cagri':
        return "Çağrı Yapılacak İşyerleri";
      case 'yetkiTespit':
        return "Yetki Tespiti İstenen İşyerleri";
      case 'yetkiBelgesi':
        return "Yetki Belgesi Tebliğ Yapılan İşyerleri";
      case 'yerGunTespit':
        return "Yer ve Gün Tespiti Yapılan İşyerleri";
      case 'ilkOturum':
        return "İlk Oturum Gereken İşyerleri";
      case 'muzakereSuresi':
        return "Müzakere Süresi Dolan İşyerleri";
      case 'uyusmazlik':
        return "Uyuşmazlık Gereken İşyerleri";
      case 'yhk':
        return "YHK Gönderim Gereken İşyerleri";
      case 'imzalananTisler':
        return "İmzalanan Tisler";
      case 'grevYasagi':
        return "Grev Yasağı Olan İşyerleri";
      default:
        return "";
    }
  };

  return <div className="space-y-6">
      <DashboardHeader allDashboardData={allDashboardData} selectedCards={selectedCards} onToggleCard={toggleCard} />

      {showEditableTable ? <div className="space-y-4">
          <div className="flex justify-between items-center">
            
            <Button variant="outline" onClick={() => setShowEditableTable(false)}>
              Gösterge Paneline Dön
            </Button>
          </div>
          
          {selectedCategory === 'grevKarari' && <EditableWorkplaceTable data={grevKarariData} isLoading={isLoading} refetch={refetch} />}
          
          {selectedCategory === 'grevOylamasi' && <GrevOylamasiTable data={grevOylamasiData} isLoading={isLoading} refetch={refetch} />}

          {selectedCategory === 'cagri' && <CagriYapilacakTable data={cagriYapilacakData} isLoading={isLoading} refetch={refetch} />}

          {selectedCategory === 'yetkiTespit' && <YetkiTespitTable data={yetkiTespitData} isLoading={isLoading} refetch={refetch} />}

          {selectedCategory === 'yetkiBelgesi' && <YetkiBelgesiTable data={yetkiBelgesiData} isLoading={isLoading} refetch={refetch} />}

          {selectedCategory === 'yerGunTespit' && <YerGunTespitTable data={yerGunTespitData} isLoading={isLoading} refetch={refetch} />}

          {selectedCategory === 'ilkOturum' && <IlkOturumTable data={ilkOturumData} isLoading={isLoading} refetch={refetch} />}

          {selectedCategory === 'muzakereSuresi' && <MuzakereSuresiTable data={muzakereSuresiData} isLoading={isLoading} refetch={refetch} />}

          {selectedCategory === 'uyusmazlik' && <UyusmazlikTable data={uyusmazlikData} isLoading={isLoading} refetch={refetch} />}

          {selectedCategory === 'yhk' && <YhkGonderimTable data={yhkGonderimData} isLoading={isLoading} refetch={refetch} />}

          {selectedCategory === 'imzalananTisler' && <ImzalananTislerTable data={imzalananTislerData} isLoading={isLoading} refetch={refetch} />}

          {selectedCategory === 'grevYasagi' && <GrevYasakTable data={grevYasagiData} isLoading={isLoading} refetch={refetch} />}
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
