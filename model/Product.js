const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Products = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Products',Products);