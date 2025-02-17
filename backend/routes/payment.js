const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser"); // ✅ Protect Route
const Payment = require("../models/Payment");

// @route    POST /api/payment
// @desc     Store Payment Details
// @access   Private (Requires Auth)

router.get("/getPayments", fetchuser, async (req, res) => {
    try {
        console.log("User from token:", req.user); // Debugging
        const payments = await Payment.find({ user: req.user.id }); // Match payments by user ID
        res.json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/", fetchuser, async (req, res) => {
    try {
        const { name, email, address, paymentMethod, payDetail, price } = req.body;

        // 🛑 Basic validation
        if (!name || !email || !address || !paymentMethod || !payDetail || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Save to DB
        const newPayment = new Payment({
            user: req.user.id, // Link to logged-in user
            name,
            email,
            address,
            paymentMethod,
            payDetail,
            price
        });

        await newPayment.save();
        res.status(201).json({ message: "Payment stored successfully!" });

    } catch (error) {
        console.error("❌ Payment Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
