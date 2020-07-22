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


//-----------------------calculating current time---------------------
function getTime() {
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    var hoursIST = ISTTime.getHours();
    var minutesIST = ISTTime.getMinutes();
    var secondsIST = ISTTime.getSeconds()
    minutesIST = minutesIST < 10 ? '0' + minutesIST : minutesIST;
    hoursIST = hoursIST < 10 ? '0' + hoursIST : hoursIST;
    secondsIST = secondsIST < 10 ? '0' + secondsIST : secondsIST;
    var time = hoursIST + ":" + minutesIST + ":" + secondsIST;
    return time;
}
//-------------------------------------------------------------------

//-----------------------------change 24 to 12----------------

function tConvert(time) {
    if (time == "12:00:00") return "12 PM"
    if (time == "24:00:00" || time == "00:00:00") return "12 AM"
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
        time = time.slice(1, 4);
        time[5] = +time[0] < 12 ? ' AM' : ' PM';
        time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
}

//---------------------------------------------------------


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
                                console.log("chefs", chefs)
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

//add time slot code here
//view all dishes by a particular chef and chef details
router.route("/chef/:query")
    .get(async (req, res, next) => {
        try {
            current_time = getTime()
            availability = 'no'
            slots = []
            menu = await Menu.find({ chef: req.params.query })

            // chef_details = await Chef.findById(req.params.query)

            await Chef.findById(req.params.query).then(async function (chef_details) {
                await chef_details;

                for (var interval of chef_details.slot) {
                    start_time = interval.split('-')[0]
                    end_time = interval.split('-')[1]

                    if (current_time > start_time && current_time < end_time) {
                        availability = 'yes'

                    }
                    start_conv = tConvert(start_time)
                    end_conv = tConvert(end_time)
                    slots.push(start_conv + " to " + end_conv)

                }

                res.send({ chef_details: chef_details, menu: menu, availability: availability, slots: slots })
            })



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

router.route("/time")
    .get(async (req, res, next) => {
        try {

            ss = "07:15:10-10:15:10"
            console.log(ss.split('-'))

            time = '24:00:00'
            timec = tConvert(time)
            res.send(timec)

        } catch (error) {
            next(error);
        }

    })



module.exports = router;