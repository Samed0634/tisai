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
      eissywebtalep: {
        Row: {
          "Ad ve Soyad": string
          "E-Mail": string | null
          id: number
          İşyeri: string | null
          "Telefon No": number
        }
        Insert: {
          "Ad ve Soyad": string
          "E-Mail"?: string | null
          id?: number
          İşyeri?: string | null
          "Telefon No": number
        }
        Update: {
          "Ad ve Soyad"?: string
          "E-Mail"?: string | null
          id?: number
          İşyeri?: string | null
          "Telefon No"?: number
        }
        Relationships: []
      }
      "İşlem Geçmişi": {
        Row: {
          id: number
          "İşlem Adı": string | null
          "İşlem Yapan Kullanıcı": string | null
          kurum_id: string
          Saat: string | null
          Tarih: string | null
        }
        Insert: {
          id?: number
          "İşlem Adı"?: string | null
          "İşlem Yapan Kullanıcı"?: string | null
          kurum_id: string
          Saat?: string | null
          Tarih?: string | null
        }
        Update: {
          id?: number
          "İşlem Adı"?: string | null
          "İşlem Yapan Kullanıcı"?: string | null
          kurum_id?: string
          Saat?: string | null
          Tarih?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "İşlem Geçmişi_kurum_id_fkey"
            columns: ["kurum_id"]
            isOneToOne: false
            referencedRelation: "kurumlar"
            referencedColumns: ["id"]
          },
        ]
      }
      isyerleri: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
          ID: number
          "İHALE ADI": string | null
          "İHALE BAŞLANGIÇ TARİHİ": string | null
          "İHALE BİTİŞ TARİHİ": string | null
          "İLK OTURUM TARİHİ": string | null
          "İŞÇİ SAYISI": number | null
          "İŞVEREN SENDİKASI": string | null
          "İŞYERİ ADI": string | null
          "İŞYERİ TÜRÜ": string | null
          "İŞYERİNİN BULUNDUĞU İL": string | null
          kurum_id: string
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          tis_url: string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          ID?: number
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          kurum_id: string
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          tis_url?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
          ID?: number
          "İHALE ADI"?: string | null
          "İHALE BAŞLANGIÇ TARİHİ"?: string | null
          "İHALE BİTİŞ TARİHİ"?: string | null
          "İLK OTURUM TARİHİ"?: string | null
          "İŞÇİ SAYISI"?: number | null
          "İŞVEREN SENDİKASI"?: string | null
          "İŞYERİ ADI"?: string | null
          "İŞYERİ TÜRÜ"?: string | null
          "İŞYERİNİN BULUNDUĞU İL"?: string | null
          kurum_id?: string
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          tis_url?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "isyerleri_kurum_id_fkey"
            columns: ["kurum_id"]
            isOneToOne: false
            referencedRelation: "kurumlar"
            referencedColumns: ["id"]
          },
        ]
      }
      kullanici_kurumlar: {
        Row: {
          baglanti_tarihi: string
          id: string
          kurum_id: string
          user_id: string
        }
        Insert: {
          baglanti_tarihi?: string
          id?: string
          kurum_id?: string
          user_id?: string
        }
        Update: {
          baglanti_tarihi?: string
          id?: string
          kurum_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kullanici_kurumlar_kurum_id_fkey"
            columns: ["kurum_id"]
            isOneToOne: false
            referencedRelation: "kurumlar"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kullanici_kurumlar_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "expired_trial_users"
            referencedColumns: ["id"]
          },
        ]
      }
      kurumlar: {
        Row: {
          adres: string | null
          email: string | null
          id: string
          kayit_token: string
          kurum_adi: string
          telefon: string | null
          token_aktif_mi: boolean
        }
        Insert: {
          adres?: string | null
          email?: string | null
          id?: string
          kayit_token: string
          kurum_adi: string
          telefon?: string | null
          token_aktif_mi: boolean
        }
        Update: {
          adres?: string | null
          email?: string | null
          id?: string
          kayit_token?: string
          kurum_adi?: string
          telefon?: string | null
          token_aktif_mi?: boolean
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscribers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "expired_trial_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      çağrı_yapılacak_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      expired_trial_users: {
        Row: {
          account_age: unknown | null
          created_at: string | null
          email: string | null
          id: string | null
          trial_expired: boolean | null
        }
        Relationships: []
      }
      grev_kararı_alınması_gereken_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      grev_oylaması_yapılması_gereken_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      grev_yasağı_olan_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      ilk_oturum_tutulması_gereken_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      imzalanan_tisler_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      müzakere_süresi_dolan_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      önceden_belirlenen_ilk_oturum_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      uyuşmazlık_bildirimi_yapılması_gereken_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      yer_ve_gün_tespit_tarihli_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      yetki_belgesi_tebliğ_yapılan_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      yetki_tespit_istenecek_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
      yhk_gönderim_gereken_view: {
        Row: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ": string | null
          "BAĞLI OLDUĞU ŞUBE": string | null
          "ÇAĞRI TARİHİ": string | null
          durum: string | null
          "FİİLİ GREV KARARI TARİHİ": string | null
          "GREV KARARI TARİHİ": string | null
          "GREV OYLAMASI TARİHİ": string | null
          "GREV YASAĞI DURUMU": string | null
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
          "MÜZAKERE SÜRESİ SON TARİH": string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ": string | null
          "SGK NO": string | null
          "SORUMLU UZMAN": string | null
          sure_bilgisi: string | null
          "TİS BAŞLANGIÇ TARİHİ": string | null
          "TİS BİTİŞ TARİHİ": string | null
          "TİS GELİŞ TARİHİ": string | null
          "TİS İMZA TARİHİ": string | null
          updated_at: string | null
          "ÜYE SAYISI": number | null
          "UYUŞMAZLIK TARİHİ": string | null
          "YER VE GÜN TESPİT TARİHİ": string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ": string | null
          "YETKİ TESPİT İSTEM TARİHİ": string | null
          "YHK GÖNDERİM TARİHİ": string | null
        }
        Insert: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Update: {
          "ARABULUCU RAPORU TEBLİĞ TARİHİ"?: string | null
          "BAĞLI OLDUĞU ŞUBE"?: string | null
          "ÇAĞRI TARİHİ"?: string | null
          durum?: string | null
          "FİİLİ GREV KARARI TARİHİ"?: string | null
          "GREV KARARI TARİHİ"?: string | null
          "GREV OYLAMASI TARİHİ"?: string | null
          "GREV YASAĞI DURUMU"?: string | null
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
          "MÜZAKERE SÜRESİ SON TARİH"?: string | null
          "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"?: string | null
          "SGK NO"?: string | null
          "SORUMLU UZMAN"?: string | null
          sure_bilgisi?: never
          "TİS BAŞLANGIÇ TARİHİ"?: string | null
          "TİS BİTİŞ TARİHİ"?: string | null
          "TİS GELİŞ TARİHİ"?: string | null
          "TİS İMZA TARİHİ"?: string | null
          updated_at?: string | null
          "ÜYE SAYISI"?: number | null
          "UYUŞMAZLIK TARİHİ"?: string | null
          "YER VE GÜN TESPİT TARİHİ"?: string | null
          "YETKİ BELGESİ TEBLİĞ TARİHİ"?: string | null
          "YETKİ TESPİT İSTEM TARİHİ"?: string | null
          "YHK GÖNDERİM TARİHİ"?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      handle_expired_trial_users: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      has_trial_expired: {
        Args: { user_id: string }
        Returns: boolean
      }
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
