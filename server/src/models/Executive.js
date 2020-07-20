const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const executiveSchema = new Schema({
    email: {
        type:String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type:String
    }
});





const Executive = mongoose.model('Executive', executiveSchema);

module.exports = { Executive };



