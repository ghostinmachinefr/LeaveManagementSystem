require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const LeaveRequest = require('./models/LeaveRequest');

// Function to import LeaveRequest data
async function importLeaveRequests(csvFilePath) {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas');

        // Clear existing data (optional - remove if you want to keep existing data)
        await LeaveRequest.deleteMany({});
        console.log('Cleared existing data');

        const leaveRequests = [];
        
        // Read CSV file and process data
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    const parseDate = (dateString) => {
                        const date = new Date(dateString);
                        return isNaN(date.getTime()) ? null : date;
                    };

                    leaveRequests.push({
                        ID: parseInt(row.RequestID, 10),
                        type: row.type,
                        from: parseDate(row.from),
                        to: parseDate(row.to),
                        takenOn: parseDate(row.takenOn),
                        SAPID: row.SAPID,
                        reason: row.reason,
                        cancel: parseInt(row.cancel, 10)
                    });
                })
                .on('end', resolve)
                .on('error', reject);
        });

        // Insert all records
        if (leaveRequests.length > 0) {
            const result = await LeaveRequest.insertMany(leaveRequests, { ordered: true });
            console.log(`Successfully imported ${result.length} leave requests`);
        }

        // Log the total count of documents in the collection
        const count = await LeaveRequest.countDocuments();
        console.log(`Total documents in collection: ${count}`);

    } catch (error) {
        console.error('Error during import:', error);
    } finally {
        // Close the MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Execute the import
importLeaveRequests('./src/server/database/request.csv')
    .then(() => {
        console.log('Import process completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Import process failed:', error);
        process.exit(1);
    });