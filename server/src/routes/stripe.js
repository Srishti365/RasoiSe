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
            const charge = await stripe.charges.create({
                amount: req.body.amount,
                currency: req.body.currency,
                source: 'tok_mastercard'
            });

            console.log(charge);
            res.send(charge);

        }
        catch (error) {
            next(error);
        }
    });


module.exports = router;

