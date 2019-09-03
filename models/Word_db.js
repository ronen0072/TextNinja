const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

//create word Schema & model
const WordSchema = new Schema({
    wordID:{
        type: String,
        required:[true,'Word field is required']
    },
    syllables:{
        type: Object
    },

    soundURL:{
        type: String
    }
});

const Word_db = mongoose.model('word_db', WordSchema);
module.exports = Word_db;