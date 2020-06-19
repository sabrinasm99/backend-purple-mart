const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = new Schema({
    role: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: function() {
            return this.role === 'member'
        }
    },
    username: {
        type: String,
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