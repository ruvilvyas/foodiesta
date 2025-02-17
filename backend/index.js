const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

const app = express();
const port = 5000;

// ✅ Secure CORS Configuration
const corsOptions = {
    origin: "http://localhost:3000",  // ✅ Allow frontend requests
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"] };
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ Load Routes
app.use("/api/auth", require("./routes/auth"));   // Authentication Routes
app.use("/api/products", require("./routes/products")); // Product Routes ✅ Un-commented
app.use("/api/cart", require("./routes/cart")); 
app.use("/api/payment", require("./routes/payment")); // ✅ Add Payment Route

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("Hello, Foodiesta Backend!");
});

// ✅ Start Server Only if MongoDB is Connected
connectToMongo().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Foodiesta backend running on port ${port}`);
    });
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});
