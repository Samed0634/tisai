
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Edit, ArrowUpDown, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateMockData, categoryTitles, WorkplaceItem } from "@/utils/mockData";
import { generateActivityMessage } from "@/utils/activityUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import UpdateWorkplaceDialog from "@/components/UpdateWorkplaceDialog";

const COLUMNS = [
  { id: 'no', title: 'NO' },
  { id: 'status', title: 'Süreç', fixed: true },
  { id: 'responsibleExpert', title: 'Sorumlu Uzman' },
  { id: 'province', title: 'İşyerinin Bulunduğu İl' },
  { id: 'branch', title: 'Bağlı Olduğu Şube' },
  { id: 'workplaceType', title: 'İşyeri Türü' },
  { id: 'name', title: 'İşyeri Adı' },
  { id: 'sgkNo', title: 'SGK No' },
  { id: 'employeeCount', title: 'İşçi Sayısı' },
  { id: 'memberCount', title: 'Üye Sayısı' },
  { id: 'employerUnion', title: 'İşveren Sendikası' },
  { id: 'tenderStartDate', title: 'İhale Başlangıç Tarihi' },
  { id: 'tenderEndDate', title: 'İhale Bitiş Tarihi' },
  { id: 'tenderName', title: 'İhale Adı' },
  { id: 'authorizationType', title: 'Yetki Belgesi Türü' },
  { id: 'authorizationDate', title: 'Yetki Tespit Tarihi' },
  { id: 'strikeStatus', title: 'Grev Yasağı Durumu' },
  { id: 'authorizationNoticeDate', title: 'Yetki Belgesi Tebliğ Tarihi' },
  { id: 'callDate', title: 'Çağrı Tarihi' },
  { id: 'placeAndDateDetermination', title: 'Yer ve Gün Tespit Tarihi' },
  { id: 'predeterminedFirstSession', title: 'Önceden Belirlenen İlk Oturum Tarihi' },
  { id: 'firstSessionDate', title: 'İlk Oturum Tarihi' },
  { id: 'disputeDate', title: 'Uyuşmazlık Tarihi' },
  { id: 'mediatorDeadline', title: 'Arabulucu Atama Son Tarih' },
  { id: 'mediatorReportDate', title: 'Arabulucu Raporu Tebliğ Tarihi' },
  { id: 'strikeDecisionDate', title: 'Grev Kararı Tarihi' },
  { id: 'actualStrikeDate', title: 'Fiili Grev Kararı Tarihi' },
  { id: 'strikeVotingDate', title: 'Grev Oylaması Tarihi' },
  { id: 'yhkSubmissionDate', title: 'YHK Gönderim Tarihi' },
  { id: 'yhkReminder', title: 'YHK Hatırlatma' },
  { id: 'tisSignDate', title: 'TİS İmza Tarihi' },
  { id: 'tisStartDate', title: 'TİS Başlangıç Tarihi' },
  { id: 'tisEndDate', title: 'TİS Bitiş Tarihi' }
];

const DEFAULT_VISIBLE_COLUMNS = ['status', 'name', 'branch', 'responsibleExpert', 'sgkNo', 'employeeCount', 'memberCount'];

const DataDetails = () => {
  const { type } = useParams<{ type: string }>();
  const [selectedCompany, setSelectedCompany] = useState<WorkplaceItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState<WorkplaceItem[]>(generateMockData(type || ""));
  const { toast } = useToast();
  const [processDate, setProcessDate] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_VISIBLE_COLUMNS);
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const title = categoryTitles[type as keyof typeof categoryTitles] || "Detaylar";

  const handleSort = (columnId: string) => {
    if (sortKey === columnId) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(columnId);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = (a as any)[sortKey];
    const bValue = (b as any)[sortKey];
    const compareResult = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    return sortOrder === 'asc' ? compareResult : -compareResult;
  });

  const toggleColumn = (columnId: string) => {
    if (columnId === 'status') return;
    setVisibleColumns(current =>
      current.includes(columnId)
        ? current.filter(id => id !== columnId)
        : [...current, columnId]
    );
  };

  const openUpdateDialog = (company: WorkplaceItem) => {
    setSelectedCompany(company);
    setProcessDate("");
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!processDate || !selectedCompany || !type) {
      toast({
        title: "Uyarı",
        description: "Lütfen tarih seçiniz.",
        variant: "destructive"
      });
      return;
    }

    const activityMessage = generateActivityMessage(selectedCompany.name, type);
    
    setData(prevData => prevData.filter(item => item.id !== selectedCompany.id));

    toast({
      title: "İşlem Tamamlandı",
      description: `${selectedCompany.name} için ${activityMessage}.`,
    });

    setIsDialogOpen(false);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusClassName = () => {
      switch(status) {
        case "İşlem Bekliyor":
          return "bg-yellow-100 text-yellow-800";
        case "Tamamlandı":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <Badge variant="outline" className={getStatusClassName()}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sırala
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {COLUMNS.filter(column => visibleColumns.includes(column.id)).map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={sortKey === column.id}
                  onCheckedChange={() => handleSort(column.id)}
                >
                  {`${column.title}'e göre sırala`}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px] max-h-[400px] overflow-y-auto">
              {COLUMNS.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={visibleColumns.includes(column.id)}
                  onCheckedChange={() => toggleColumn(column.id)}
                  disabled={column.fixed}
                >
                  {column.title}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.filter(column => visibleColumns.includes(column.id))
                .map(column => (
                  <TableHead 
                    key={column.id}
                    className={sortKey === column.id ? 'text-primary' : ''}
                  >
                    {column.title}
                  </TableHead>
                ))}
              <TableHead className="text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                {COLUMNS.filter(column => visibleColumns.includes(column.id))
                  .map(column => (
                    <TableCell key={column.id}>
                      {column.id === 'status' ? (
                        <StatusBadge status={item.status} />
                      ) : (
                        (item as any)[column.id]
                      )}
                    </TableCell>
                  ))}
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openUpdateDialog(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <UpdateWorkplaceDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        workplace={selectedCompany}
        processDate={processDate}
        onProcessDateChange={setProcessDate}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default DataDetails;
