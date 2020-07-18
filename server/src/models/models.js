const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const chefSchema = new Schema({
    name: String,
    email: {
        type:String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean
    },
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


chefSchema.methods.comparePassword = function(candidatePassword){
    const chef = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, chef.password, (err, isMatch) => {
            if(err){
                return reject(err);
            }
            if(!isMatch) {
                return reject(false);
            }

            resolve(true);
        });
    });

}


const Chef = mongoose.model("chef", chefSchema);
const Menu = mongoose.model("menu", menuItemSchema);
const OrderItem = mongoose.model("orderItem", orderItemSchema);
const Cart = mongoose.model("cart", cartSchema);

module.exports = { chef: Chef, menu: Menu, orderItem: OrderItem, cart: Cart };


module.exports.hashPassword = async function(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error("Hashing failed", error);
    }
};