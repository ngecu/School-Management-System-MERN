import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Export tabular data to a downloadable PDF.
 *
 * @param {Object}   opts
 * @param {string}   opts.title       Document title (e.g. "Program List")
 * @param {string[]} opts.columns     Column headers
 * @param {Array[]}  opts.rows        Row data (each row is an array of strings)
 * @param {string}   [opts.filename]  Output filename without .pdf
 */
export const exportToPdf = ({ title, columns, rows, filename }) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

  doc.setFontSize(16);
  doc.text(title, 40, 40);

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generated on ${new Date().toLocaleString()}`, 40, 60);

  autoTable(doc, {
    startY: 80,
    head: [columns],
    body: rows,
    styles: { fontSize: 9, cellPadding: 6 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: 40, right: 40 },
  });

  doc.save(`${filename || title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
};