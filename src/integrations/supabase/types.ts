export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      isyerleri: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      arabulucu_atamasi_son_tarih_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      cagri_yapilacaklar_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      grev_karari_alinmasi_gerekenler_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      grev_oylamasi_yapilmasi_gerekenler_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      grev_yasagi_olanlar_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      ilk_oturum_tutulmasi_gerekenler_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      imzalananlar_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      müzakere_süresi_dolanlar_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      onceden_belirlenen_ilk_oturumlar_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      sona_erecekler_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          remaining_days: number | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          remaining_days?: never
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          remaining_days?: never
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      uyu_bil_yap_gerekenler_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      yer_gun_tespitliler_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      yetki_belgesi_teblig_yapilan_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      yetki_tespit_istenecek_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      yhk_gonderim_gerekenler_v: {
        Row: {
          "60.GÜN DOLAN İŞYERLERİ": string | null
          ARABULUCU: string | null
          "ARABULUCU ATANMA TARİHİ": string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "ARABULUCU TOPLANTI TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ": string | null
          ID: number | null
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SON DURUM": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ BELGESİ TÜRÜ": string | null
          "YETKİ DURUMU": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "60.GÜN DOLAN İŞYERLERİ"?: string | null
          ARABULUCU?: string | null
          "ARABULUCU ATANMA TARİHİ"?: string | null
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "ARABULUCU TOPLANTI TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ"?: string | null
          ID?: number | null
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SON DURUM"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ BELGESİ TÜRÜ"?: string | null
          "YETKİ DURUMU"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
