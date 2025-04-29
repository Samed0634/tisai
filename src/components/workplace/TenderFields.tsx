
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";
import { WorkplaceFormValues } from "@/schemas/workplaceFormSchema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TenderFieldsProps {
  control: Control<WorkplaceFormValues>;
}

export const TenderFields = ({ control }: TenderFieldsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField
        control={control}
        name="tenderName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İhale Adı</FormLabel>
            <FormControl>
              <Input placeholder="İhale adını giriniz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tenderStartDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>İhale Başlangıç Tarihi</FormLabel>
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
                      format(field.value, "PPP", { locale: tr })
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
                  disabled={(date) => date < new Date("1900-01-01")}
                  initialFocus
                  className="pointer-events-auto"
                  locale={tr}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tenderEndDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>İhale Bitiş Tarihi</FormLabel>
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
                      format(field.value, "PPP", { locale: tr })
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
                  disabled={(date) => date < new Date("1900-01-01")}
                  initialFocus
                  className="pointer-events-auto"
                  locale={tr}
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
