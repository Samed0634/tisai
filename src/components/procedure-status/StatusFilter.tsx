
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export type StatusOption = {
  value: string;
  label: string;
};

const STATUS_OPTIONS: StatusOption[] = [
  { value: "YETKİ BELGESİ BEKLENİYOR", label: "Yetki Belgesi Bekleniyor" },
  { value: "ÇAĞRI YAPILMASI BEKLENİYOR", label: "Çağrı Yapılması Bekleniyor" },
  { value: "İLK OTURUM BEKLENİYOR", label: "İlk Oturum Bekleniyor" },
  { value: "MÜZAKERE SÜRESİNDE", label: "Müzakere Süresinde" },
  { value: "UYUŞMAZLIK İÇİN BEKLENİYOR", label: "Uyuşmazlık İçin Bekleniyor" },
  { value: "ARABULUCU RAPORU BEKLENİYOR", label: "Arabulucu Raporu Bekleniyor" },
  { value: "GREV KARARI AŞAMASINDA", label: "Grev Kararı Aşamasında" },
  { value: "GREV OYLAMASI BEKLENİYOR", label: "Grev Oylaması Bekleniyor" },
  { value: "YHK'YA GÖNDERİLMESİ BEKLENİYOR", label: "YHK'ya Gönderilmesi Bekleniyor" },
  { value: "TİS İMZALANDI", label: "TİS İmzalandı" },
];

interface StatusFilterProps {
  selectedStatuses: string[];
  onChange: (statuses: string[]) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatuses,
  onChange,
}) => {
  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onChange(selectedStatuses.filter(s => s !== status));
    } else {
      onChange([...selectedStatuses, status]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md border shadow-sm">
      <h3 className="text-lg font-medium mb-3">Durum Filtresi</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {STATUS_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`status-${option.value}`}
              checked={selectedStatuses.includes(option.value)}
              onCheckedChange={() => toggleStatus(option.value)}
            />
            <Label
              htmlFor={`status-${option.value}`}
              className="text-sm cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
