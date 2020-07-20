var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const sortObjectsArray = require('sort-objects-array');
var NodeGeocoder = require("node-geocoder");


const User = mongoose.model('User');
const router = express.Router();
router.use(requireAuth);

const models = require('../models/models')

Chef = models.chef;
Menu = models.menu;

const options = require('../../location_creds');
const cons = require("consolidate");



router.route("/")
    .get((req, res, next) => {
        res.send(req.user);
    })

    .post(async (req, res, next) => {
        try {
            res.send(req.body.search);

        } catch (error) {
            next(error);
        }
    });

router.route("/search/:query")
    .post(async (req, res, next) => {
        try {
            // ---------------------------------------------------
            console.log(req.params.query)
            var geocoder = NodeGeocoder(options);
            geocoder.geocode(req.body.location).then(async function (loc) {

                if (req.body.location == "current") {

                    lat = req.body.lat;
                    long = req.body.long;
                }
                else {
                    lat = loc[0].latitude;
                    long = loc[0].longitude;
                }
                Chef.aggregate()
                    .near({
                        near: {
                            type: "Point",
                            coordinates: [long, lat]
                        },
                        maxDistance: 300000,
                        spherical: true,
                        distanceField: "dis"
                    })
                    .then(async function (filter_chefs) {
                        var chefs = [];
                        var set1 = new Set()
                        await Menu.find({ name: new RegExp(req.params.query.toLowerCase()) }).then(function (result) {
                            // console.log(result)
                            for (var i of result) {
                                set1.add((i.chef._id).toString())

                            }
                        })

                        //search with name
                        for (var i of filter_chefs) {
                            n = (i.name).toString().toLowerCase()
                            if (n.includes(req.params.query.toLowerCase())) {
                                set1.add((i._id).toString())

                            }

                        }

                        for (var i of filter_chefs) {
                            idd = (i._id).toString()
                            if (set1.has(idd)) {
                                await Chef.findById(i).then(async function (data) {
                                    chefs.push(data)

                                });
                            }
                        }

                        chefs = sortObjectsArray(chefs, 'rating', 'desc');
                        // console.log(chefs)
                        geocoder.reverse({ lat: req.body.lat, lon: req.body.long })
                            .then((data) => {
                                res.send({ chefs: chefs, location: data[0].formattedAddress })
                            })

                    });
            });


        } catch (error) {
            next(error);
        }
    })

//page to display particular dishes by a chef(ef chicken dishes by tonio)    
router.route("/dish/")
    .get(async (req, res, next) => {
        try {
            await Menu.find({ chef: req.body.chefid, name: new RegExp(req.body.menu) }).then(async function (data) {
                res.send({ dishes: data })
            })

        } catch (error) {
            next(error);
        }

    })

//view all dishes by a particular chef and chef details
router.route("/chef/:query")
    .get(async (req, res, next) => {
        try {
            menu = await Menu.find({ chef: req.params.query })

            chef_details = await Chef.findById(req.params.query)
            res.send({ chef_details: chef_details, menu: menu })

        } catch (error) {
            next(error);
        }

    })

// router.route("/new")
//     .get((req, res, next) => {
//         var geocoder = NodeGeocoder(options);
//         geocoder.geocode(req.body.location).then(function (loc) {
//             console.log(loc)
//             Chef.aggregate()
//                 .near({
//                     near: {
//                         type: "Point",
//                         coordinates: [loc[0].longitude, loc[0].latitude]
//                     },
//                     maxDistance: 300000,
//                     spherical: true,
//                     distanceField: "dis"
//                 })
//                 .then(function (exes) {
//                     res.send(exes);
//                 });
//         });
//     })




module.exports = router;