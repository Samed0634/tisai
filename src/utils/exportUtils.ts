
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatInTimeZone } from 'date-fns-tz';
import { tr } from 'date-fns/locale';

// Define interface for dynamic jspdf-autotable
interface JsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

export const exportToPDF = (data: any[], columns: { title: string; field: string }[], title: string) => {
  if (!data || data.length === 0) return;

  const doc = new jsPDF() as JsPDFWithAutoTable;
  const now = new Date();
  const dateStr = formatInTimeZone(now, 'Europe/Istanbul', 'dd.MM.yyyy HH:mm', { locale: tr });
  
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(10);
  doc.text(`Oluşturulma Tarihi: ${dateStr}`, 14, 30);

  // Filter out only the needed data based on columns
  const tableData = data.map(item => {
    // For each row, map through the columns to get values in correct order
    return columns.map(column => {
      let cellData = item[column.field];
      // Format date values if needed
      if (column.field === 'Tarih' && cellData) {
        cellData = formatInTimeZone(new Date(cellData), 'Europe/Istanbul', 'dd.MM.yyyy', { locale: tr });
      }
      return cellData || '';
    });
  });

  const tableHeaders = columns.map(column => column.title);
  
  doc.autoTable({
    head: [tableHeaders],
    body: tableData,
    startY: 40,
    styles: {
      fontSize: 10,
      cellPadding: 3,
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [66, 139, 202],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  });

  // Create filename with current date
  const filename = `${title.replace(/\s+/g, '_')}_${formatInTimeZone(now, 'Europe/Istanbul', 'yyyyMMdd_HHmm')}.pdf`;
  doc.save(filename);
};

export const exportToExcel = (data: any[], title: string) => {
  if (!data || data.length === 0) return;

  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  // Generate a filename with title and current date
  const now = new Date();
  const dateStr = formatInTimeZone(now, 'Europe/Istanbul', 'yyyyMMdd_HHmm', { locale: tr });
  const filename = `${title.replace(/\s+/g, '_')}_${dateStr}.xlsx`;
  
  // Export to file
  XLSX.writeFile(workbook, filename);
};
