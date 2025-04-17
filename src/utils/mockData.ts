
// Mock data for different categories - In real app, this would come from API
export const generateMockData = (type: string) => {
  const baseData = [
    { 
      id: 1, 
      name: "ABC İşyeri", 
      responsibleExpert: "Ahmet Yılmaz",
      branch: "İstanbul Şubesi",
      sgkNo: "12345678901", 
      employeeCount: 25, 
      memberCount: 15, 
      status: "İşlem Bekliyor" 
    },
    { 
      id: 2, 
      name: "DEF İşyeri", 
      responsibleExpert: "Mehmet Demir",
      branch: "Ankara Şubesi",
      sgkNo: "23456789012", 
      employeeCount: 40, 
      memberCount: 20, 
      status: "İşlem Bekliyor" 
    },
    { 
      id: 3, 
      name: "GHI İşyeri", 
      responsibleExpert: "Ayşe Kaya",
      branch: "İzmir Şubesi",
      sgkNo: "34567890123", 
      employeeCount: 15, 
      memberCount: 8, 
      status: "İşlem Bekliyor" 
    },
    { 
      id: 4, 
      name: "JKL İşyeri", 
      responsibleExpert: "Fatma Şahin",
      branch: "Bursa Şubesi",
      sgkNo: "45678901234", 
      employeeCount: 60, 
      memberCount: 35, 
      status: "İşlem Bekliyor" 
    },
    { 
      id: 5, 
      name: "MNO İşyeri", 
      responsibleExpert: "Mustafa Kurt",
      branch: "Adana Şubesi",
      sgkNo: "56789012345", 
      employeeCount: 30, 
      memberCount: 18, 
      status: "İşlem Bekliyor" 
    },
  ];
  
  return baseData;
};

// Map category IDs to their titles
export const categoryTitles = {
  "authorization-requests": "Yetki Tespiti İstenecek İşyerleri",
  "authorization-notices": "Yetki Belgesi Tebliğ Yapılan İşyerleri",
  "call-required": "Çağrı Yapılacak İşyerleri",
  "first-session": "İlk Oturum Tutulması Gereken İşyerleri",
  "dispute-notices": "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri",
  "strike-decisions": "Grev Kararı Alınması Gereken İşyerleri",
  "yhk-submissions": "YHK'ya Gönderilmesi Gereken İşyerleri",
  "calls": "Haftalık Çağrı Yapılması Gereken İşyerleri",
  "sessions": "Haftalık İlk Oturum Tutulacak İşyerleri",
  "daily": "Günlük İşyerleri"
};

export type WorkplaceItem = {
  id: number;
  name: string;
  responsibleExpert: string;
  branch: string;
  sgkNo: string;
  employeeCount: number;
  memberCount: number;
  status: string;
};
