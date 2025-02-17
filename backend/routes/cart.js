const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser"); 
const Cart = require("../models/cartModel");

// ✅ Get User's Cart Items
router.get("/", fetchuser, async (req, res) => {
    try {
        const userCart = await Cart.findOne({ user: req.user.id });
        if (!userCart) return res.json([]); // Return empty if no cart exists
        res.json(userCart.items);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ Add Item to Cart
router.post("/", fetchuser, async (req, res) => {
    const { name, price, quantity, img } = req.body;

    try {
        let userCart = await Cart.findOne({ user: req.user.id });

        if (!userCart) {
            userCart = new Cart({
                user: req.user.id,
                items: [{ name, price, quantity, img }]
            });
        } else {
            userCart.items.push({ name, price, quantity, img });
        }

        await userCart.save();
        res.json(userCart.items);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ Update Item Quantity
router.put("/:id", fetchuser, async (req, res) => {
    try {
        const { quantity } = req.body;

        const userCart = await Cart.findOne({ user: req.user.id });
        if (!userCart) return res.status(404).json({ error: "Cart not found" });

        const item = userCart.items.find((item) => item._id.toString() === req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });

        item.quantity = quantity;
        await userCart.save();

        res.json(userCart.items);
    } catch (error) {
        res.status(500).json({ error: "Error updating quantity" });
    }
});

// ✅ Remove Item from Cart
router.delete("/:id", fetchuser, async (req, res) => {
    try {
        let userCart = await Cart.findOne({ user: req.user.id });
        if (!userCart) return res.status(404).json({ error: "Cart not found" });

        // Filter out the item that needs to be removed
        userCart.items = userCart.items.filter((item) => item._id.toString() !== req.params.id);

        await userCart.save();
        res.json({ message: "Item removed from cart", items: userCart.items });
    } catch (error) {
        res.status(500).json({ error: "Error removing item" });
    }
});

module.exports = router;
