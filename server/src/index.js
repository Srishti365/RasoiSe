require('./models/User');
require('./models/Track');
const models = require('./models/models')
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes');
// const trackRoutes = require('./routes/trackRoutes');
// const requireAuth = require('./middlewares/requireAuth');

// const app = express();

// app.use(bodyParser.json());
// app.use(authRoutes);
// app.use(trackRoutes);

// //connect to db
// mongoose.connect("mongodb://localhost/track-server", {
//   useNewUrlParser: true,
//   useCreateIndex: true
// });

// mongoose.connection.on('connected', () => {
//     console.log('Connected to mongo instance');
// });
// mongoose.connection.on('error', (err) => {
//     console.error('Error connecting to mongo',err);
// });


// app.get('/', requireAuth, (req,res) => {
//     res.send(`Your email ${req.user.email}`);
// });


// app.listen(3000, () => {
//     console.log('App listening on port 3000');
// }) 


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requireAuth = require('./middlewares/requireAuth');
const engines = require("consolidate");

const adminRouter = require('./routes/admin.router')

Chef = models.chef;
Menu = models.menu;



// var chef1 = new Chef({
//   name: 'Tonio',
//   location: 'Morioh'
// });
// chef1.save();

// var menu1 = new Menu({
//   name: "chicken noodles",
//   category: "non-veg",
//   description: "noodles",
//   price: 180,
//   chef: "5e7efdbf6a28bc167466595c"
// });

// menu1.save();

const MONGODB_URI = 'mongodb+srv://user1:root1234@cluster0-awifx.mongodb.net/rasoiSe?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);


// mongoose.connect(MONGODB_URI || "mongodb://localhost/rasoi", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// });

const app = express();

app.engine("ejs", engines.ejs);
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");


//Middlewares
app.use(bodyParser.json());

//Routes
app.use('/admin', adminRouter)
app.use('', require('./routes/authRoutes'));
app.use('/chef', require('./routes/chefRoutes'));
app.use('/home', require('./routes/menu'));
app.use('/payment', require('./routes/stripe'));
app.use('', require('./routes/unauthRoutes'));
app.use('/cart', require('./routes/cart'));
app.use('/cook', require('./routes/chefdetails'))

// app.get('/', requireAuth, (req, res) => {
//   res.send(`Your email ${req.user.email}`);
// });

//Start server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at ${port}`);