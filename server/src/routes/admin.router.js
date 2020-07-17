const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const mongoose = require('mongoose')
const { verify } = require('jsonwebtoken')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',
    branding: {
        companyName: 'RasoiSe',
        logo: 'https://previews.123rf.com/images/sergeypykhonin/sergeypykhonin1604/sergeypykhonin160400034/55349020-restaurant-diner-vector-logo-dish-meal-food-or-chef-icon.jpg',
        softwareBrothers: false

    },
    dashboard: {
        handler: async () => {

        },
        component: AdminBro.bundle('../views/admin-dashboard')
    },
})

const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'rasoise@gmail.com',
    password: process.env.ADMIN_PASSWORD || 'root1234',
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
    authenticate: async (email, password) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN
        }
        return null
    }

}
    , null, {
    resave: false,
    saveUninitialized: true,
}
)

module.exports = router

// admin panel for our app