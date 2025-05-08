
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboardData } from "@/hooks/useDashboardData";
import { CagriYapilacakTable } from "@/components/dashboard/CagriYapilacakTable";
import { YetkiTespitTable } from "@/components/dashboard/YetkiTespitTable";
import { YetkiBelgesiTable } from "@/components/dashboard/YetkiBelgesiTable";
import { YerGunTespitTable } from "@/components/dashboard/YerGunTespitTable";
import { OncedenBelirlenenTable } from "@/components/dashboard/OncedenBelirlenenTable";
import { IlkOturumTable } from "@/components/dashboard/IlkOturumTable";
import { MuzakereSuresiTable } from "@/components/dashboard/MuzakereSuresiTable";
import { UyusmazlikTable } from "@/components/dashboard/UyusmazlikTable";
import { GrevKarariTable } from "@/components/dashboard/GrevKarariTable";
import { GrevOylamasiTable } from "@/components/dashboard/GrevOylamasiTable";
import { YhkGonderimTable } from "@/components/dashboard/YhkGonderimTable";
import { ImzalananTislerTable } from "@/components/dashboard/ImzalananTislerTable";
import { GrevYasakTable } from "@/components/dashboard/GrevYasakTable";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProcedureStatus = () => {
  const [activeTab, setActiveTab] = useState("cagri");
  const { data, isLoading, refetch } = useDashboardData();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Süreç Durumları</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-6">
          <TabsTrigger value="cagri">Çağrı</TabsTrigger>
          <TabsTrigger value="yetki">Yetki Tespiti</TabsTrigger>
          <TabsTrigger value="yetkiBelgesi">Yetki Belgesi</TabsTrigger>
          <TabsTrigger value="yerGun">Yer ve Gün</TabsTrigger>
          <TabsTrigger value="oturum">Oturum</TabsTrigger>
          <TabsTrigger value="diger">Diğer</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="pt-6">
            <TabsContent value="cagri">
              <CagriYapilacakTable 
                data={data?.çağrı_yapılacak_view || []} 
                isLoading={isLoading} 
                refetch={refetch}
              />
            </TabsContent>
            
            <TabsContent value="yetki">
              <YetkiTespitTable 
                data={data?.yetki_tespit_istenecek_view || []} 
                isLoading={isLoading} 
                refetch={refetch}
              />
            </TabsContent>
            
            <TabsContent value="yetkiBelgesi">
              <YetkiBelgesiTable 
                data={data?.yetki_belgesi_tebliğ_yapılan_view || []} 
                isLoading={isLoading} 
                refetch={refetch}
              />
            </TabsContent>
            
            <TabsContent value="yerGun">
              <YerGunTespitTable 
                data={data?.yer_ve_gün_tespit_tarihli_view || []} 
                isLoading={isLoading} 
                refetch={refetch}
              />
            </TabsContent>
            
            <TabsContent value="oturum">
              <Tabs defaultValue="onceden">
                <TabsList className="mb-4">
                  <TabsTrigger value="onceden">Önceden Belirlenen</TabsTrigger>
                  <TabsTrigger value="ilkOturum">İlk Oturum</TabsTrigger>
                  <TabsTrigger value="muzakere">Müzakere Süresi</TabsTrigger>
                </TabsList>
                
                <TabsContent value="onceden">
                  <OncedenBelirlenenTable 
                    data={data?.önceden_belirlenen_ilk_oturum_view || []} 
                    isLoading={isLoading} 
                    refetch={refetch}
                  />
                </TabsContent>
                
                <TabsContent value="ilkOturum">
                  <IlkOturumTable 
                    data={data?.ilk_oturum_tutulması_gereken_view || []} 
                    isLoading={isLoading} 
                    refetch={refetch}
                  />
                </TabsContent>
                
                <TabsContent value="muzakere">
                  <MuzakereSuresiTable 
                    data={data?.müzakere_süresi_dolan_view || []} 
                    isLoading={isLoading} 
                    refetch={refetch}
                  />
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="diger">
              <Tabs defaultValue="uyusmazlik">
                <TabsList className="mb-4">
                  <TabsTrigger value="uyusmazlik">Uyuşmazlık</TabsTrigger>
                  <TabsTrigger value="grevKarari">Grev Kararı</TabsTrigger>
                  <TabsTrigger value="grevOylamasi">Grev Oylaması</TabsTrigger>
                  <TabsTrigger value="yhk">YHK</TabsTrigger>
                  <TabsTrigger value="tis">İmzalanan TİSler</TabsTrigger>
                  <TabsTrigger value="grevYasak">Grev Yasağı</TabsTrigger>
                </TabsList>
                
                <TabsContent value="uyusmazlik">
                  <UyusmazlikTable 
                    data={data?.uyuşmazlık_bildirimi_yapılması_gereken_view || []} 
                    isLoading={isLoading} 
                    refetch={refetch}
                  />
                </TabsContent>
                
                <TabsContent value="grevKarari">
                  <GrevKarariTable 
                    data={data?.grev_kararı_alınması_gereken_view || []} 
                    isLoading={isLoading} 
                    refetch={refetch}
                  />
                </TabsContent>
                
                <TabsContent value="grevOylamasi">
                  <GrevOylamasiTable 
                    data={data?.grev_oylaması_yapılması_gereken_view || []} 
                    isLoading={isLoading} 
                    refetch={refetch}
                  />
                </TabsContent>
                
                <TabsContent value="yhk">
                  <YhkGonderimTable 
                    data={data?.yhk_gönderim_gereken_view || []} 
                    isLoading={isLoading} 
                    refetch={refetch}
                  />
                </TabsContent>
                
                <TabsContent value="tis">
                  <ImzalananTislerTable 
                    data={data?.imzalanan_tisler_view || []} 
                    isLoading={isLoading} 
                    refetch={refetch}
                  />
                </TabsContent>
                
                <TabsContent value="grevYasak">
                  <GrevYasakTable 
                    data={data?.grev_yasağı_olan_view || []} 
                    isLoading={isLoading} 
                    refetch={refetch}
                  />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default ProcedureStatus;
