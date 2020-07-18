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





module.exports = router;
