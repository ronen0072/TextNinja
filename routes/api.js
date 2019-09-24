const express = require('express');
const router = express.Router();
const Word_db = require('../models/Word_db');
const User = require('../models/User');
const Word = require('../Word');
const http = require("https");
const requestPromise = require('request-promise');
var ObjectId = require('mongodb').ObjectID;

router.get('/words/:word', function  (req,res) {
    const wordID = req.params.word;
    var wordObj = new Word(wordID);
    Word_db.findOne({wordID: wordObj.getWordID()}).then((result)=>{
        //if the word is not exists
        //console.log(result);
        if(result === null) {
            //console.log('the word is not exists');
            wordObj.initialization().then(function(){
                Word_db.create({wordID: wordObj.getWordID(), syllables: wordObj.getSyllables(), soundURL: wordObj.getSoundURL()});
                res.send({type: 'GET', wordID: wordObj.getWordID(), syllables: wordObj.getSyllables(), soundURL: wordObj.getSoundURL()});
            });
        }
        else {
            //console.log('the word is already exists');
            res.send({type: 'GET', wordID: wordObj.getWordID(), syllables: result.syllables, soundURL: result.soundURL});
        }
    });
});

router.put('/words/syllables', function(req,res){
    var req_word = req.body;
    //var wordO = new Word(req_word);
    Word_db.findOneAndUpdate({wordID: req_word.wordID},{syllables:req_word.syllables}).then((result)=>{
        //console.log('the word is already exists');
        res.send({type: 'PUT', wordID: result.wordID, syllables: result.syllables, soundURL: result.soundURL});

    });
    res.send({type:'PUT' , word:req_word});

});
router.get('/user/details', function(req,res){
    var user = req.user;
    if(user !== undefined){
        res.send({type: 'GET', username: user.username, email: user.email});
    }
    res.send({type: 'GET', message: 'User is not connected'});
});

router.put('/user/words/:word', function(req,res){
    var word = req.params.word;
    var user = req.user;
    //var wordO = new Word(req_word);
/*    console.log(word);
    console.log(user);*/
    Word_db.findOne({wordID: word}).then((result)=>{
        User.findById(user.id).then((record)=>{

            var words = record.words;
            var exist = false;
            words.forEach(function(element) {
                if(element.wID === result.id){
                    exist = true;
                }
            });
            //console.log(exist);
            if(!exist){
                record.words.push({wID: result.id, word: result.wordID});
                record.save().then(() => {
                    res.send({type: 'PUT', username: record.username, wordID: result.id, word: result.wordID});
                });
            }
        });
    });
});
router.get('/user/words', function(req,res){
    var user = req.user;
    User.findById(user.id).then((record)=>{
        var words = [];
        record.words.forEach(function (word) {
            words.push(word.wID);
        });
        Word_db.find({ _id: { $in: words }}).then((items)=>{
            //console.log(items);
            res.send({type: 'GET', username: record.username, words: items});
        });
    });
});
router.delete('/user/words/:words', function(req,res){
    var user = req.user;
    var idOfWordsToDelete = req.params.words.split(',');
    var wordsToDelete = [];
    //console.log(idOfWordsToDelete);
    idOfWordsToDelete.forEach(function (id) {
        wordsToDelete.push(ObjectId(id));
        //console.log(id);
    });
    User.update(
        { _id: user.id },
        { $pull: { words: { wID: {$in: wordsToDelete }}} }
    ).then((items)=>{
        console.log("items: ");
        console.log(items);
        res.send({type: 'DELETE', username: req.user.username, words: items});
    });
});
router.get('/word/wiki/:word', function(req,res){
    var word = req.params.word;
    var options = {
        method: 'GET',
        url: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles='+word,
    };
    return requestPromise(options).then(function (body) {
        var jOb = JSON.parse(body);
        var wiki = jOb.query.pages;
        if(!(wiki[Object.keys(wiki)[0]].pageid === undefined)) {
            var title =  wiki[Object.keys(wiki)[0]].title;
            var wikiInfo =  clearwWiki(wiki[Object.keys(wiki)[0]].extract);
            res.send({type: 'GET', wiki:{title: title, info: wikiInfo}});
        }
        else{
            res.send({type: 'GET', wiki: 'not-exists'});

        }
    })
    .catch(function (err) {
        console.log(err);
    });
});
module.exports = router;
function clearwWiki(wikiInput){
    for(var i = 0; i < wikiInput.length; i++){
        var toClaer = false;
        if(wikiInput.charAt(i) === '<'){
            for(var j = 0; j < wikiInput.length; j++){
                var tag =  wikiInput.substring(i,j+1);
                if(toClaer || (tag = '<b') || (tag = '</b') ||(tag = '<p') || (tag = '</p') || (tag = '<span') || (tag = '</span')|| (tag = '<ul') || (tag = '</ul')|| (tag = '<li') || (tag = '</li')){
                    toClaer = true;
                }
                if (toClaer && (wikiInput.charAt(j) === '>')){
                    //console.log("Claer from: "+ i+", to: "+j+'\n'+wikiInput.substring(i,j+1));
                    wikiInput = wikiInput.replace(wikiInput.substring(i,j+1),"");
                    i--;
                    break;
                }
            }
        }
    }
    var i;
    var j;
    for(i = 0;  ((i < wikiInput.length) && (wikiInput.charAt(i) === '\n')); i++);
    for(j = wikiInput.length;  ((j > 0) && (wikiInput.charAt(j) === '\n')); j--);
    wikiInput = wikiInput.substring(i,j);
    return wikiInput;
}
