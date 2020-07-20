var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();
router.use(requireAuth);

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51H6GbzGRyyytHUwO4kNXW9obCRJzoKmK03xdx7P52zzQk6431gnA9YSya87cFCRdkeEUZhIdeQ997KENiJgVpIWO00GBdp4BQ2');


router.route("/")
    .post(async (req, res, next) => {
        try {

            const token = req.body.stripeToken;
            const idArr = req.body.idArr;
            const total_price = req.body.total_price;
            const charge = await stripe.charges.create({
                amount: req.body.total_price,
                currency: req.body.currency,
                source: 'tok_mastercard'
            });

            console.log(charge);


            console.log('item ids and total price');
            console.log(idArr);
            console.log(total_price);
            for (var cartitem of idArr) {
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

            res.status(200).send({ data: 'Payment successful' });

        }
        catch (error) {
            next(error);
        }
    });


module.exports = router;

