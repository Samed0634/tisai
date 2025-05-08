
export type ColumnType = {
  id: string;
  title: string;
  editable?: boolean;
  fixed?: boolean;
};

export const COLUMNS: ColumnType[] = [
  { id: 'ID', title: 'ID', fixed: true },
  { id: 'İŞYERİ TÜRÜ', title: 'İŞYERİ TÜRÜ' },
  { id: 'SORUMLU UZMAN', title: 'SORUMLU UZMAN' },
  { id: 'İŞYERİNİN BULUNDUĞU İL', title: 'İŞYERİNİN BULUNDUĞU İL' },
  { id: 'BAĞLI OLDUĞU ŞUBE', title: 'BAĞLI OLDUĞU ŞUBE' },
  { id: 'İŞYERİ ADI', title: 'İŞYERİ ADI', fixed: true },
  { id: 'SGK NO', title: 'SGK NO' },
  { id: 'İŞÇİ SAYISI', title: 'İŞÇİ SAYISI' },
  { id: 'ÜYE SAYISI', title: 'ÜYE SAYISI' },
  { id: 'İŞVEREN SENDİKASI', title: 'İŞVEREN SENDİKASI' },
  { id: 'GREV YASAĞI DURUMU', title: 'GREV YASAĞI DURUMU', editable: true },
  { id: 'İHALE ADI', title: 'İHALE ADI' },
  { id: 'İHALE BAŞLANGIÇ TARİHİ', title: 'İHALE BAŞLANGIÇ TARİHİ' },
  { id: 'İHALE BİTİŞ TARİHİ', title: 'İHALE BİTİŞ TARİHİ' },
  { id: 'YETKİ TESPİT İSTEM TARİHİ', title: 'YETKİ TESPİT İSTEM TARİHİ' },
  { id: 'YETKİ BELGESİ TEBLİĞ TARİHİ', title: 'YETKİ BELGESİ TEBLİĞ TARİHİ', editable: true },
  { id: 'ÇAĞRI TARİHİ', title: 'ÇAĞRI TARİHİ', editable: true },
  { id: 'YER VE GÜN TESPİT TARİHİ', title: 'YER VE GÜN TESPİT TARİHİ', editable: true },
  { id: 'ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ', title: 'ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ' },
  { id: 'İLK OTURUM TARİHİ', title: 'İLK OTURUM TARİHİ', editable: true },
  { id: 'MÜZAKERE SÜRESİ SON TARİH', title: 'MÜZAKERE SÜRESİ SON TARİH' },
  { id: 'UYUŞMAZLIK TARİHİ', title: 'UYUŞMAZLIK TARİHİ', editable: true },
  { id: 'ARABULUCU RAPORU TEBLİĞ TARİHİ', title: 'ARABULUCU RAPORU TEBLİĞ TARİHİ' },
  { id: 'GREV KARARI TARİHİ', title: 'GREV KARARI TARİHİ' },
  { id: 'FİİLİ GREV KARARI TARİHİ', title: 'FİİLİ GREV KARARI TARİHİ' },
  { id: 'GREV OYLAMASI TARİHİ', title: 'GREV OYLAMASI TARİHİ', editable: true },
  { id: 'YHK GÖNDERİM TARİHİ', title: 'YHK GÖNDERİM TARİHİ', editable: true },
  { id: 'TİS GELİŞ TARİHİ', title: 'TİS GELİŞ TARİHİ', editable: true },
  { id: 'TİS İMZA TARİHİ', title: 'TİS İMZA TARİHİ' },
  { id: 'TİS BAŞLANGIÇ TARİHİ', title: 'TİS BAŞLANGIÇ TARİHİ' },
  { id: 'TİS BİTİŞ TARİHİ', title: 'TİS BİTİŞ TARİHİ' },
  { id: 'durum', title: 'Durum', editable: true },
  { id: 'sure_bilgisi', title: 'Kalan Süre' }
];
