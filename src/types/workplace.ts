
export interface Workplace {
  ID: number;
  "İŞYERİ TÜRÜ": string | null;
  "SORUMLU UZMAN": string | null;
  "İŞYERİNİN BULUNDUĞU İL": string | null;
  "BAĞLI OLDUĞU ŞUBE": string | null;
  "İŞYERİ ADI": string | null;
  "SGK NO": string | null;
  "İŞÇİ SAYISI": number | null;
  "ÜYE SAYISI": number | null;
  "İŞVEREN SENDİKASI": string | null;
  "GREV YASAĞI DURUMU": string | null;
  "İHALE ADI": string | null;
  "İHALE BAŞLANGIÇ TARİHİ": string | null;
  "İHALE BİTİŞ TARİHİ": string | null;
  "YETKİ TESPİT İSTEM TARİHİ": string | null;
  "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null;
  "ÇAĞRI TARİHİ": string | null;
  "YER VE GÜN TESPİT TARİHİ": string | null;
  "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null;
  "İLK OTURUM TARİHİ": string | null;
  "MÜZAKERE SÜRESİ SON TARİH": string | null;
  "UYUŞMAZLIK TARİHİ": string | null;
  "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null;
  "GREV KARARI TARİHİ": string | null;
  "FİİLİ GREV KARARI TARİHİ": string | null;
  "GREV OYLAMASI TARİHİ": string | null;
  "YHK GÖNDERİM TARİHİ": string | null;
  "TİS GELİŞ TARİHİ": string | null;
  "TİS İMZA TARİHİ": string | null;
  "TİS BAŞLANGIÇ TARİHİ": string | null;
  "TİS BİTİŞ TARİHİ": string | null;
  "durum": string | null;
  "updated_at": string | null;
  [key: string]: any;
}
