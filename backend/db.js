const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/foodiesta"; // Replace with actual MongoDB URI

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected...");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
