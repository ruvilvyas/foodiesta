const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
            img: String
        }
    ]
});

const CartItem = mongoose.model("Cart", cartSchema);
module.exports = CartItem;
