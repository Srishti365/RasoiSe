const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const executiveSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    address: {
        type: String,
        default: "mumbai,maharashtra,india"
    },
    geometry: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
            default: [72.83308, 18.92763]
        }
    },
});





const Executive = mongoose.model('Executive', executiveSchema);

module.exports = { Executive };



