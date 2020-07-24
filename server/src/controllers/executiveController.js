const jwt = require('jsonwebtoken');
const models = require('../models/Executive');
Executive = models.Executive;

//functions for executive authentication and login

module.exports = {
    signIn: async (req, res) => {
        const { email, password } = req.body;
        // console.log(email, password)

        if (!email || !password) {
            return res.status(422).send({ error: 'Must provide email and password' });
        }

        const executive = await Executive.findOne({ email });
        if (!executive) {
            return res.status(422).send({ error: 'You have not registered yet!!' });
        }


        try {
            if (executive.password != password) {
                return res.status(422).send({ error: 'Invalid credentials' });
            }
            const token = jwt.sign({ userId: executive._id }, 'MY_SECRET_KEY');

            // console.log(token)

            res.send({ token: token });
        } catch (err) {
            return res.status(422).send({ error: 'Invalid credentials!!' });
        }
    }
}