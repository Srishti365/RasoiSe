const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const chefSchema = new Schema({
    name: String,
    email: {
        type: String,
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
    phone: {
        type: Number
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
    rating: {
        type: Number,
        default: 3
    },
    image: {
        type: String,
        default: "https://akm-img-a-in.tosshub.com/sites/indiacontent/0/images/product/public/03102019/00/01/57/00/87/74/12/88/1570087741288/659-chef-kunal-kapur-posing-with-barbecued-lambchops-in-the-kitchen-of-image-Chef_Kunal_Kapur_121808_B_01.jpg"
    }
})


chefSchema.methods.comparePassword = function (candidatePassword) {
    const chef = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, chef.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(false);
            }

            resolve(true);
        });
    });

}


const Chef = mongoose.model("chef", chefSchema);

const menuItemSchema = new Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chef'
    },
    image: {
        type: String,
        default: "https://5.imimg.com/data5/JJ/BE/MY-17263151/schezwan-chicken-lollipops-500x500.png"
    }
})

const Menu = mongoose.model("menu", menuItemSchema);

//has different quantity of menu items
const orderItemSchema = new Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chef'
    },
    quantity: Number,
    timestamp: String,
    slot: String,
    price: Number,
    isOrdered: {
        type: Boolean,
        default: false
    }

})


//one cart per chef
//this model is for all orders for a chef by a particular user

const cartSchema = new Schema({
    orderItems: [orderItemSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chef'
    },

    delivery_add: String,
    timestamp: String,
    isOrdered: {
        type: Boolean,
        default: false
    }
    ,
    isDelivered: {
        type: Boolean,
        default: false
    }

})





const OrderItem = mongoose.model("orderItem", orderItemSchema);
const Cart = mongoose.model("cart", cartSchema);

module.exports = { chef: Chef, menu: Menu, orderItem: OrderItem, cart: Cart };


module.exports.hashPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Hashing failed", error);
    }
};