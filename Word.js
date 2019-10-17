const oxford= require('oxford-dictionaries-api');
const keys  = require('./config/keys');
const requestPromise = require('request-promise');
const parseString  = require('xml2js');
var parse = require('xml-parser');

class Word {
    constructor(word) {
        this.wordID = word;
    }
    initialization() {
                var PromiseSyllables =  getSyllablesFormWordsAPI(this.wordID).then((syllables)=> {
                    return new Promise(resolve => {
                        if(syllables === {}){
                            this.syllables = wordID;
                        }
                        else {
                            this.syllables = syllables;
                        }
                        //console.log('getSyllablesFormWordsAPI: '+ syllables);
                        resolve();
                    });
                });
                var PromiseURL = getSoundURLformOxford(this.wordID).then((URL)=> {
                    return new Promise(resolve => {
                        this.soundURL = URL;
                        //console.log('getSoundURLformOxford: '+ URL);
                        resolve();
                    });
                });
                return Promise.all([PromiseSyllables,PromiseURL]).then(() =>{
                    return new Promise(resolve => {
                        resolve();
                    });
                });
    }
    setSyllables(_syllables){
        this.syllables = _syllables;
    }
    setSoundURL(_soundURL){
        this.soundURL = _soundURL;
    }
    getWordID(){
        return this.wordID;
    }
    getSyllables(){
        return this.syllables;
    }
    getSoundURL(){
        return this.soundURL;
    }
}
function getSoundURLformOxford(wordID){
    let oxforddictionaries = new oxford(keys.Oxford.app_id, keys.Oxford.app_key);

    return oxforddictionaries.entries({word_id: wordID}).then((data)=> {
        return new Promise(resolve => {
            var soundURL = data.results[0].lexicalEntries[0].pronunciations[0].audioFile;
            //console.log(soundURL);
            resolve(soundURL);
        });
    })
    .catch(function (err) {
        return new Promise(resolve => {
            resolve(getSoundURLformDictionaryAPI(wordID));
        });

    });
}
function getSyllablesFormWordsAPI(wordID){
    var options = {
        method: 'GET',
        url: 'https://wordsapiv1.p.rapidapi.com/words/'+wordID+'/syllables',
        headers: keys.WordsAPI
    };
    return requestPromise(options).then(function (body) {
        return new Promise(resolve => {
            var jOb = JSON.parse(body).syllables;
            if(JSON.stringify(jOb) === "{}"){
                resolve(getSyllablesFormDictionaryAPI(wordID));
            }
            //console.log(jOb);
            resolve(jOb);
        });
    })
    .catch(function (err) {
        return new Promise(resolve => {
            resolve(getSyllablesFormDictionaryAPI(wordID));
        });
    });
}
function getSyllablesFormDictionaryAPI(wordID){
    var options = {
        method: 'GET',
        url: 'https://dictionaryapi.com/api/v3/references/collegiate/json/'+wordID+'?key='+keys.DictionaryAPI.apiKey
    };
    return requestPromise(options).then(function (body) {
        return new Promise(resolve => {
            var obj = JSON.parse(body);
            var count = 1;
            var syllables = [wordID];
            if((obj.length > 0)&&(obj[0].hwi)&&(obj[0].hwi.hw)) {
                console.log(wordID);
                console.log(obj);
                //console.log(obj[0].hwi.hw);
                var string = obj[0].hwi.hw;
                if (string === '') {
                    string = wordID;
                }
                syllables = string.split('*');
                count = syllables.length;
            }
            resolve({
                "count": count,
                "list": syllables
            });
        });
    })
    .catch(function (err) {
        console.log(err);
    });
};
function getSoundURLformDictionaryAPI(wordID){
    var options = {
        method: 'GET',
        url: 'https://dictionaryapi.com/api/v3/references/collegiate/json/'+wordID+'?key='+keys.DictionaryAPI.apiKey
    };
    return requestPromise(options).then(function (body) {
        return new Promise(resolve => {
            var obj = JSON.parse(body);
            //(obj[0].hwi.prs[0].sound.audio);
            console.log(wordID);
            if((obj.length > 0)&&(obj[0].hwi)&&(obj[0].hwi.prs[0])&&(obj[0].hwi.prs[0].sound)&&(obj[0].hwi.prs[0].sound.audio)) {
                var sound = obj[0].hwi.prs[0].sound.audio;
                var fileName = sound;//.slice(0, (sound.length     -4));
                var dirName= fileName.slice(0, 1);
                resolve("https://media.merriam-webster.com/audio/prons/en/us/mp3/"+dirName+"/"+fileName+".mp3");
            }
            else {
                resolve("");
            }
        });
    })
        .catch(function (err) {
            console.log(err);
        });
};
module.exports = Word;