
import { useToast } from "@/hooks/use-toast";
import { handleFormElementChange, updateSupabaseRecord } from "./supabaseUpdater";

// Form değişikliklerini Supabase'e yansıtan hook
export const useFormToSupabase = () => {
  const { toast } = useToast();

  // Form elemanlarına event listener ekleyen fonksiyon
  const setupFormListeners = (formElementSelector: string, workplaceId: number) => {
    const form = document.querySelector(formElementSelector);
    
    if (!form) {
      console.error(`Form bulunamadı: ${formElementSelector}`);
      return;
    }

    // HTML form elemanlarına olay dinleyicileri ekle
    const attachListenersToFormElements = () => {
      const inputs = form.querySelectorAll('input, select, textarea');
      
      inputs.forEach(input => {
        // Girdi türüne göre uygun event listener ekle
        if (input instanceof HTMLInputElement && input.type === 'checkbox') {
          input.addEventListener('change', (e) => handleFormElementChange(e, workplaceId));
        } else if (input instanceof HTMLSelectElement) {
          input.addEventListener('change', (e) => handleFormElementChange(e, workplaceId));
        } else {
          // Text, number, date, vb. için blur (odak kaybı) olayını kullan
          input.addEventListener('blur', (e) => handleFormElementChange(e, workplaceId));
        }
      });

      console.log(`${inputs.length} form elemanına event listener eklendi.`);
    };

    // Sayfa yüklendiğinde event listener'ları ekle
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachListenersToFormElements);
    } else {
      attachListenersToFormElements();
    }
  };

  // Form değişikliklerini işleyecek fonksiyon
  const handleInputChange = async (event: Event, workplaceId: number) => {
    try {
      const success = await handleFormElementChange(event, workplaceId);
      if (!success) {
        toast({
          title: "Hata",
          description: "Veri güncellenirken bir hata oluştu.",
          variant: "destructive",
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error("Form değişikliği işlenirken hata:", error);
      toast({
        title: "Hata",
        description: "Veri güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    handleInputChange,
    updateSupabaseRecord,
    setupFormListeners
  };
};
