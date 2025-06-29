
// Column mappings for form fields to database columns
export const columnMappings = new Map([
  // Standart metin alanları
  ['isyeri-turu-select', { column: 'İŞYERİ TÜRÜ', type: 'text' }],
  ['sorumlu-uzman-input', { column: 'SORUMLU UZMAN', type: 'text' }],
  ['isyeri-ili-select', { column: 'İŞYERİNİN BULUNDUĞU İL', type: 'text' }],
  ['sube-select', { column: 'BAĞLI OLDUĞU ŞUBE', type: 'text' }],
  ['isyeri-adi-input', { column: 'İŞYERİ ADI', type: 'text' }],
  ['sgk-no-input', { column: 'SGK NO', type: 'text' }],
  ['isveren-sendikasi-input', { column: 'İŞVEREN SENDİKASI', type: 'text' }],
  ['ihale-adi-input', { column: 'İHALE ADI', type: 'text' }],
  
  // Sayısal alanlar
  ['isci-sayisi-input', { column: 'İŞÇİ SAYISI', type: 'number' }],
  ['uye-sayisi-input', { column: 'ÜYE SAYISI', type: 'number' }],
  
  // Boolean alanlar
  ['grev-yasagi-checkbox', { column: 'GREV YASAĞI DURUMU', type: 'boolean' }],
  
  // Tarih alanları
  ['ihale-baslangic-tarihi', { column: 'İHALE BAŞLANGIÇ TARİHİ', type: 'date' }],
  ['ihale-bitis-tarihi', { column: 'İHALE BİTİŞ TARİHİ', type: 'date' }],
  ['yetki-tespit-istem-tarihi', { column: 'YETKİ TESPİT İSTEM TARİHİ', type: 'date' }],
  ['yetki-belgesi-teblig-tarihi', { column: 'YETKİ BELGESİ TEBLİĞ TARİHİ', type: 'date' }],
  ['cagri-tarihi', { column: 'ÇAĞRI TARİHİ', type: 'date' }],
  ['yer-gun-tespit-tarihi', { column: 'YER VE GÜN TESPİT TARİHİ', type: 'date' }],
  ['onceden-belirlenen-ilk-oturum-tarihi', { column: 'ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ', type: 'date' }],
  ['ilk-oturum-tarihi', { column: 'İLK OTURUM TARİHİ', type: 'date' }],
  ['muzakere-suresi-son-tarih', { column: 'MÜZAKERE SÜRESİ SON TARİH', type: 'date' }],
  ['uyusmazlik-tarihi', { column: 'UYUŞMAZLIK TARİHİ', type: 'date' }],
  ['arabulucu-raporu-teblig-tarihi', { column: 'ARABULUCU RAPORU TEBLİĞ TARİHİ', type: 'date' }],
  ['grev-karari-tarihi', { column: 'GREV KARARI TARİHİ', type: 'date' }],
  ['fiili-grev-karari-tarihi', { column: 'FİİLİ GREV KARARI TARİHİ', type: 'date' }],
  ['grev-oylamasi-tarihi', { column: 'GREV OYLAMASI TARİHİ', type: 'date' }],
  ['yhk-gonderim-tarihi', { column: 'YHK GÖNDERİM TARİHİ', type: 'date' }],
  ['tis-gelis-tarihi', { column: 'TİS GELİŞ TARİHİ', type: 'date' }],
  ['tis-imza-tarihi', { column: 'TİS İMZA TARİHİ', type: 'date' }],
  ['tis-baslangic-tarihi', { column: 'TİS BAŞLANGIÇ TARİHİ', type: 'date' }],
  ['tis-bitis-tarihi', { column: 'TİS BİTİŞ TARİHİ', type: 'date' }],
]);

// Data attribute to column mappings
export const dataAttributeColumnMappings: Record<string, { column: string; type: string }> = {
  'isyeri_turu': { column: 'İŞYERİ TÜRÜ', type: 'text' },
  'sorumlu_uzman': { column: 'SORUMLU UZMAN', type: 'text' },
  'isyeri_ili': { column: 'İŞYERİNİN BULUNDUĞU İL', type: 'text' },
  'bagli_sube': { column: 'BAĞLI OLDUĞU ŞUBE', type: 'text' },
  'isyeri_adi': { column: 'İŞYERİ ADI', type: 'text' },
  'sgk_no': { column: 'SGK NO', type: 'text' },
  'isci_sayisi': { column: 'İŞÇİ SAYISI', type: 'number' },
  'uye_sayisi': { column: 'ÜYE SAYISI', type: 'number' },
  'isveren_sendikasi': { column: 'İŞVEREN SENDİKASI', type: 'text' },
  'grev_yasagi_durumu': { column: 'GREV YASAĞI DURUMU', type: 'boolean' },
  'ihale_adi': { column: 'İHALE ADI', type: 'text' },
  'ihale_baslangic_tarihi': { column: 'İHALE BAŞLANGIÇ TARİHİ', type: 'date' },
  'ihale_bitis_tarihi': { column: 'İHALE BİTİŞ TARİHİ', type: 'date' },
  'yetki_tespit_istem_tarihi': { column: 'YETKİ TESPİT İSTEM TARİHİ', type: 'date' },
  'yetki_belgesi_teblig_tarihi': { column: 'YETKİ BELGESİ TEBLİĞ TARİHİ', type: 'date' },
  'cagri_tarihi': { column: 'ÇAĞRI TARİHİ', type: 'date' },
  'yer_gun_tespit_tarihi': { column: 'YER VE GÜN TESPİT TARİHİ', type: 'date' },
  'onceden_belirlenen_ilk_oturum_tarihi': { column: 'ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ', type: 'date' },
  'ilk_oturum_tarihi': { column: 'İLK OTURUM TARİHİ', type: 'date' },
  'muzakere_suresi_son_tarih': { column: 'MÜZAKERE SÜRESİ SON TARİH', type: 'date' },
  'uyusmazlik_tarihi': { column: 'UYUŞMAZLIK TARİHİ', type: 'date' },
  'arabulucu_raporu_teblig_tarihi': { column: 'ARABULUCU RAPORU TEBLİĞ TARİHİ', type: 'date' },
  'grev_karari_tarihi': { column: 'GREV KARARI TARİHİ', type: 'date' },
  'fiili_grev_karari_tarihi': { column: 'FİİLİ GREV KARARI TARİHİ', type: 'date' },
  'grev_oylamasi_tarihi': { column: 'GREV OYLAMASI TARİHİ', type: 'date' },
  'yhk_gonderim_tarihi': { column: 'YHK GÖNDERİM TARİHİ', type: 'date' },
  'tis_gelis_tarihi': { column: 'TİS GELİŞ TARİHİ', type: 'date' },
  'tis_imza_tarihi': { column: 'TİS İMZA TARİHİ', type: 'date' },
  'tis_baslangic_tarihi': { column: 'TİS BAŞLANGIÇ TARİHİ', type: 'date' },
  'tis_bitis_tarihi': { column: 'TİS BİTİŞ TARİHİ', type: 'date' },
};

// Helper function to convert Turkish field names to database column format
export const getDataDbColumn = (fieldName: string) => {
  return fieldName.toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/\s+/g, '_');
};
