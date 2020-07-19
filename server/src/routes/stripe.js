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
            console.log(req.body.id)

            const token = req.body.stripeToken;
            const idArr = req.body.idArr;
            const total_price = req.body.total_price;
            const charge = await stripe.charges.create({
                amount: req.body.total_price,
                currency: req.body.currency,
                source: 'tok_mastercard'
            });

            console.log(charge);
            res.send(charge);

            console.log('item ids and total price');
            console.log(idArr);
            console.log(total_price);

        }
        catch (error) {
            next(error);
        }
    });


module.exports = router;

