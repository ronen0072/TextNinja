const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


//create word Schema & model
const MessgaeSchema = new Schema({
    name: String,
    email: String,
    message: String,
    date: Date,
});

const Message = mongoose.model('message', MessgaeSchema);
module.exports = Message;