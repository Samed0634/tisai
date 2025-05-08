
import { dataAttributeColumnMappings, columnMappings } from "./columnMappings";

// Function to get column mapping from data attribute
export const getColumnMappingByDataAttribute = (dataDbColumn: string) => {
  return dataAttributeColumnMappings[dataDbColumn];
};

// Function to get column mapping from element id
export const getColumnMappingById = (elementId: string) => {
  return columnMappings.get(elementId);
};
