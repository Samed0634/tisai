
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Supabase'e gönderilecek veri türü dönüşümleri için yardımcı fonksiyonlar
export const formatSupabaseValue = (value: any, type: string): any => {
  if (value === '' || value === undefined) return null;
  
  switch (type) {
    case 'number':
      return Number(value) || null;
    case 'boolean':
      return value === 'true' || value === true;
    case 'date':
      // Tarih değerini ISO formatına dönüştür
      if (value instanceof Date) {
        return value.toISOString();
      }
      // Eğer string ise ve geçerli bir tarih ise
      if (typeof value === 'string' && !isNaN(Date.parse(value))) {
        return new Date(value).toISOString();
      }
      return null;
    default:
      return value;
  }
};

// Form değişikliklerini Supabase'e yansıtan hook
export const useFormToSupabase = () => {
  const { toast } = useToast();

  // Form elemanları ile Supabase sütunları arasındaki eşleşme
  const columnMappings = new Map([
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

  // data-db-column attribute'ları için eşleşme
  const getColumnMappingByDataAttribute = (dataDbColumn: string) => {
    // Burada data-db-column değerlerini Supabase sütun adlarına eşleştiriyoruz
    const mapping: Record<string, { column: string; type: string }> = {
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

    return mapping[dataDbColumn];
  };

  // Form değişikliklerini işleyecek fonksiyon
  const handleInputChange = async (
    event: Event,
    workplaceId: number
  ) => {
    try {
      if (!workplaceId) {
        console.error("İşyeri ID'si belirtilmedi.");
        return false;
      }

      const target = event.target as HTMLElement;
      let columnInfo;

      // Önce data-db-column attribute'una bakıyoruz
      if (target.hasAttribute('data-db-column')) {
        const dataDbColumn = target.getAttribute('data-db-column');
        if (dataDbColumn) {
          columnInfo = getColumnMappingByDataAttribute(dataDbColumn);
        }
      } 
      
      // data-db-column yoksa, id'ye göre eşleşmeyi kontrol ediyoruz
      if (!columnInfo && target.id) {
        columnInfo = columnMappings.get(target.id);
      }

      if (!columnInfo) {
        console.warn(`Bu alan için sütun eşleşmesi bulunamadı: ${target.id || 'Bilinmeyen alan'}`);
        return false;
      }

      let value;
      
      // Input tipine göre değer alımı
      if (target instanceof HTMLInputElement) {
        if (target.type === 'checkbox') {
          value = target.checked;
        } else if (target.type === 'date') {
          value = target.value ? target.value : null; // YYYY-MM-DD formatında
        } else {
          value = target.value;
        }
      } else if (target instanceof HTMLSelectElement) {
        value = target.value;
      } else if (target instanceof HTMLTextAreaElement) {
        value = target.value;
      } else {
        console.warn("Desteklenmeyen element tipi:", target.tagName);
        return false;
      }

      // Supabase değer formatını ayarla
      const formattedValue = formatSupabaseValue(value, columnInfo.type);
      
      // Supabase'e kayıt güncelleme
      await updateSupabaseRecord(workplaceId, columnInfo.column, formattedValue);
      return true;
    } catch (error) {
      console.error("Form değişikliği işlenirken hata:", error);
      toast({
        title: "Hata",
        description: "Veri güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Supabase'e kayıt güncelleme fonksiyonu
  const updateSupabaseRecord = async (
    workplaceId: number,
    column: string,
    value: any
  ) => {
    try {
      console.log(`ID ${workplaceId} için '${column}' sütunu güncelleniyor:`, value);
      
      const updateData = { [column]: value };
      
      const { data, error } = await supabase
        .from('isyerleri')
        .update(updateData)
        .eq('ID', workplaceId)
        .select();
        
      if (error) {
        throw error;
      }

      console.log(`${column} başarıyla güncellendi:`, data);
      return data;
    } catch (error) {
      console.error(`${column} güncellenirken hata:`, error);
      throw error;
    }
  };

  // Form elemanlarına event listener ekleyen fonksiyon
  const setupFormListeners = (formElementSelector: string, workplaceId: number) => {
    const form = document.querySelector(formElementSelector);
    
    if (!form) {
      console.error(`Form bulunamadı: ${formElementSelector}`);
      return;
    }

    // HTML form elemanlarına olay dinleyicileri ekle
    const attachListenersToFormElements = () => {
      const inputs = form.querySelectorAll('input, select, textarea');
      
      inputs.forEach(input => {
        // Girdi türüne göre uygun event listener ekle
        if (input instanceof HTMLInputElement && input.type === 'checkbox') {
          input.addEventListener('change', (e) => handleInputChange(e, workplaceId));
        } else if (input instanceof HTMLSelectElement) {
          input.addEventListener('change', (e) => handleInputChange(e, workplaceId));
        } else {
          // Text, number, date, vb. için blur (odak kaybı) olayını kullan
          input.addEventListener('blur', (e) => handleInputChange(e, workplaceId));
        }
      });

      console.log(`${inputs.length} form elemanına event listener eklendi.`);
    };

    // Sayfa yüklendiğinde event listener'ları ekle
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachListenersToFormElements);
    } else {
      attachListenersToFormElements();
    }
  };

  return {
    handleInputChange,
    updateSupabaseRecord,
    setupFormListeners
  };
};
