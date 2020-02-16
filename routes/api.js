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
const auth = require('../middleware/auth');

// @route POST api/contact
// @desc put in DB the message that get from the user
// @access public
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

// @route GET api/words/:word
// @desc get word from the user and response the syllables ans soundURL of the word.
// @access public
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

// @route PUT api/words/syllables
// @desc get word and new syllables to update the word syllables in the DB.
// @access public
router.put('/words/syllables', function(req,res){
    var req_word = req.body;
    //var wordO = new Word(req_word);
    Word_db.findOneAndUpdate({wordID: req_word.wordID},{syllables:req_word.syllables}).then((result)=>{
        //console.log('the word is already exists');
        res.send({type: 'PUT', wordID: result.wordID, syllables: result.syllables, soundURL: result.soundURL});

    });
    res.send({type:'PUT' , word:req_word});

});

// @route GET api/user/details
// @desc Get user data.
// @access Registered users who are logged in
router.get('/user/data',  auth, function(req,res){
    let user = req.user;
    User.findById(user.id)
        .select('-local -facebookID -googleID')
        .then(user=>{
            res.json(user);
        });
});

// @route PUT api/user/words/:word
// @desc insert to the user word in the DB
// @access Registered users who are logged in
router.put('/user/words/:word', auth, function(req,res){
    console.log( req.params.word);
    let word = req.params.word;
    let user = req.user;
    Word_db.findOne({wordID: word}).then((result) => {
        User.findById(user.id).then((record) => {
            let words = record.words;
            let difficulty;
            if(!result.difficulty){
                difficulty = calcDifficulty(result);
                Word_db.updateOne(
                    {'_id': result.id},
                    {'$set': {'difficulty': difficulty}},
                    function(err) {if(err) console.log('err: '+err);}
                );
            }
            let exist = false;
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

// @route GET api/user/words
// @desc response array of words from the user.
// @access Registered users who are logged in
router.get('/user/words', auth, function(req,res){
    let user = req.user;
    User.findById(user.id).then((record) => {
        let words = [];
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

// @route DELETE api/user/words/:words
// @desc delete array of words from the array of words in the user.
// @access Registered users who are logged in
router.delete('/user/words/:words', auth, function(req,res){
    let user = req.user;
    let idOfWordsToDelete = req.params.words.split(',');
    let wordsToDelete = [];
    //console.log(idOfWordsToDelete);
    idOfWordsToDelete.forEach(function (id) {
        wordsToDelete.push(ObjectId(id));
        //console.log(id);
    });
    User.update(
        {_id: user.id},
        {$pull: {words: {wID: {$in: wordsToDelete}}}}
    )
    .then((items) => {
        console.log("items: ");
        console.log(items);
        res.send({type: 'DELETE', username: req.user.username, words: items});
    })
    .catch((err)=>{
        res.send({type: 'DELETE FAIL', ERROR: err});
    })
});

// @route GET api/word/wiki/:word
// @desc response info from words from wikipedia about the word.
// @access public
router.get('/word/wiki/:word', function(req,res){
    let word = req.params.word;
    let options = {
        method: 'GET',
        url: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles='+word,
    };
    return requestPromise(options).then(function (body) {
        let jOb = JSON.parse(body);
        let wiki = jOb.query.pages;
        if(!(wiki[Object.keys(wiki)[0]].pageid === undefined)) {
            let title =  wiki[Object.keys(wiki)[0]].title;
            let wikiInfo =  clearWiki(wiki[Object.keys(wiki)[0]].extract);
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

// @route PUT api/user/words/difficulty/:wordID/:method
// @desc update the word difficulty
// @access Registered users who are logged in
router.put('/user/words/difficulty/:wordID/:method', auth, function(req,res){

    let wordID = req.params.wordID;
    let method = req.params.method;
    console.log('difficulty update: '+ wordID+', method: '+method)
    let user = req.user;
    User.findById(user.id).then((record) => {
        let words = record.words;
        let difficulty;
        let exist = false;
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
                res.send({type: 'PUT', username: record.username, wordID: wordID, difficulty: difficulty});
            });

        }
        else{
            res.send({type: 'ERROR', username: record.username, wordID: wordID});
        }
    });
});

function clearWiki(wikiInput){
    for(let i = 0; i < wikiInput.length; i++){
        let toClaer = false;
        if(wikiInput.charAt(i) === '<'){
            for(let j = 0; j < wikiInput.length; j++){
                let tag =  wikiInput.substring(i,j+1);
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
    let startIndex;
    let endIndex;
    for(startIndex = 0;  ((i < wikiInput.length) && (wikiInput.charAt(startIndex) === '\n')); startIndex++){}
    for(endIndex = wikiInput.length;  ((endIndex > 0) && (wikiInput.charAt(j) === '\n')); endIndex--){}
    wikiInput = wikiInput.substring(startIndex,j);
    return wikiInput;
}
module.exports = router;