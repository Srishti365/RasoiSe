const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const Executive = mongoose.model('Executive');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;


    if (!authorization) {
        return res.status(422).send({ errror: 'You must be logged in!' });
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if (err) {
            return res.status(422).send({ errror: 'You must be logged in!' });
        }

        const { userId } = payload;

        const user = await Executive.findById(userId);
        req.user = user;
        next();
    })
};