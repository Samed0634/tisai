
export interface ProcedureStatusItem {
  id: string;
  name: string;
  responsibleExpert: string;
  branch: string;
  employeeCount: number;
  memberCount: number;
  currentStatus: string;
  dates: {
    authorizationRequest?: string;
    authorizationNotice?: string;
    callDate?: string;
    firstSession?: string;
    disputeNotice?: string;
    strikeDecision?: string;
    yhkSubmission?: string;
  };
}

// Helper function to determine current status based on dates
const determineCurrentStatus = (dates: ProcedureStatusItem["dates"]): string => {
  if (dates.yhkSubmission) return "YHK'ya Gönderildi";
  if (dates.strikeDecision) return "Grev Kararı Alındı";
  if (dates.disputeNotice) return "Uyuşmazlık Bildirimi Yapıldı";
  if (dates.firstSession) return "Müzakere Sürecinde";
  if (dates.callDate) return "İlk Oturum Bekleniyor";
  if (dates.authorizationNotice) return "Çağrı Bekleniyor";
  if (dates.authorizationRequest) return "Yetki Belgesi Bekleniyor";
  return "Prosedür Başlamadı";
};

// Mock data for workplace procedure status
const procedureStatusMockData: ProcedureStatusItem[] = [
  {
    id: "1",
    name: "ABC İnşaat",
    responsibleExpert: "Mehmet Yılmaz",
    branch: "İstanbul Şubesi",
    employeeCount: 50,
    memberCount: 30,
    currentStatus: "Yetki Belgesi Bekleniyor",
    dates: {
      authorizationRequest: "2025-04-10"
    }
  },
  {
    id: "2",
    name: "XYZ Tekstil",
    responsibleExpert: "Ayşe Demir",
    branch: "Ankara Şubesi",
    employeeCount: 120,
    memberCount: 85,
    currentStatus: "Çağrı Bekleniyor",
    dates: {
      authorizationRequest: "2025-03-15",
      authorizationNotice: "2025-04-01"
    }
  },
  {
    id: "3",
    name: "QWE Gıda",
    responsibleExpert: "Ahmet Can",
    branch: "İzmir Şubesi",
    employeeCount: 80,
    memberCount: 60,
    currentStatus: "İlk Oturum Bekleniyor",
    dates: {
      authorizationRequest: "2025-03-01",
      authorizationNotice: "2025-03-15",
      callDate: "2025-04-01"
    }
  },
  {
    id: "4",
    name: "RTY Metal",
    responsibleExpert: "Elif Kaya",
    branch: "Bursa Şubesi",
    employeeCount: 65,
    memberCount: 45,
    currentStatus: "Müzakere Sürecinde",
    dates: {
      authorizationRequest: "2025-02-15",
      authorizationNotice: "2025-03-01",
      callDate: "2025-03-15",
      firstSession: "2025-04-01"
    }
  },
  {
    id: "5",
    name: "ASD Kimya",
    responsibleExpert: "Canan Yılmaz",
    branch: "Adana Şubesi",
    employeeCount: 95,
    memberCount: 70,
    currentStatus: "Uyuşmazlık Bildirimi Yapıldı",
    dates: {
      authorizationRequest: "2025-01-15",
      authorizationNotice: "2025-02-01",
      callDate: "2025-02-15",
      firstSession: "2025-03-01",
      disputeNotice: "2025-04-01"
    }
  },
  {
    id: "6",
    name: "LKJ İlaç",
    responsibleExpert: "Burak Özkan",
    branch: "İstanbul Şubesi",
    employeeCount: 75,
    memberCount: 50,
    currentStatus: "Grev Kararı Alındı",
    dates: {
      authorizationRequest: "2024-12-01",
      authorizationNotice: "2024-12-15",
      callDate: "2025-01-01",
      firstSession: "2025-01-15",
      disputeNotice: "2025-02-01",
      strikeDecision: "2025-03-01"
    }
  },
  {
    id: "7",
    name: "ZXC Otomotiv",
    responsibleExpert: "Deniz Aydın",
    branch: "Bursa Şubesi",
    employeeCount: 110,
    memberCount: 80,
    currentStatus: "YHK'ya Gönderildi",
    dates: {
      authorizationRequest: "2024-11-01",
      authorizationNotice: "2024-11-15",
      callDate: "2024-12-01",
      firstSession: "2024-12-15",
      disputeNotice: "2025-01-01",
      strikeDecision: "2025-02-01",
      yhkSubmission: "2025-03-01"
    }
  }
];

// Process the mock data to set the current status based on dates
const processedData = procedureStatusMockData.map(item => ({
  ...item,
  currentStatus: determineCurrentStatus(item.dates)
}));

// Export function to get the procedure status data
export const getProcedureStatusData = (): ProcedureStatusItem[] => {
  return processedData;
};
