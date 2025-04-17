
export const categoryTitles = {
  "authorization-requests": "Yetki Tespiti İstenecek İşyerleri",
  "authorization-notices": "Yetki Belgesi Tebliğ Yapılan İşyerleri",
  "call-required": "Çağrı Yapılacak İşyerleri",
  "first-session": "İlk Oturum Tutulması Gereken İşyerleri",
  "dispute-notices": "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri",
  "strike-decisions": "Grev Kararı Alınması Gereken İşyerleri",
  "yhk-submissions": "YHK'ya Gönderilmesi Gereken İşyerleri"
};

export type WorkplaceItem = {
  id: string;
  name: string;
  responsibleExpert: string;
  branch: string;
  sgkNo: string;
  employeeCount: number;
  memberCount: number;
  status: 'İşlem Bekliyor' | 'Tamamlandı';
};

// Create specific mock data for each category
const mockDataSets: Record<string, WorkplaceItem[]> = {
  "authorization-requests": [
    {
      id: '1',
      name: 'ABC İnşaat',
      responsibleExpert: 'Mehmet Yılmaz',
      branch: 'İstanbul Şubesi',
      sgkNo: '1234567',
      employeeCount: 50,
      memberCount: 30,
      status: "İşlem Bekliyor"
    },
    {
      id: '2',
      name: 'XYZ Tekstil',
      responsibleExpert: 'Ayşe Demir',
      branch: 'Ankara Şubesi',
      sgkNo: '7654321',
      employeeCount: 120,
      memberCount: 85,
      status: "İşlem Bekliyor"
    }
  ],
  "authorization-notices": [
    {
      id: '3',
      name: 'QWE Gıda',
      responsibleExpert: 'Ahmet Can',
      branch: 'İzmir Şubesi',
      sgkNo: '2345678',
      employeeCount: 80,
      memberCount: 60,
      status: "İşlem Bekliyor"
    },
    {
      id: '4',
      name: 'RTY Metal',
      responsibleExpert: 'Elif Kaya',
      branch: 'Bursa Şubesi',
      sgkNo: '8765432',
      employeeCount: 65,
      memberCount: 45,
      status: "İşlem Bekliyor"
    }
  ],
  "call-required": [
    {
      id: '5',
      name: 'ASD Kimya',
      responsibleExpert: 'Canan Yılmaz',
      branch: 'Adana Şubesi',
      sgkNo: '3456789',
      employeeCount: 95,
      memberCount: 70,
      status: "İşlem Bekliyor"
    },
    {
      id: '6',
      name: 'LKJ İlaç',
      responsibleExpert: 'Burak Özkan',
      branch: 'İstanbul Şubesi',
      sgkNo: '9876543',
      employeeCount: 75,
      memberCount: 50,
      status: "İşlem Bekliyor"
    },
    {
      id: '7',
      name: 'ZXC Otomotiv',
      responsibleExpert: 'Deniz Aydın',
      branch: 'Bursa Şubesi',
      sgkNo: '2345678',
      employeeCount: 110,
      memberCount: 80,
      status: "İşlem Bekliyor"
    }
  ],
  "first-session": [
    {
      id: '8',
      name: 'POI Makina',
      responsibleExpert: 'Murat Kılıç',
      branch: 'Konya Şubesi',
      sgkNo: '8765432',
      employeeCount: 85,
      memberCount: 60,
      status: "İşlem Bekliyor"
    }
  ],
  "dispute-notices": [
    {
      id: '9',
      name: 'MKL Plastik',
      responsibleExpert: 'Seda Yıldız',
      branch: 'Kocaeli Şubesi',
      sgkNo: '3456789',
      employeeCount: 65,
      memberCount: 45,
      status: "İşlem Bekliyor"
    },
    {
      id: '10',
      name: 'NHY Elektronik',
      responsibleExpert: 'Ali Çelik',
      branch: 'Ankara Şubesi',
      sgkNo: '9876543',
      employeeCount: 55,
      memberCount: 40,
      status: "İşlem Bekliyor"
    }
  ],
  "strike-decisions": [
    {
      id: '11',
      name: 'UJM Tekstil',
      responsibleExpert: 'Zeynep Demir',
      branch: 'İzmir Şubesi',
      sgkNo: '2345678',
      employeeCount: 95,
      memberCount: 70,
      status: "İşlem Bekliyor"
    }
  ],
  "yhk-submissions": [
    {
      id: '12',
      name: 'BVC Metal',
      responsibleExpert: 'Oğuz Yılmaz',
      branch: 'Kayseri Şubesi',
      sgkNo: '8765432',
      employeeCount: 75,
      memberCount: 55,
      status: "İşlem Bekliyor"
    },
    {
      id: '13',
      name: 'FGH İnşaat',
      responsibleExpert: 'Aylin Kaya',
      branch: 'Antalya Şubesi',
      sgkNo: '3456789',
      employeeCount: 60,
      memberCount: 45,
      status: "İşlem Bekliyor"
    }
  ]
};

export const generateMockData = (type: string): WorkplaceItem[] => {
  return mockDataSets[type] || [];
};

// Get the count of workplaces for each category
export const getWorkplaceCount = (categoryId: string): number => {
  return mockDataSets[categoryId]?.length || 0;
};
