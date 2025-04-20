
export type ColumnType = {
  id: string;
  title: string;
  fixed?: boolean;
};

export const COLUMNS: ColumnType[] = [
  { id: 'id', title: 'ID' },
  { id: 'name', title: 'İşyeri Adı' },
  { id: 'branch', title: 'Bağlı Olduğu Şube' },
  { id: 'responsibleExpert', title: 'Sorumlu Uzman' },
  { id: 'province', title: 'İl' },
  { id: 'workplaceType', title: 'İşyeri Türü' },
  { id: 'sgkNo', title: 'SGK No' },
  { id: 'employeeCount', title: 'İşçi Sayısı' },
  { id: 'memberCount', title: 'Üye Sayısı' },
  { id: 'employerUnion', title: 'İşveren Sendikası' },
  { id: 'tenderName', title: 'İhale Adı' },
  { id: 'authorizationType', title: 'Yetki Belgesi Türü' },
  { id: 'strikeStatus', title: 'Grev Yasağı Durumu' },
  { id: 'tenderStartDate', title: 'İhale Başlangıç Tarihi' },
  { id: 'tenderEndDate', title: 'İhale Bitiş Tarihi' },
  { id: 'tisEndDate', title: 'TİS Bitiş Tarihi' },
  { id: 'authorizationDate', title: 'Yetki Tespit Tarihi' },
  { id: 'authorizationNoticeDate', title: 'Yetki Belgesi Tebliğ Tarihi' },
  { id: 'callDate', title: 'Çağrı Tarihi' },
  { id: 'placeAndDateDetermination', title: 'Yer ve Gün Tespit Tarihi' },
  { id: 'predeterminedFirstSession', title: 'Önceden Belirlenen İlk Oturum Tarihi' },
  { id: 'firstSessionDate', title: 'İlk Oturum Tarihi' },
  { id: 'disputeDate', title: 'Uyuşmazlık Tarihi' },
  { id: 'mediatorDeadline', title: 'Arabulucu Ataması Son Tarih' },
  { id: 'mediatorReportDate', title: 'Arabulucu Raporu Tebliğ Tarihi' },
  { id: 'strikeDecisionDate', title: 'Grev Kararı Tarihi' },
  { id: 'strikeVotingDate', title: 'Grev Oylaması Tarihi' },
  { id: 'yhkSubmissionDate', title: 'YHK Gönderim Tarihi' },
  { id: 'yhkReminder', title: 'YHK Hatırlatma' },
  { id: 'signDate', title: 'İmza Tarihi' },
  { id: 'tisStartDate', title: 'TİS Başlangıç Tarihi' },
  { id: 'expectedStep', title: 'Beklenen Adım' },
  { id: 'deadlineDate', title: 'Termin Tarihi' },
  { id: 'deadlineRule', title: 'Termin Kuralı' }
];

