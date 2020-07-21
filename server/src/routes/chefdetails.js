const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireChefAuth');
const User = mongoose.model('User');
const router = express.Router();
router.use(requireAuth);

const models = require('../models/models')

Chef = models.chef;
Menu = models.menu;
OrderItem = models.orderItem;
Cart = models.cart;



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
                console.log(result);
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
            //req.bod={id:id of the particular cartitem}
            await req.body;
            await Cart.findById(req.body.id).then(async function (data) {
                data.confirmedByChef = true
                data.executive = "5f1564ab2f37cf1a43446518"
                data.save()
                res.send(data)
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





module.exports = router;
