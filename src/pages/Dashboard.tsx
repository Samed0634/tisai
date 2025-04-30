
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

  // Default columns configuration for all tables
  const defaultColumns = {
    grevKarari: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV KARARI TARİHİ"],
    grevOylamasi: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV OYLAMASI TARİHİ"],
    cagri: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "ÇAĞRI TARİHİ"],
    yetkiTespit: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YETKİ TESPİT İSTEM TARİHİ"],
    yetkiBelgesi: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YETKİ BELGESİ TEBLİĞ TARİHİ"],
    yerGunTespit: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YER VE GÜN TESPİT TARİHİ"],
    oncedenBelirlenen: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"],
    ilkOturum: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İLK OTURUM TARİHİ"],
    muzakereSuresi: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "MÜZAKERE SÜRESİ SON TARİH"],
    uyusmazlik: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "UYUŞMAZLIK TARİHİ"],
    yhk: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YHK GÖNDERİM TARİHİ"],
    imzalananTisler: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "TİS GELİŞ TARİHİ"],
    grevYasagi: ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV YASAĞI DURUMU"],
  };

  const getListItems = (listName: string) => {
    if (!dashboardData) return [];
    return dashboardData[listName] as any[] || [];
  };

  const allDashboardData = staticDashboardData.map(item => ({
    ...item,
    value: getListItems(item.dataSource).length,
    items: getListItems(item.dataSource)
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

  return (
    <div className="space-y-6">
      <DashboardHeader allDashboardData={allDashboardData} selectedCards={selectedCards} onToggleCard={toggleCard} />

      {showEditableTable ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setShowEditableTable(false)}>
              Gösterge Paneline Dön
            </Button>
          </div>
          
          {selectedCategory === 'grevKarari' && 
            <GrevKarariTable 
              data={grevKarariData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.grevKarari} 
            />
          }
          
          {selectedCategory === 'grevOylamasi' && 
            <GrevOylamasiTable 
              data={grevOylamasiData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.grevOylamasi} 
            />
          }

          {selectedCategory === 'cagri' && 
            <CagriYapilacakTable 
              data={cagriYapilacakData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.cagri} 
            />
          }

          {selectedCategory === 'yetkiTespit' && 
            <YetkiTespitTable 
              data={yetkiTespitData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.yetkiTespit} 
            />
          }

          {selectedCategory === 'yetkiBelgesi' && 
            <YetkiBelgesiTable 
              data={yetkiBelgesiData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.yetkiBelgesi} 
            />
          }

          {selectedCategory === 'yerGunTespit' && 
            <YerGunTespitTable 
              data={yerGunTespitData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.yerGunTespit} 
            />
          }
          
          {selectedCategory === 'oncedenBelirlenen' && 
            <OncedenBelirlenenTable 
              data={oncedenBelirlenenData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.oncedenBelirlenen} 
            />
          }

          {selectedCategory === 'ilkOturum' && 
            <IlkOturumTable 
              data={ilkOturumData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.ilkOturum} 
            />
          }

          {selectedCategory === 'muzakereSuresi' && 
            <MuzakereSuresiTable 
              data={muzakereSuresiData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.muzakereSuresi} 
            />
          }

          {selectedCategory === 'uyusmazlik' && 
            <UyusmazlikTable 
              data={uyusmazlikData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.uyusmazlik} 
            />
          }

          {selectedCategory === 'yhk' && 
            <YhkGonderimTable 
              data={yhkGonderimData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.yhk} 
            />
          }

          {selectedCategory === 'imzalananTisler' && 
            <ImzalananTislerTable 
              data={imzalananTislerData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.imzalananTisler} 
            />
          }

          {selectedCategory === 'grevYasagi' && 
            <GrevYasakTable 
              data={grevYasagiData} 
              isLoading={isLoading} 
              refetch={refetch} 
              defaultColumns={defaultColumns.grevYasagi} 
            />
          }
        </div>
      ) : (
        <DashboardGrid items={filteredDashboardData} onCardClick={handleCardClick} />
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
