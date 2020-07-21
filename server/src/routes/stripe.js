var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const models = require('../models/models');
const router = express.Router();
router.use(requireAuth);

const Stripe = require('stripe');
const cons = require("consolidate");
const stripe = Stripe('sk_test_51H6GbzGRyyytHUwO4kNXW9obCRJzoKmK03xdx7P52zzQk6431gnA9YSya87cFCRdkeEUZhIdeQ997KENiJgVpIWO00GBdp4BQ2');


Cart = models.cart;
Payment = models.payment;

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


router.route("/")
    .post(async (req, res, next) => {
        try {
            await req.user;
            const token = req.body.stripeToken;
            const idArr = req.body.idArr;
            const total_price = req.body.total_price;
            const charge = await stripe.charges.create({
                amount: req.body.total_price,
                currency: req.body.currency,
                source: 'tok_mastercard'
            });


            //---------------update payment model--------

            payment1 = new Payment({
                transaction_id: charge.balance_transaction,
                amount: charge.amount,
                status: true
            })

            await payment1.save().then(async function (data) {

                for (var cartitem of idArr) {
                    await Cart.findById(cartitem).then(async function (result) {
                        result.isOrdered = true;
                        result.delivery_add = req.user.address;
                        result.timestamp = getTime();
                        result.payment = data._id;

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
            })

            //-------------update order------------------------------



            res.send({ transaction_id: charge.balance_transaction, amount: charge.amount, failure_message: charge.failure_message });

        }
        catch (error) {
            next(error);
        }
    });


module.exports = router;

