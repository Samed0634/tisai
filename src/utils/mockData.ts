
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

export const generateMockData = (type: string): WorkplaceItem[] => {
  const mockData: WorkplaceItem[] = [
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
    },
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
    },
    {
      id: '5',
      name: 'ASD Kimya',
      responsibleExpert: 'Canan Yılmaz',
      branch: 'Adana Şubesi',
      sgkNo: '3456789',
      employeeCount: 95,
      memberCount: 70,
      status: "İşlem Bekliyor"
    }
  ];

  // Filter mock data based on the type
  return mockData.filter(item => {
    switch(type) {
      case "authorization-requests":
        return item.name.includes('ABC');
      // ... add more type-based filtering if needed
      default:
        return true;
    }
  });
};
