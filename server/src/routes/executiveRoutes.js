const express = require('express');
const router = express.Router();
const ExecutiveController = require('../controllers/executiveController');

router.route('/signin')
    .post(ExecutiveController.signIn);


module.exports = router;