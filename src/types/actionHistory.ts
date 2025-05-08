
export interface ActionHistory {
  id: number;
  "İşlem Adı": string;
  "Tarih": string;
  "Saat": string;
  "İşlem Yapan Kullanıcı": string;
  kurum_id?: string; // Optional and won't be displayed
}
