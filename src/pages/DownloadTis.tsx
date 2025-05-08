
import React, { useState, useMemo, useEffect } from 'react';
import { Download, Filter, SortAsc } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { normalizeText, fuzzySearch } from '@/utils/searchUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type SortOption = "alphabetical" | "expiryDate" | "receivedDate";

const DownloadTis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allResults, setAllResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [branchFilter, setBranchFilter] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('');
  const [expertFilter, setExpertFilter] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('expiryDate');

  // Get unique values for filter dropdowns
  const branches = useMemo(() => {
    const branchSet = new Set<string>();
    allResults.forEach(item => {
      if (item['BAĞLI OLDUĞU ŞUBE']) {
        branchSet.add(item['BAĞLI OLDUĞU ŞUBE']);
      }
    });
    return Array.from(branchSet).sort();
  }, [allResults]);

  const years = useMemo(() => {
    const yearSet = new Set<string>();
    allResults.forEach(item => {
      if (item['TİS İMZA TARİHİ']) {
        const year = new Date(item['TİS İMZA TARİHİ']).getFullYear().toString();
        yearSet.add(year);
      }
    });
    return Array.from(yearSet).sort().reverse();
  }, [allResults]);

  const experts = useMemo(() => {
    const expertSet = new Set<string>();
    allResults.forEach(item => {
      if (item['SORUMLU UZMAN']) {
        expertSet.add(item['SORUMLU UZMAN']);
      }
    });
    return Array.from(expertSet).sort();
  }, [allResults]);

  // Filter and sort results
  const results = useMemo(() => {
    // First apply filters
    let filteredResults = allResults.filter(item => {
      // Text search
      const textMatch = !searchTerm || 
        fuzzySearch(searchTerm, item['İŞYERİ ADI'] || '') || 
        fuzzySearch(searchTerm, item['SORUMLU UZMAN'] || '') ||
        fuzzySearch(searchTerm, item['SGK NO'] || '');
      
      // Branch filter
      const branchMatch = !branchFilter || 
        item['BAĞLI OLDUĞU ŞUBE'] === branchFilter;
      
      // Year filter (from TİS İMZA TARİHİ)
      const yearMatch = !yearFilter || 
        (item['TİS İMZA TARİHİ'] && 
          new Date(item['TİS İMZA TARİHİ']).getFullYear().toString() === yearFilter);
      
      // Expert filter
      const expertMatch = !expertFilter || 
        item['SORUMLU UZMAN'] === expertFilter;
      
      return textMatch && branchMatch && yearMatch && expertMatch;
    });

    // Then apply sorting
    return filteredResults.sort((a, b) => {
      switch (sortOption) {
        case 'alphabetical':
          return (a['İŞYERİ ADI'] || '').localeCompare(b['İŞYERİ ADI'] || '');
        
        case 'expiryDate':
          // Sort by TİS BİTİŞ TARİHİ (closest to expiry first)
          const dateA = a['TİS BİTİŞ TARİHİ'] ? new Date(a['TİS BİTİŞ TARİHİ']).getTime() : Number.MAX_SAFE_INTEGER;
          const dateB = b['TİS BİTİŞ TARİHİ'] ? new Date(b['TİS BİTİŞ TARİHİ']).getTime() : Number.MAX_SAFE_INTEGER;
          return dateA - dateB;
        
        case 'receivedDate':
          // Sort by TİS GELİŞ TARİHİ (most recent first)
          const receivedA = a['TİS GELİŞ TARİHİ'] ? new Date(a['TİS GELİŞ TARİHİ']).getTime() : 0;
          const receivedB = b['TİS GELİŞ TARİHİ'] ? new Date(b['TİS GELİŞ TARİHİ']).getTime() : 0;
          return receivedB - receivedA;
          
        default:
          return 0;
      }
    });
  }, [searchTerm, allResults, branchFilter, yearFilter, expertFilter, sortOption]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Fetch all items with TIS URLs, then filter on client side
      const { data, error } = await supabase
        .from('isyerleri')
        .select('*')
        .not('tis_url', 'is', null);
      
      if (error) throw error;
      
      setAllResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Hata",
        description: "Arama yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (url: string, workplaceName: string) => {
    try {
      // Open the URL in a new tab/window
      window.open(url, '_blank');
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Hata",
        description: "TİS indirme işlemi başarısız oldu.",
        variant: "destructive",
      });
    }
  };

  const clearFilters = () => {
    setBranchFilter('');
    setYearFilter('');
    setExpertFilter('');
  };

  // Load data when component mounts
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">TİS İndir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[250px]">
                <Input 
                  type="text" 
                  placeholder="İşyeri adı ile hızlı arama yapın..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                  className="w-full"
                  title="Büyük/küçük harf ve Türkçe karakter duyarlılığı olmadan arama yapar"
                />
              </div>
              
              <Collapsible 
                open={isFilterOpen} 
                onOpenChange={setIsFilterOpen}
                className="flex items-center"
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    {isFilterOpen ? "Filtreleri Gizle" : "Filtreleri Göster"}
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <SortAsc className="h-4 w-4" />
                    <span>Sırala</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortOption('alphabetical')}>
                    Alfabeye Göre
                    {sortOption === 'alphabetical' && <span className="ml-2">✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption('expiryDate')}>
                    Yürürlük Sona Erme Tarihine Göre
                    {sortOption === 'expiryDate' && <span className="ml-2">✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption('receivedDate')}>
                    TİS Geliş Tarihine Göre
                    {sortOption === 'receivedDate' && <span className="ml-2">✓</span>}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
              >
                Yenile
              </Button>
            </div>

            <CollapsibleContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium mb-1">Bağlı Olduğu Şube</label>
                  <Select value={branchFilter} onValueChange={setBranchFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tüm Şubeler" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tüm Şubeler</SelectItem>
                      {branches.map(branch => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">TİS İmza Yılı</label>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tüm Yıllar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tüm Yıllar</SelectItem>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Sorumlu Uzman</label>
                  <Select value={expertFilter} onValueChange={setExpertFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tüm Uzmanlar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tüm Uzmanlar</SelectItem>
                      {experts.map(expert => (
                        <SelectItem key={expert} value={expert}>{expert}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-3">
                  <Button 
                    variant="secondary" 
                    onClick={clearFilters}
                    size="sm"
                    className="w-full"
                  >
                    Filtreleri Temizle
                  </Button>
                </div>
              </div>
            </CollapsibleContent>

            <div className="space-y-4 mt-6">
              {results.map(item => (
                <Card key={item.ID} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item['İŞYERİ ADI']}</h3>
                      <div className="text-sm text-muted-foreground flex flex-col gap-1">
                        {item['TİS BAŞLANGIÇ TARİHİ'] && item['TİS BİTİŞ TARİHİ'] && (
                          <span>Yürürlük Süresi: {new Date(item['TİS BAŞLANGIÇ TARİHİ']).toLocaleDateString('tr-TR')} - {new Date(item['TİS BİTİŞ TARİHİ']).toLocaleDateString('tr-TR')}</span>
                        )}
                        {item['BAĞLI OLDUĞU ŞUBE'] && (
                          <span>Şube: {item['BAĞLI OLDUĞU ŞUBE']}</span>
                        )}
                        {item['SORUMLU UZMAN'] && (
                          <span>Uzman: {item['SORUMLU UZMAN']}</span>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => handleDownload(item.tis_url, item['İŞYERİ ADI'])}
                      disabled={!item.tis_url}
                    >
                      <Download className="h-4 w-4" />
                      İndir
                    </Button>
                  </div>
                </Card>
              ))}
              
              {results.length === 0 && !isLoading && (
                <p className="text-center text-muted-foreground">
                  {allResults.length === 0 ? 'TİS belgesi bulunamadı.' : 'Arama sonucu bulunamadı.'}
                </p>
              )}

              {isLoading && (
                <p className="text-center text-muted-foreground">
                  Yükleniyor...
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadTis;
