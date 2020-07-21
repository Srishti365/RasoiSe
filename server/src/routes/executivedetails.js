const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
var NodeGeocoder = require("node-geocoder");
const requireAuth = require('../middlewares/executiveAuth');
const User = mongoose.model('User');
const Executive = mongoose.model('Executive')
router.use(requireAuth);

const models = require('../models/models')

Chef = models.chef;
Menu = models.menu;
OrderItem = models.orderItem;
Cart = models.cart;

const options = require('../../location_creds');

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


router.route("/viewroute")
    .post(async (req, res, next) => {
        try {
            // req.body={id:id of the order}
            await req.user
            var geocoder = NodeGeocoder(options);
            await Cart.findById(req.body.id).populate({ path: 'chef', model: Chef }).then(async function (data) {

                await geocoder.geocode(data.delivery_add).then(async function (loc) {
                    pick_long = data.chef.geometry.coordinates[0]
                    pick_lat = data.chef.geometry.coordinates[1]
                    dest_long = loc[0].longitude
                    dest_lat = loc[0].latitude
                    exe_long = req.user.geometry.coordinates[0]
                    exe_lat = req.user.geometry.coordinates[1]
                    console.log("pickup", pick_long, pick_lat)
                    console.log("exe coor", exe_long, exe_lat)
                    console.log("destin locations are", dest_long, dest_lat)

                    coords = exe_long + ',' + exe_lat + ';' + pick_long + ',' + pick_lat + ';' + dest_long + ',' + dest_lat

                    // -----------call to osrm api-----------
                    axios.get('http://router.project-osrm.org/route/v1/driving/' + coords + '?geometries=polyline&overview=full')
                        .then(response => {
                            // res.send({ overview: response.data, startlat: startlat, startlon: startlon });
                            res.send({ "route": response.data.routes[0].geometry, "exec_loc": [exe_lat, exe_long], "pickup_loc": [pick_lat, pick_long], "dest_loc": [dest_lat, dest_long] })

                        })
                        .catch(error => {
                            res.send(error);
                        });


                    // --------------------

                });


            })


        } catch (error) {
            next(error);
        }
    })





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