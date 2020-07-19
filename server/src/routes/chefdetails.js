const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireChefAuth');
const User = mongoose.model('User');
const router = express.Router();
router.use(requireAuth);

const models = require('../models/models')

Chef = models.chef;
Menu = models.menu;

/****************chef details */

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
            console.log(req.user._id)
            await Menu.find({ chef: req.user._id }).then(async function (data) {
                console.log(data);
                res.send({ dishes: data })
            })


        } catch (error) {
            next(error);
        }
    })



router.route('/profile')
    .get(async (req,res,next) => {
        try {
            console.log(req.user._id)
            await Chef.find({ _id: req.user._id }).then(async function (data) {
                console.log(data);
                res.send({ profile : data })
            })
        } catch (error) {
            next(error);
        }
    })





module.exports = router;
