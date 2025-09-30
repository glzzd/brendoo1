const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        const dbUrl = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/brendoo';
        console.log('Connecting to:', dbUrl);
        
        // Optimize connection settings for better performance
        const connectionOptions = {
            maxPoolSize: 10, // Maximum number of connections in the pool
            serverSelectionTimeoutMS: 30000, // Keep trying to send operations for 30 seconds
            socketTimeoutMS: 120000, // Close sockets after 120 seconds of inactivity
            connectTimeoutMS: 30000, // Give up initial connection after 30 seconds
            heartbeatFrequencyMS: 10000, // Heartbeat every 10 seconds
            retryWrites: true, // Retry failed writes
            retryReads: true, // Retry failed reads
        };
        
        await mongoose.connect(dbUrl, connectionOptions);
        console.log("Verilənlər bazasına qoşuldu");
    } catch (error) {
        console.error("Verilənlər bazasına qoşulma zamanı xəta baş verdi:", error.message);
        process.exit(1);
    }
};

module.exports = connectToDatabase;
