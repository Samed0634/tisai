
export const useDefaultColumns = (tableType: string, defaultColumns?: string[]): string[] => {
  if (defaultColumns) {
    return defaultColumns;
  }
  
  switch (tableType) {
    case "oylamaColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV OYLAMASI TARİHİ"];
    case "cagriColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "ÇAĞRI TARİHİ"];
    case "yetkiTespitColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YETKİ BELGESİ TEBLİĞ TARİHİ"];
    case "yetkiBelgesiColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI"];
    case "yerGunTespitColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI"];
    case "oncedenBelirlenenColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ"];
    case "ilkOturumColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İLK OTURUM TARİHİ"];
    case "muzakereSuresiColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "MÜZAKERE SÜRESİ SON TARİH"];
    case "uyusmazlikColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "UYUŞMAZLIK TARİHİ"];
    case "yhkColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YHK GÖNDERİM TARİHİ"];
    case "imzalananTislerColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "TİS GELİŞ TARİHİ"];
    case "grevYasakiColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI"];
    case "grevKarariColumns":
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV KARARI TARİHİ"];
    default:
      return ["durum", "sure_bilgisi", "SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI"];
  }
};
