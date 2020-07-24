const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const models = require('../models/User');
User = models.User;
// const User = mongoose.model('User');

const rn = require("random-number");
const bcrypt = require('bcrypt');

const transporter = require('../../email_creds')



//functions for user registration, authentication and login

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var gen = rn.generator({
    min: 100000,
    max: 999999,
    integer: true
});


module.exports = {
    signUp: async (req, res) => {
        var { email, password, confirmPassword } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(422).send({ error: 'Email already exists' });
        }

        try {
            const secretToken = gen();

            const html = `Hi there,
            Thank you for registering!!
            
            Your verification code is ${secretToken}
            Have a pleasant day.`

            const mailOptions = {
                from: 'rasoiseproject@gmail.com',
                to: email,
                subject: 'Please verify your email',
                text: html
            };

            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    // return res.status(422).send({ error: 'Something wrong with email!!'});
                } else {
                    console.log('Email sent' + info.response);
                }
            });

            password = await models.hashPassword(password);

            const user = new User({ email, password, secretToken, active: false });
            console.log('user', user);

            await user.save();


            const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');

            res.send({ token });
        } catch (err) {
            console.log(err);
            return res.status(422).send({ error: 'Something went wrong!!' });
        }
    },
    signIn: async (req, res) => {
        const { email, password } = req.body;
        // console.log(password);
        // console.log(email);

        if (!email || !password) {
            return res.status(422).send({ error: 'Must provide email and password' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(422).send({ error: 'You have not registered yet!!' });
        }

        // console.log(user.password);
        if (user.active == false) {
            return res.status(422).send({ verify: 'Verify your email first' });
        }

        try {
            await user.comparePassword(password);
            const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');

            res.send({ token });
        } catch (err) {
            return res.status(422).send({ error: 'Invalid password or email' });
        }
    },
    verify: async (req, res) => {
        const { token, email } = req.body;
        const foundUser = await User.findOne({ "email": email });

        if (foundUser.secretToken != token) {
            return res.status(422).send({ error: 'Invalid code!!' });
        }

        foundUser.active = true;
        foundUser.secretToken = ''
        foundUser.save();

        console.log('verify', foundUser.password);

        return res.send({ message: 'Verified' });

    },
    viewProfile: async (req, res) => {
        const email = req.user.email;
        return res.send({ email });
    },
    checkEmail: async (req, res) => {
        console.log('working!!!');
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(422).send({ error: 'Email does not exist!!' });
        }


        const code = makeid(6);
        console.log(code);



        const html = `Dear Customer,
            ${code} is your one time password(OTP). Please enter the OTP to proceed.
            
            Thank you,
            Team RasoiSe`

        const mailOptions = {
            from: 'projectrasoise@gmail.com',
            to: email,
            subject: 'Please verify your email',
            text: html
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                // return res.status(422).send({ error: 'Something wrong with email!!'});
            } else {
                console.log('Email sent' + info.response);
            }
        });

        await User.findOneAndUpdate(
            { "email": email },
            {
                $set: { "otp": code }
            },
            function (err, res) {
                if (err) throw err;
            }
        );

        return res.send({ message: 'Check your email' })
    },
    otpVerify: async (req, res) => {
        console.log('hii');
        const { email, otp } = req.body;
        console.log(email, otp)
        const user = await User.findOne({ email });

        if (user.otp != otp) {
            return res.status(422).send({ error: 'Invalid OTP!!' });
        }

        return res.send({ message: 'Verified' })

    },
    checkPassword: async (req, res) => {
        const password = req.body.password;
        const email = req.body.email;
        console.log(email);
        const hash = await models.hashPassword(password);
        await User.findOneAndUpdate(
            { "email": email },
            {
                $set: { "password": hash }
            },
            function (err, res) {
                if (err) throw err;
            }
        );
        res.json({ Message: "Password updated" });
    },
    editProfile: async (req, res, next) => {
        try {
            var { name, email, phone, password } = req.body;

            password = await models.hashPassword(password);

            // var chef = await Chef.find({ _id: req.user._id })
            await User.findOneAndUpdate(
                { "_id": req.user._id },
                {
                    $set: { name, password, phone, email }
                },
                function (err, res) {
                    if (err) throw err;
                }
            );

            res.send('Updated!!')

        } catch (error) {
            next(error);
        }
    }

}