import * as XLSX from 'xlsx/xlsx.mjs';

export const exportToExcel = (data, filename = 'leave_history') => {
    try {
        if (!data || data.length === 0) {
            throw new Error('No data to export');
        }

        // Format the data for Excel
        const formattedData = data.map(item => ({
            'Request ID': item.ID || '',
            'Leave Type': item.type || '',
            'From Date': item.from || '',
            'To Date': item.to || '',
            'Requested On': item.takenOn || '',
            'Status': item.cancel === "1" ? "Cancelled" : "Active"
        }));

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(formattedData);

        // Set column widths
        const colWidths = [
            {wch: 12}, // Request ID
            {wch: 15}, // Leave Type
            {wch: 15}, // From Date
            {wch: 15}, // To Date
            {wch: 15}, // Requested On
            {wch: 10}  // Status
        ];
        ws['!cols'] = colWidths;

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Leave History');

        // Generate filename with date
        const dateStr = new Date().toISOString().split('T')[0];
        const fullFilename = `${filename}_${dateStr}.xlsx`;

        // Save file
        XLSX.writeFile(wb, fullFilename);
        
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        throw new Error('Failed to export data to Excel');
    }
};