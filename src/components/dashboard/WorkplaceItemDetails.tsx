
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WorkplaceItemDetailsProps {
  item: any; // Using any temporarily as we don't have the exact type definition
}

const WorkplaceItemDetails: React.FC<WorkplaceItemDetailsProps> = ({ item }) => {
  const fields = [
    { label: "ID", key: "id" },
    { label: "İşyeri Adı", key: "isyeriAdi" },
    { label: "Bağlı Olduğu Şube", key: "bagliOlduguSube" },
    { label: "Sorumlu Uzman", key: "sorumluUzman" },
    { label: "İl", key: "il" },
    { label: "İşyeri Türü", key: "isyeriTuru" },
    { label: "SGK No", key: "sgkNo" },
    { label: "İşçi Sayısı", key: "isciSayisi" },
    { label: "Üye Sayısı", key: "uyeSayisi" },
    { label: "İşveren Sendikası", key: "isverenSendikasi" },
    { label: "İhale Adı", key: "ihaleAdi" },
    { label: "Yetki Belgesi Türü", key: "yetkiBelgesiTuru" },
    { label: "Grev Yasağı Durumu", key: "grevYasagiDurumu" },
    { label: "İhale Başlangıç Tarihi", key: "ihaleBaslangicTarihi" },
    { label: "İhale Bitiş Tarihi", key: "ihaleBitisTarihi" },
    { label: "TİS Bitiş Tarihi", key: "tisBitisTarihi" },
    { label: "Yetki Tespit Tarihi", key: "yetkiTespitTarihi" },
    { label: "Yetki Belgesi Tebliğ Tarihi", key: "yetkiBelgesiTebligTarihi" },
    { label: "Çağrı Tarihi", key: "cagriTarihi" },
    { label: "Yer ve Gün Tespit Tarihi", key: "yerVeGunTespitTarihi" },
    { label: "Önceden Belirlenen İlk Oturum Tarihi", key: "oncedenBelirlenenIlkOturumTarihi" },
    { label: "İlk Oturum Tarihi", key: "ilkOturumTarihi" },
    { label: "Uyuşmazlık Tarihi", key: "uyusmazlikTarihi" },
    { label: "Arabulucu Ataması Son Tarih", key: "arabulucuAtamasiSonTarih" },
    { label: "Arabulucu Raporu Tebliğ Tarihi", key: "arabulucuRaporuTebligTarihi" },
    { label: "Grev Kararı Tarihi", key: "grevKarariTarihi" },
    { label: "Grev Oylaması Tarihi", key: "grevOylamasiTarihi" },
    { label: "YHK Gönderim Tarihi", key: "yhkGonderimTarihi" },
    { label: "YHK Hatırlatma", key: "yhkHatirlatma" },
    { label: "İmza Tarihi", key: "imzaTarihi" },
    { label: "TİS Başlangıç Tarihi", key: "tisBaslangicTarihi" },
    { label: "Beklenen Adım", key: "beklenenAdim" },
    { label: "Termin Tarihi", key: "terminTarihi" },
    { label: "Termin Kuralı", key: "terminKurali" },
  ];

  return (
    <ScrollArea className="h-[400px] w-full">
      <Table>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.key}>
              <TableCell className="font-medium w-1/3">{field.label}</TableCell>
              <TableCell>{item[field.key] || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default WorkplaceItemDetails;
