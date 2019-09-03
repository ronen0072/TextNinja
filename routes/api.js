const express = require('express');
const router = express.Router();
const Word_db = require('../models/Word_db');
const Word = require('../Word');
const http = require("https");

router.get('/words/:word', function  (req,res) {
    const wordID = req.params.word;

    var wordObj = new Word(wordID);
    /*Word_db.findOne({wordID: wordObj.getClearWord()}).then((result)=>{
        //if the word is not exists
        console.log(result);
        if(result === null) {*/
            console.log('the word is not exists');
            wordObj.initialization().then(function(){
                Word_db.create({wordID: wordObj.getClearWord(), syllables: wordObj.getSyllables(), soundURL: wordObj.getSoundURL()});
                res.send({type: 'GET', wordID: wordObj.getClearWord(), syllables: wordObj.getSyllables(), soundURL: wordObj.getSoundURL()});
            });
/*        }
        else {
            console.log('the word is already exists');
            res.send({type: 'GET', wordID: wordObj.getClearWord(), syllables: result.syllables, soundURL: result.soundURL});
        }
    });*/
});

router.post('/words/', function(req,res){
    var req_word = req.body;
    //var wordO = new Word(req_word);
    console.log(req_word);
    res.send({type:'POST' , word:req_word});
});
module.exports = router;