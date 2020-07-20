
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const User = mongoose.model('User');
const router = express.Router();
router.use(requireAuth);

const models = require('../models/models')

Chef = models.chef;
Menu = models.menu;
OrderItem = models.orderItem;
Cart = models.cart;

//-----------------------calculating IST time---------------------
function getTime() {
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    var hoursIST = ISTTime.getHours();
    var ampm = hoursIST >= 12 ? 'PM' : 'AM';
    hoursIST = hoursIST % 12;
    hoursIST = hoursIST ? hoursIST : 12;
    var minutesIST = ISTTime.getMinutes();
    minutesIST = minutesIST < 10 ? '0' + minutesIST : minutesIST;
    var time = hoursIST + ":" + minutesIST + " " + ampm;
    return time;
}
//-------------------------------------------------------------------

//add item to cart

router.route("/add")
    .post(async (req, res, next) => {
        try {
            //req.body:menuitemid,quantity, chefid
            await req.body;
            var orderitem1;
            var flag = 0;
            var updateid;
            await Menu.findById(req.body.menuitemid).then(async function (data) {
                price1 = data.price * req.body.quantity
                await OrderItem.find({ userid: req.user.id, chef: req.body.chefid, isOrdered: false, menuItem: req.body.menuitemid }).then(async function (record) {
                    //if order item exists then update quantity otherwise add new
                    if (record.length == 0) {
                        orderitem1 = new OrderItem({
                            menuItem: req.body.menuitemid,
                            userid: req.user.id,
                            chef: req.body.chefid,
                            quantity: req.body.quantity,
                            timestamp: getTime(),
                            price: price1,
                            isOrdered: false
                        })

                        orderitem1.save()

                    }
                    else {
                        //update quantity

                        ord = record[record.length - 1]
                        ord.quantity = req.body.quantity
                        ord.price = price1
                        ord.timestamp = getTime()
                        ord.save()
                        updateid = ord.id;
                        flag = 1;
                    }

                })

                //add order item to cart
                //find if cart already exists otherwise create new
                await Cart.find({ user: req.user.id, chef: req.body.chefid, isOrdered: false }).then(async function (result) {

                    if (result.length == 0) {
                        var cart1 = new Cart({
                            orderItems: [orderitem1],
                            user: req.user.id,
                            chef: req.body.chefid,
                            isOrdered: false,
                            isDelivered: false
                        })

                        cart1.save()
                    }
                    else {
                        resultnew = result[result.length - 1]
                        console.log("cart(with the same chef) already exists")
                        if (flag == 0) {
                            resultnew.orderItems.push(orderitem1);
                            resultnew.save()

                        }
                        if (flag == 1) {
                            // console.log(resultnew.orderItems)
                            for (var i of resultnew.orderItems) {
                                if (i.id == updateid) {
                                    i.quantity = req.body.quantity
                                    i.price = price1
                                    i.timestamp = getTime()
                                    resultnew.save()

                                }
                            }

                        }

                    }

                })

                res.send("item added to cart");

            })




        } catch (error) {
            next(error);
        }
    });


//view cart
router.route("/view")
    .get(async (req, res, next) => {
        try {
            total = 0
            Cart.find({ user: req.user.id, isOrdered: false }, { _id: 1, orderItems: 1 }).populate({ path: 'orderItems.menuItem', model: Menu }).then(function (data) {

                //-----------calculate total price------------//
                for (var i of data) {

                    for (var j of i.orderItems) {
                        total += (j.quantity * j.menuItem.price)

                    }

                }
                // ------------------------------/
                res.send({ cart: data, total_price: total })
            })
        } catch (error) {
            next(error);
        }
    })

//confirm payment
router.route("/checkout")
    .post(async (req, res, next) => {
        try {

            for (var cartitem of req.body.id) {
                await Cart.findById(cartitem).then(async function (result) {
                    result.isOrdered = true;

                    await result.save(async function (err, orders) {
                        // console.log(orders.orderItems)
                        for (var items of orders.orderItems) {
                            items.isOrdered = true;
                            await result.save()
                            await OrderItem.findById(items._id).then(async function (suborders) {
                                suborders.isOrdered = true;
                                suborders.save()
                            })
                        }

                    });

                })
            }
            res.send("checkout complete")

        } catch (error) {
            next(error);
        }
    })

//remove from cart
router.route("/remove")
    .post(async (req, res, next) => {
        try {
            console.log(req.body)
            await OrderItem.deleteOne({ _id: req.body.id }).then(async function (result) {
                await Cart.updateOne(
                    { user: req.user.id },
                    { $pull: { orderItems: { _id: req.body.id } } },
                    { multi: true }
                ).then(function (data) {
                    res.send(data)
                })
            })


        } catch (error) {
            next(error);
        }
    })

module.exports = router;