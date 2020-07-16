const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const chefSchema = new Schema({
    name: String,
    location: String,
    geometry: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    },
    rating: Number,
    image:String
})

const menuItemSchema = new Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    chef: String,
    image:String
})

const orderItemSchema = new Schema({
    menuItem: String,
    userid: String,
    quantity: Number,
    timestamp: String,
    price: Number,
    isOrdered: Boolean

})

const cartSchema = new Schema({
    orderItems: [orderItemSchema],
    userid: String,
    delivery_add: String,
    timestamp: String,
    isOrdered: Boolean,
    isDelivered: Boolean
})

const Chef = mongoose.model("chef", chefSchema);
const Menu = mongoose.model("menu", menuItemSchema);
const OrderItem = mongoose.model("orderItem", orderItemSchema);
const Cart = mongoose.model("cart", cartSchema);

module.exports = { chef: Chef, menu: Menu, orderItem: OrderItem, cart: Cart };
