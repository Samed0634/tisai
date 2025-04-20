
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WorkplaceItemDetailsProps {
  item: Record<string, any>;
}

const WorkplaceItemDetails: React.FC<WorkplaceItemDetailsProps> = ({ item }) => {
  // Filter out null or undefined values and sort fields alphabetically
  const entries = Object.entries(item)
    .filter(([_, value]) => value !== null && value !== undefined && value !== "")
    .sort(([a], [b]) => a.localeCompare(b));

  return (
    <ScrollArea className="h-[400px] w-full">
      <Table>
        <TableBody>
          {entries.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium w-1/3">{key}</TableCell>
              <TableCell>{value?.toString() || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default WorkplaceItemDetails;
