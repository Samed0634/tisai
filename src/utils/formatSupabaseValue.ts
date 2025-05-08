
// Format value based on the column data type for Supabase
export const formatSupabaseValue = (value: any, type: string): any => {
  if (value === '' || value === undefined) return null;
  
  switch (type) {
    case 'number':
      return Number(value) || null;
    case 'boolean':
      return value === 'true' || value === true;
    case 'date':
      // Convert date value to ISO format
      if (value instanceof Date) {
        return value.toISOString();
      }
      // If string and valid date, convert to ISO format
      if (typeof value === 'string' && !isNaN(Date.parse(value))) {
        return new Date(value).toISOString();
      }
      return null;
    default:
      return value;
  }
};
