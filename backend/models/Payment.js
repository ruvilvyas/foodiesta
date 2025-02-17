const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Linking to User model
  },
  name: String,
  email: String,
  address: String,
  paymentMethod: String,
  payDetail: String,
  price: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
