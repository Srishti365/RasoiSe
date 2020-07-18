const express = require('express');


const router = express.Router();
const { validateBody, chefSignupSchema } = require('../helpers/routeHelpers');
const ChefController = require('../controllers/chefController');

router.route('/signup')
    .post(validateBody(chefSignupSchema.authSchema), ChefController.signUp);


router.route('/signin')
    .post(ChefController.signIn);


module.exports = router;
