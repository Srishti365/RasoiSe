const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const Chef = mongoose.model('chef');

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

        const user = await Chef.findById(userId);
        req.user = user;
        next();
    })
};