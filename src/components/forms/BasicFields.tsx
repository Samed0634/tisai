
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface BasicFieldsProps {
  form: UseFormReturn<any>;
}

export const BasicFields: React.FC<BasicFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="SORUMLU UZMAN"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sorumlu Uzman</FormLabel>
            <FormControl>
              <Input placeholder="Sorumlu uzman adını giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="İŞYERİ ADI"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İşyeri Adı</FormLabel>
            <FormControl>
              <Input placeholder="İşyeri adını giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="SGK NO"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SGK Numarası</FormLabel>
            <FormControl>
              <Input placeholder="SGK numarasını giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="İŞÇİ SAYISI"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İşçi Sayısı</FormLabel>
            <FormControl>
              <Input type="number" placeholder="İşçi sayısını giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ÜYE SAYISI"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Üye Sayısı</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Üye sayısını giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
