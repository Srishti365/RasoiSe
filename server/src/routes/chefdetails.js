const express = require('express');
const mongoose = require('mongoose');
var NodeGeocoder = require("node-geocoder");
const requireAuth = require('../middlewares/requireChefAuth');
const User = mongoose.model('User');
const Executive = mongoose.model('Executive')
const router = express.Router();
router.use(requireAuth);
const { validateBody, editChefProfile } = require('../helpers/routeHelpers');
const ChefController = require('../controllers/chefController');

const models = require('../models/models')

Chef = models.chef;
Menu = models.menu;
OrderItem = models.orderItem;
Cart = models.cart;


const transporter = require('../../email_creds')

const options = require('../../location_creds');
const cons = require('consolidate');
// Executive = require('../models/Executive');


//add menu item for chef
router.route("/addmenuitem")
    .post(async (req, res, next) => {
        try {
            //req.body : name, category, description, price

            var { name, category, description, price } = req.body
            var menu1 = new Menu({
                name,
                category,
                description,
                price,
                chef: req.user._id
            });
            menu1.save()

            res.send('menu item added!')

        } catch (error) {
            next(error);
        }
    })

//view all menu items
router.route("/viewmenu")
    .get(async (req, res, next) => {
        try {
            await Menu.find({ chef: req.user._id }).then(async function (data) {
                res.send({ dishes: data })
            })


        } catch (error) {
            next(error);
        }
    })

//remove menu item
router.route("/removemenuitem")
    .post(async (req, res, next) => {
        try {

            await Menu.deleteOne({ _id: req.body.id }).then(async function (result) {
                // console.log(result);
                res.send('menu item removed')
            });

        } catch (error) {
            next(error);
        }
    })

//view particular menu item
router.route("/viewparticularmenu")
    .post(async (req, res, next) => {
        //req.body={id:menuitemid}

        try {
            await Menu.findById(req.body.id).then(async function (data) {
                res.send({ menuitem: data })
            })


        } catch (error) {
            next(error);
        }
    })


//edit menu
router.route("/editmenuitem")
    .post(async (req, res, next) => {
        try {

            // req.body={id,name,category,description,price}
            await req.body

            Menu.findOneAndUpdate({ _id: req.body.id }, { $set: { name: req.body.name, category: req.body.category, description: req.body.description, price: parseInt(req.body.price) } }, async function (err, record) {
                if (err) throw err;
                await record
                record.save
                res.send('item values updated!')

            })

        } catch (error) {
            next(error);
        }
    })



//view orders
router.route("/vieworders")
    .get(async (req, res, next) => {
        try {
            await Cart.find({ chef: req.user._id, isOrdered: true, confirmedByChef: false }).populate({ path: 'orderItems.menuItem', model: Menu }).populate({ path: 'user', model: User }).then(async function (data) {
                // console.log(data);
                res.send({ orders: data })
            })


        } catch (error) {
            next(error);
        }
    })

//view particular order
router.route("/viewparticularorder")
    .post(async (req, res, next) => {
        try {
            //red.body={id:id of the particular order}

            await Cart.findById(req.body.id).populate({ path: 'orderItems.menuItem', model: Menu }).populate({ path: 'user', model: User }).then(async function (data) {
                // console.log(data);
                res.send({ orders: data })
            })


        } catch (error) {
            next(error);
        }
    })

//confirm order -- assign executive here
router.route("/confirmorder")
    .post(async (req, res, next) => {
        try {
            //req.body={id:id of the particular cartitem}
            timetaken = 10;
            await req.body;
            await Cart.findById(req.body.id).populate({ path: 'user', model: User }).populate({ path: 'chef', model: Chef }).then(async function (data) {
                data.confirmedByChef = true

                //------------assign exec here-----------------------

                chef_long = req.user.geometry.coordinates[0]
                chef_lat = req.user.geometry.coordinates[1]

                await Executive.aggregate()
                    .near({
                        near: {
                            type: "Point",
                            coordinates: [chef_long, chef_lat]
                        },
                        maxDistance: 100000,
                        spherical: true,
                        distanceField: "dis"
                    }).then(async function (exes) {
                        exec_email = "sahilchoudhary74306@gmail.com"
                        exec_name = "Erwin smith"
                        // console.log("executive has been assigned")
                        // console.log(exes)
                        if (exes.length == 0) {
                            data.executive = "5f1564ab2f37cf1a43446518"
                        }
                        else {
                            data.executive = exes[0]._id
                            exec_email = exes[0].email
                            exec_name = exes[0].name

                        }

                        console.log(exec_email)

                        //----------------send mail to exec----------------------------


                        const html = `Hi, Executive ${exec_name},
                    You have been assigned to pick up orders from home chef ${data.chef.name} at ${data.chef.location} 
                    Delivery Location: ${data.user.name} at ${data.delivery_add}
                    Please reach there asap and confirm after successful delivery.
                    Have a pleasant day`

                        const mailOptions = {
                            from: 'rasoiseproject@gmail.com',
                            to: exec_email,
                            subject: 'Delivery Notification',
                            text: html
                        };

                        await transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                // return res.status(422).send({ error: 'Something wrong with email!!'});
                            } else {
                                console.log('Email sent' + info.response);
                            }
                        });


                        //-------------------------------------------------------------

                    });



                // -----------------------------------------------------
                await data.save()
                res.send(data)
            })



        } catch (error) {
            next(error);
        }
    })

//view confirmed orders (confirmed by chef, yet not picked up)
router.route("/viewconfirmed")
    .get(async (req, res, next) => {
        try {

            await Cart.find({ chef: req.user._id, isOrdered: true, confirmedByChef: true, isPickedUp: false }).populate({ path: 'user', model: User }).populate({ path: 'executive', model: Executive }).then(async function (data) {
                res.send({ orders: data })
            })


        } catch (error) {
            next(error);
        }
    })


//view completed orders(confirmed by chef and picked up)
router.route("/viewcompleted")
    .get(async (req, res, next) => {
        try {

            await Cart.find({ chef: req.user._id, isOrdered: true, confirmedByChef: true, isPickedUp: true }).populate({ path: 'user', model: User }).populate({ path: 'executive', model: Executive }).then(async function (data) {
                res.send({ orders: data })
            })


        } catch (error) {
            next(error);
        }
    })




router.route('/profile')
    .get(async (req, res, next) => {
        try {

            await Chef.find({ _id: req.user._id }).then(async function (data) {

                res.send({ profile: data })
            })
        } catch (error) {
            next(error);
        }
    })


router.route('/editProfile')
    .post(validateBody(editChefProfile.authSchema), ChefController.editProfile);



module.exports = router;
