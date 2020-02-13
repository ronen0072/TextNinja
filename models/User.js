const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

//create word Schema & model
const PracticeWord = new Schema({
    wID: String,
    word: String,
    difficulty: Number
});

//create word Schema & model
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    local:{
        password: String
    },

    facebookID: String,
    googleID: String,
    twitterID: String,
    words:[PracticeWord]
});

const User = mongoose.model('user', UserSchema);
module.exports = User;