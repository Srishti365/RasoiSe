const jwt = require('jsonwebtoken');
const models = require('../models/models');
var NodeGeocoder = require("node-geocoder");
Chef = models.chef;

const options = require('../../location_creds')
var geocoder = NodeGeocoder(options);

module.exports = {
    signUp: async (req, res) => {
        var { email, password, location, name, phone } = req.body;

        const chef = await Chef.findOne({ email });
        if (chef) {
            return res.status(422).send({ error: 'Email already exists' });
        }

        try {

            password = await models.hashPassword(password);

            geocoder.geocode(location).then(async function (loc) {
                console.log(loc[0].longitude, loc[0].latitude)

                const chef = new Chef({
                    email,
                    password,
                    location,
                    name,
                    phone,
                    active: false,
                    geometry: {
                        coordinates:
                            [loc[0].longitude, loc[0].latitude]

                    },
                    image: "https://cdn.asiatatler.com/asiatatler/i/sg/2019/05/24143548-head-chef-takuya-yamashita-2_cover_1280x1600.jpg"
                })
                await chef.save()

                const token = jwt.sign({ userId: chef._id }, 'MY_SECRET_KEY');
                // console.log(token, 'token')

                res.send({ token });
            });


            // console.log('chef', chef);




        } catch (err) {
            console.log(err);
            return res.status(422).send({ error: 'Something went wrong!!' });
        }
    },
    signIn: async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password)

        if (!email || !password) {
            return res.status(422).send({ error: 'Must provide email and password' });
        }

        const chef = await Chef.findOne({ email });
        if (!chef) {
            return res.status(422).send({ error: 'You have not registered yet!!' });
        }

        if (chef.active == false) {
            return res.status(422).send({ error: 'We need to verify first!!!' });
        }

        try {
            await chef.comparePassword(password);
            const token = jwt.sign({ userId: chef._id }, 'MY_SECRET_KEY');

            console.log(token)

            res.send({ token });
        } catch (err) {
            return res.status(422).send({ error: 'Invalid password or email' });
        }
    },
    editProfile: async(req,res,next) => {  
        try {
            var { name, email, phone, password } = req.body;

            password = await models.hashPassword(password);

            // var chef = await Chef.find({ _id: req.user._id })
            await Chef.findOneAndUpdate(
                { "_id": req.user._id},
                {
                    $set: { name, password, phone, email }
                },
                function(err, res) {
                    if (err) throw err;
                }
            );

            res.send('Updated!!')
    
        } catch (error) {
            next(error);
        }
    }
}