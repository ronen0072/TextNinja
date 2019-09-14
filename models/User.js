const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

//create word Schema & model
const UserSchema = new Schema({
    username: String,
    local:{
        password: String,
        email: String
    },

    facebookID: String,
    googleID: String

});

const User = mongoose.model('user', UserSchema);
module.exports = User;