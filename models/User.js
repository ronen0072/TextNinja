const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

//create word Schema & model
const UserSchema = new Schema({
    local:{
        username: String,
        password: String,
        email: String,
    },
    facebook:{

    },

    google:{

    }
});

const User = mongoose.model('user', WordSchema);
module.exports = User;