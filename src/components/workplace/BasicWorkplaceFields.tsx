
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";
import { WorkplaceFormValues } from "@/schemas/workplaceFormSchema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface BasicWorkplaceFieldsProps {
  control: Control<WorkplaceFormValues>;
  onWorkplaceTypeChange: (value: string) => void;
}

export const BasicWorkplaceFields = ({ control, onWorkplaceTypeChange }: BasicWorkplaceFieldsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField
        control={control}
        name="companyName"
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
        control={control}
        name="sgkNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SGK No</FormLabel>
            <FormControl>
              <Input placeholder="SGK numarasını giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="workplaceType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İşyeri Türü</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                onWorkplaceTypeChange(value);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="İşyeri türünü seçiniz" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Kit">KİT</SelectItem>
                <SelectItem value="Belediye">Belediye</SelectItem>
                <SelectItem value="Özel">Özel</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="expert"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sorumlu Uzman</FormLabel>
            <FormControl>
              <Input placeholder="Sorumlu uzmanı giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İşyerinin Bulunduğu İl</FormLabel>
            <FormControl>
              <Input placeholder="İli giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="branch"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bağlı Olduğu Şube</FormLabel>
            <FormControl>
              <Input placeholder="Şubeyi giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="employeeCount"
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
        control={control}
        name="memberCount"
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

      <FormField
        control={control}
        name="employerUnion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İşveren Sendikası</FormLabel>
            <FormControl>
              <Input placeholder="İşveren sendikasını giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="strikeProhibitionStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grev Yasağı Durumu</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Grev yasağı durumunu seçiniz" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Var">Var</SelectItem>
                <SelectItem value="Yok">Yok</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="authDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Yetki Belgesi Tebliğ Tarihi</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Tarih Seçin</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
