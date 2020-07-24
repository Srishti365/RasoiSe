const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'projectrasoise@gmail.com',
        pass: 'R00t1234'
    }
});

module.exports = transporter;