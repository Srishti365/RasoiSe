const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/userController');

const { validateBody, checkEmail, confirmPassword } = require('../helpers/routeHelpers');

router.route('/checkEmail')
    .post(validateBody(checkEmail.authSchema),UsersController.checkEmail);

router.route('/otpVerify')
    .post(UsersController.otpVerify);

router.route('/checkPassword')
    .post(validateBody(confirmPassword.authSchema),UsersController.checkPassword);   



module.exports = router;