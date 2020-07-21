const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/executiveAuth');
const User = mongoose.model('User');
const Executive = mongoose.model('Executive')
router.use(requireAuth);

const models = require('../models/models')

Chef = models.chef;
Menu = models.menu;
OrderItem = models.orderItem;
Cart = models.cart;



//view pending deliveries (confirmed by chef, yet not picked up)
router.route("/viewpending")
    .get(async (req, res, next) => {
        try {

            await Cart.find({ executive: req.user._id, isOrdered: true, confirmedByChef: true, isPickedUp: false }).populate({ path: 'chef', model: Chef }).populate({ path: 'user', model: User }).then(async function (data) {
                res.send({ orders: data })
            })


        } catch (error) {
            next(error);
        }
    })

//confirm pickup
router.route("/confirmpickup")
    .post(async (req, res, next) => {
        try {
            // req.body={id:id of the order}

            await Cart.findById(req.body.id).then(async function (data) {
                data.isPickedUp = true
                await data.save()
            })
            res.send("pickup confirmed by exec")

        } catch (error) {
            next(error);
        }
    })


//view deliveries in process (picked up from chef but not yet delivered)
router.route("/viewinprocess")
    .get(async (req, res, next) => {
        try {

            await Cart.find({ executive: req.user._id, isOrdered: true, confirmedByChef: true, isPickedUp: true, isDelivered: false }).populate({ path: 'chef', model: Chef }).populate({ path: 'user', model: User }).then(async function (data) {
                res.send({ orders: data })
            })


        } catch (error) {
            next(error);
        }
    })


//view routes

//confirm delivery
router.route("/confirmdelivery")
    .post(async (req, res, next) => {
        try {
            // req.body={id:id of the order}

            await Cart.findById(req.body.id).then(async function (data) {
                data.isDelivered = true
                await data.save()
            })
            res.send("delivery confirmed by exec")

        } catch (error) {
            next(error);
        }
    })

//view delivered (confirmed by exec-order sent to user)
router.route("/viewdelivered")
    .get(async (req, res, next) => {
        try {

            await Cart.find({ executive: req.user._id, isOrdered: true, confirmedByChef: true, isPickedUp: true, isDelivered: true }).populate({ path: 'chef', model: Chef }).populate({ path: 'user', model: User }).then(async function (data) {
                res.send({ orders: data })
            })


        } catch (error) {
            next(error);
        }
    })


module.exports = router;