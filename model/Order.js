const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  addressDestination: {
    type: String,
    required: true
  },
  order: {
    type: [
      {
        _id: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model("Order", Order);