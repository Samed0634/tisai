
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Örnek veri - Gerçek uygulamada API'den gelecek
const companiesData = [
  { id: 1, name: "ABC İşyeri", sgkNo: "12345678901", employeeCount: 25, memberCount: 15 },
  { id: 2, name: "DEF İşyeri", sgkNo: "23456789012", employeeCount: 40, memberCount: 20 },
  { id: 3, name: "GHI İşyeri", sgkNo: "34567890123", employeeCount: 15, memberCount: 8 },
  { id: 4, name: "JKL İşyeri", sgkNo: "45678901234", employeeCount: 60, memberCount: 35 },
  { id: 5, name: "MNO İşyeri", sgkNo: "56789012345", employeeCount: 30, memberCount: 18 },
  { id: 6, name: "PQR İşyeri", sgkNo: "67890123456", employeeCount: 35, memberCount: 22 },
  { id: 7, name: "STU İşyeri", sgkNo: "78901234567", employeeCount: 50, memberCount: 30 },
  { id: 8, name: "VWX İşyeri", sgkNo: "89012345678", employeeCount: 20, memberCount: 12 },
  { id: 9, name: "YZA İşyeri", sgkNo: "90123456789", employeeCount: 45, memberCount: 28 },
];

const searchSchema = z.object({
  searchTerm: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const updateSchema = z.object({
  field: z.string({
    required_error: "Güncellenecek alanı seçmeniz gerekiyor.",
  }),
  value: z.string({
    required_error: "Yeni değer girmeniz gerekiyor.",
  }),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

const UpdateData = () => {
  const [searchResults, setSearchResults] = useState<typeof companiesData>([]);
  const [selectedCompany, setSelectedCompany] = useState<typeof companiesData[0] | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const searchForm = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  const updateForm = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
  });

  const onSearchSubmit = (data: SearchFormValues) => {
    setIsSearching(true);
    setShowResults(false);
    
    setTimeout(() => {
      // Gerçek uygulamada API çağrısı yapılacak
      const filteredResults = companiesData.filter(company => 
        company.name.toLowerCase().includes((data.searchTerm || '').toLowerCase()) ||
        company.sgkNo.includes(data.searchTerm || '')
      );
      
      setSearchResults(filteredResults);
      setShowResults(true);
      setIsSearching(false);
    }, 500);
  };

  const onUpdateSubmit = async (data: UpdateFormValues) => {
    if (!selectedCompany) return;
    
    setIsUpdating(true);
    
    try {
      // Burada n8n HTTP webhook'a istek yapılacak
      // Örnek olarak direkt başarılı kabul edelim
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Veri güncellendi",
        description: `${selectedCompany.name} için ${data.field} alanı başarıyla güncellendi.`,
      });
      
      // Formu temizle
      updateForm.reset();
      setSelectedCompany(null);
      setSearchResults([]);
      setShowResults(false);
      searchForm.reset();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Güncelleme sırasında bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCompanySelect = (company: typeof companiesData[0]) => {
    setSelectedCompany(company);
  };

  return (
    <div className="space-y-6">
      <h1 className="heading-1">Veri Güncelleme</h1>
      <p className="text-secondary-600">
        Güncellemek istediğiniz işyerini arayın ve değişiklik yapmak istediğiniz alanı seçin.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>İşyeri Arama</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...searchForm}>
            <form onSubmit={searchForm.handleSubmit(onSearchSubmit)} className="space-y-4">
              <div className="flex w-full items-center space-x-2">
                <Input 
                  placeholder="İşyeri adı veya SGK numarası ile arayın..."
                  {...searchForm.register("searchTerm")}
                />
                <Button type="submit" disabled={isSearching}>
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span className="ml-2">Ara</span>
                </Button>
              </div>
            </form>
          </Form>

          {showResults && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Arama Sonuçları ({searchResults.length})</h3>
              {searchResults.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>İşyeri Adı</TableHead>
                        <TableHead>SGK No</TableHead>
                        <TableHead>İşçi Sayısı</TableHead>
                        <TableHead>Üye Sayısı</TableHead>
                        <TableHead className="text-right">İşlem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((company) => (
                        <TableRow 
                          key={company.id}
                          className={
                            selectedCompany?.id === company.id 
                              ? "bg-primary-50"
                              : undefined
                          }
                        >
                          <TableCell className="font-medium">{company.name}</TableCell>
                          <TableCell>{company.sgkNo}</TableCell>
                          <TableCell>{company.employeeCount}</TableCell>
                          <TableCell>{company.memberCount}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCompanySelect(company)}
                            >
                              Seç
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-4 border rounded-md">
                  <p className="text-secondary-500">Sonuç bulunamadı.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedCompany && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedCompany.name} - Veri Güncelleme</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...updateForm}>
              <form onSubmit={updateForm.handleSubmit(onUpdateSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Güncellenecek Alan</label>
                    <Select onValueChange={(value) => updateForm.setValue("field", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Alan seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Temel Bilgiler</SelectLabel>
                          <SelectItem value="companyName">İşyeri Adı</SelectItem>
                          <SelectItem value="sgkNo">SGK No</SelectItem>
                          <SelectItem value="employeeCount">İşçi Sayısı</SelectItem>
                          <SelectItem value="memberCount">Üye Sayısı</SelectItem>
                          <SelectItem value="address">Adres</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>İletişim Bilgileri</SelectLabel>
                          <SelectItem value="contactPerson">İletişim Kişisi</SelectItem>
                          <SelectItem value="contactPhone">İletişim Telefonu</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Tarihler</SelectLabel>
                          <SelectItem value="authDate">Yetki Belgesi Tebliğ Tarihi</SelectItem>
                          <SelectItem value="callDate">Çağrı Tarihi</SelectItem>
                          <SelectItem value="sessionDate">İlk Oturum Tarihi</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {updateForm.formState.errors.field && (
                      <p className="text-sm text-destructive-500">
                        {updateForm.formState.errors.field.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Yeni Değer</label>
                    <Input 
                      {...updateForm.register("value")}
                      placeholder="Yeni değeri girin"
                    />
                    {updateForm.formState.errors.value && (
                      <p className="text-sm text-destructive-500">
                        {updateForm.formState.errors.value.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setSelectedCompany(null);
                      updateForm.reset();
                    }}
                  >
                    İptal
                  </Button>
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Güncelleniyor...
                      </>
                    ) : (
                      "Güncelle"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UpdateData;
