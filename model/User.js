const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = new Schema({
    role: {
        type: String,
        required: true
    },
    name : {
        type: String,
        minlength: 3,
        required: function() {
            return this.role === 'member'
        }
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: function() {
            return this.role === 'member'
        }
    }
});

module.exports = mongoose.model('Users', Users);