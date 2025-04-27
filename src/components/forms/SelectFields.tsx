
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ilOptions, subeOptions, sendikalarOptions, grevYasagiOptions, isyeriTuruOptions } from "@/constants/formOptions";

interface SelectFieldsProps {
  form: UseFormReturn<any>;
}

export const SelectFields: React.FC<SelectFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="İŞYERİ TÜRÜ"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İşyeri Türü</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="İşyeri Türü Seçiniz" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isyeriTuruOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="İŞYERİNİN BULUNDUĞU İL"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İşyerinin Bulunduğu İl</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="İl Seçiniz" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ilOptions.map((il) => (
                  <SelectItem key={il} value={il}>
                    {il}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="BAĞLI OLDUĞU ŞUBE"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bağlı Olduğu Şube</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Şube Seçiniz" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {subeOptions.map((sube) => (
                  <SelectItem key={sube} value={sube}>
                    {sube}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="İŞVEREN SENDİKASI"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İşveren Sendikası</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="İşveren Sendikası Seçiniz" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sendikalarOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="GREV YASAĞI DURUMU"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grev Yasağı Durumu</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Grev Yasağı Durumu Seçiniz" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {grevYasagiOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
