
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { DateField } from "./DateField";

interface DateFieldsProps {
  form: UseFormReturn<any>;
}

export const DateFields: React.FC<DateFieldsProps> = ({ form }) => {
  return (
    <>
      <DateField
        form={form}
        name="YETKİ TESPİT İSTEM TARİHİ"
        label="Yetki Tespit İstem Tarihi"
      />
      <DateField
        form={form}
        name="YETKİ BELGESİ TEBLİĞ TARİHİ"
        label="Yetki Belgesi Tebliğ Tarihi"
      />
    </>
  );
};
