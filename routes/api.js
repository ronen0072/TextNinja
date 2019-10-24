const express = require('express');
const router = express.Router();
const Word_db = require('../models/Word_db');
const Messages = require('../models/message');
const User = require('../models/User');
const Word = require('../Word');
const http = require("https");
const requestPromise = require('request-promise');
var ObjectId = require('mongodb').ObjectID;
var dateFormat = require('dateformat');
const isLogin = require('../config/redirectBack').isLogin;
const calcDifficulty = require('./utils').calcDifficulty;
const incDifficulty = require('./utils').incDifficulty;
const decDifficulty = require('./utils').decDifficulty;
router.post('/contact', function(req,res){
    const {name, email, message} = req.body;
    console.log('name: '+name);
    console.log('email: '+email);
    console.log('message: '+message);
    let errors = [];
    if(!name || !email || !message){
        errors.push({msg: 'Please fill in all the fields'});
    }
    if(errors.length === 0){
        console.log('create Messages');
        Messages.create({name:name, email:email, message:message, date: new Date()})
            .then(()=>{
                req.session.pageName = 'home';
                const pageName = req.session.pageName;
                const needToLogin = req.session.needToLogin;
                req.session.needToLogin = false;
                res.render('pages/'+pageName,{user: req.user, login: needToLogin, success_msg:{msg:'Message sent!'}});
            })
            .catch((err)=>{console.log(err);});
    }
    else{
        console.log('not create Messages');
        const pageName = req.session.pageName;
        const needToLogin = req.session.needToLogin;
        req.session.needToLogin = false;
        res.render('pages/'+pageName,{user: req.user, login: needToLogin, name: name, email: email, message: message, errors: errors});
    }

});
router.get('/words/:word', function  (req,res) {
    const wordID = req.params.word;
    var wordObj = new Word(wordID);
    Word_db.findOne({wordID: wordObj.getWordID()}).then((result)=>{
        //if the word is not exists
        //console.log(result);
        if(result === null) {
            //console.log('the word is not exists');
            wordObj.initialization().then(function(){
                Word_db.create({wordID: wordObj.getWordID(), syllables: wordObj.getSyllables(), soundURL: wordObj.getSoundURL(), difficulty: calcDifficulty(wordObj)});
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
router.get('/user/details',  isLogin, function(req,res){
    var user = req.user;
    res.send({type: 'GET', username: user.username, email: user.email});
});

router.put('/user/words/:word', isLogin, function(req,res){
    var word = req.params.word;
    var user = req.user;
    Word_db.findOne({wordID: word}).then((result) => {
        User.findById(user.id).then((record) => {
            var words = record.words;
            let difficulty;
            if(!result.difficulty){
                difficulty = calcDifficulty(result);
                Word_db.updateOne(
                    {'_id': result.id},
                    {'$set': {'difficulty': difficulty}},
                    function(err) {if(err) console.log('err: '+err);}
                );
            }
            var exist = false;
            words.forEach(function (element) {
                if (element.wID === result.id) {
                    exist = true;
                    console.log(element);
                    difficulty = incDifficulty(element);
                }
            });
            //console.log(exist);
            if (!exist) {
                record.words.push({wID: result.id, word: result.wordID, difficulty: result.difficulty});
                record.save().then(() => {
                    res.send({type: 'PUT', username: record.username, wordID: result.id, word: result.wordID, difficulty: result.difficulty});
                });
            }
            else{
                console.log(difficulty);
                User.update(
                    {'_id': user.id,'words.wID': result.id},
                    {'$set': {'words.$.difficulty': difficulty}},
                    function(err) {if(err) console.log('err: '+err);}
                    )
                .then(() => {
                    res.send({type: 'PUT', username: record.username, wordID: result.id, word: result.wordID, difficulty: difficulty});
                });
            }
        });
    });
});
router.get('/user/words', isLogin, function(req,res){
    var user = req.user;
    User.findById(user.id).then((record) => {
        var words = [];
        record.words.forEach(function (word) {
            words.push(word.wID);
        });
        Word_db.find({_id: {$in: words}}).then((items) => {
            items.forEach(function (item) {
                record.words.forEach(function (word) {
                    if(item.id === word.wID){
                        item.difficulty = word.difficulty;
                        return;
                    }
                });

            });
            res.send({type: 'GET', username: record.username, words: items});
        });
    });
});
router.delete('/user/words/:words', isLogin, function(req,res){
    var user = req.user;
    var idOfWordsToDelete = req.params.words.split(',');
    var wordsToDelete = [];
    //console.log(idOfWordsToDelete);
    idOfWordsToDelete.forEach(function (id) {
        wordsToDelete.push(ObjectId(id));
        //console.log(id);
    });
    User.update(
        {_id: user.id},
        {$pull: {words: {wID: {$in: wordsToDelete}}}}
    ).then((items) => {
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
            var wikiInfo =  clearWiki(wiki[Object.keys(wiki)[0]].extract);
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
router.put('/user/words/difficulty/:wordID/:method', isLogin, function(req,res){

    var wordID = req.params.wordID;
    var method = req.params.method;
    console.log('difficulty update: '+ wordID+', method: '+method)
    var user = req.user;
    User.findById(user.id).then((record) => {
        var words = record.words;
        let difficulty;
        var exist = false;
        words.forEach(function (element) {
            if (element.wID === wordID) {
                exist = true;
                if(method === 'inc'){
                    difficulty = incDifficulty(element);
                }
                else
                    difficulty = decDifficulty(element);
                }
            }
        );
        //console.log(exist);
        if (exist) {
            User.update(
                {'_id': user.id,'words.wID': wordID},
                {'$set': {'words.$.difficulty': difficulty}},
                function(err) {if(err) console.log('err: '+err);}
            )
            .then(() => {
                res.send({type: 'PUT', username: record.username, wordID: result.id, word: result.wordID, difficulty: difficulty});
            });

        }
        else{
            res.send({type: 'ERROR', username: record.username, wordID: wordID});
        }
    });
});
module.exports = router;
function clearWiki(wikiInput){
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
