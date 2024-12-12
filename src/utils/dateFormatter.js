/**
 * Converts any date string/object to 'dd mon yyyy' format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    // If date is null or undefined, return empty string
    if (!date) return '';

    let dateObj;

    // Convert input to Date object
    if (date instanceof Date) {
        dateObj = date;
    } else {
        // Handle different date string formats
        if (typeof date !== 'string') return '';

        // Remove any extra whitespace
        date = date.trim();

        // Validate date format before parsing
        if (!isCorrectDateFormat(date)) return '';

        // Try to create date object from string
        try {
            // Handle 'dd/mm/yyyy' or 'dd-mm-yyyy'
            if (date.match(/^\d{1,2}[-/]\d{1,2}[-/]\d{4}$/)) {
                const [day, month, year] = date.split(/[-/]/);
                dateObj = new Date(year, month - 1, day);
            }
            // Handle 'yyyy-mm-dd'
            else if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                dateObj = new Date(date);
            }
            // Handle 'dd mon yyyy' or 'dd month yyyy'
            else if (date.match(/^\d{1,2}\s+[A-Za-z]+\s+\d{4}$/)) {
                dateObj = new Date(date);
            }
            // Default: try direct conversion
            else {
                dateObj = new Date(date);
            }

            // Validate date object
            if (isNaN(dateObj.getTime())) {
                return '';
            }
        } catch (error) {
            console.error('Error parsing date:', error);
            return '';
        }
    }

    // Array of month abbreviations
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Format the date
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
}

/**
 * Validates if a date string is in 'dd mon yyyy' format
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if date is in correct format
 */
function isCorrectDateFormat(dateString) {
    if (typeof dateString !== 'string') return false;
    
    const pattern = /^\d{2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}$/;
    return pattern.test(dateString.trim());
}

module.exports = {
    formatDate,
    isCorrectDateFormat
};