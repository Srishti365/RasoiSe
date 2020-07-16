const express = require('express');
const router = express.Router();
const paypal = require("paypal-rest-sdk");
const requireAuth = require('../middlewares/requireAuth');


// router.use(requireAuth);

paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "AeED_KTQJTjxa87CECItTZp2xS1MRlpubqlluq0jkoq9jNqsED6U5RFjWNBZw3clnUF5LJ7f9oMleIy0",
    client_secret:
        "EMub9pj8Ji5UtjoKB4r-1ZldEiMy0GWGnj8v2i60OuX3-0FIDI6QvtULXNE3uNBE9iDGq9hBEuNRFs6e"
});


router.get("/", (req, res) => {
    // console.log(req.query.token)
    res.render("index");
});

router.get("/paypal", (req, res) => {
    // console.log('hii');
    // console.log(req.params.token)
    
    var create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://localhost:5000/success",
            cancel_url: "http://localhost:5000/cancel"
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: "item",
                            sku: "item",
                            price: "1.00",
                            currency: "USD",
                            quantity: 1
                        }
                    ]
                },
                amount: {
                    currency: "USD",
                    total: "1.00"
                },
                description: "This is the payment description."
            }
        ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href);
        }
    });
});

router.get("/success", (req, res) => {
    // res.send("Success");
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: "1.00"
                }
            }
        ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render("success");
        }
    });
});

router.get("cancel", (req, res) => {
    res.render("cancel");
});





module.exports = router;