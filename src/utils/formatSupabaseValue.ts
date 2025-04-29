
// Utility for formatting values for Supabase
export const formatSupabaseValue = (value: any, type: string): any => {
  if (value === '' || value === undefined) return null;
  
  switch (type) {
    case 'number':
      return Number(value) || null;
    case 'boolean':
      return value === 'true' || value === true;
    case 'date':
      // Tarih değerini ISO formatına dönüştür
      if (value instanceof Date) {
        return value.toISOString();
      }
      // Eğer string ise ve geçerli bir tarih ise
      if (typeof value === 'string' && !isNaN(Date.parse(value))) {
        return new Date(value).toISOString();
      }
      return null;
    default:
      return value;
  }
};
