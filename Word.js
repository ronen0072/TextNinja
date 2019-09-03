const oxford= require('oxford-dictionaries-api');
const requestPromise = require('request-promise');
const parseString  = require('xml2js');
var parse = require('xml-parser');

class Word {
    constructor(word) {
        this.wordId = word;
        this.clearWord =  this.clearTheWord();
    }
    initialization() {

                var PromiseSyllables =  getSyllablesFormWordsAPI(this.clearWord).then((syllables)=> {
                    return new Promise(resolve => {
                        this.syllables = syllables;
                        //console.log('getSyllablesFormWordsAPI: '+ syllables);
                        resolve();
                    });
                });
                var PromiseURL = getSoundURLformOxford(this.clearWord).then((URL)=> {
                    return new Promise(resolve => {
                        this.soundURL = URL;
                        //console.log('getSoundURLformOxford: '+ URL);
                        resolve();
                    });
                });
                return Promise.all([PromiseSyllables,PromiseURL]).then(() =>{
                    return new Promise(resolve => {
                        //Word_db.create({wordID: wordObj.getClearWord(), syllables: wordObj.getSyllables(), URL: wordObj.getSoundURL()});
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
    getWordId(){
        return this.wordId;
    }
    getClearWord(){
        return this.clearWord;
    }
    getSyllables(){
        return this.syllables;
    }
    getSoundURL(){
        return this.soundURL;
    }

    clearTheWord(){
        var clearWord = this.wordId.replace(/\,|\.|\:|\'|\"|\!|\?|\%|\$|\(|\)/g, "")
        return clearWord.toLowerCase();
    }
    getHTML(index){
        var htmlTag = 'b';
        var res = "<"+htmlTag+" title= '" + this.getName() + "'class='wor' id='word"+index+"'>";
        res += this.getName();
        res += "</"+htmlTag+">";

        res += "<"+htmlTag+" title= '" + this.getName() + "'class='syll' id='syllables_word"+index+"'>";
        res += this.getName();
        res += "</"+htmlTag+"><"+htmlTag+"> </"+htmlTag+"><"+htmlTag+" class='spacing'> </"+htmlTag+">";
        return res;
    }


}
function getSoundURLformOxford(wordID){
    // app_id and app_key
    const app_id = '5cd4ffdd'; // insert your APP Id
    const app_key = '9bc0c41cf7772885df9f9084e720fc0a'; // insert your APP Key
    let oxforddictionaries = new oxford(app_id, app_key);

    return oxforddictionaries.entries({word_id: wordID}).then((data)=> {
        return new Promise(resolve => {
            this.soundURL = data.results[0].lexicalEntries[0].pronunciations[0].audioFile;
            resolve(this.soundURL);
        });
    });
}
function getSyllablesFormWordsAPI(wordID){
    getSyllablesFormDictionaryAPI(wordID);
    var options = {
        method: 'GET',
        url: 'https://wordsapiv1.p.rapidapi.com/words/'+wordID+'/syllables',
        headers: {
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
            'x-rapidapi-key': 'nx00f13nfWmshOLjQ67Z1NUKHKGup1YAgKZjsntcXspcZYWgQq'
        }
    };
    return requestPromise(options).then(function (body) {
        return new Promise(resolve => {
            var jOb = JSON.parse(body);
            resolve(jOb.syllables);
        });
    })
    .catch(function (err) {
        console.log(err);
    });
}
function getSyllablesFormDictionaryAPI(wordID){
    //https://www.dictionaryapi.com/api/v1/references/collegiate/xml/word?key=bafe5fa3-9e6b-4e41-b296-04945d3f912d
    var apiKey = "bafe5fa3-9e6b-4e41-b296-04945d3f912d";
    var options = {
        method: 'GET',
        url: 'https://www.dictionaryapi.com/api/v1/references/collegiate/xml/'+wordID+'?key='+apiKey
    };
    return requestPromise(options).then(function (xmlDoc) {
        return new Promise(resolve => {
            var obj = parse(xmlDoc);
            //console.log(obj.root.children[0].children[3]);
            var string = JSON.stringify(obj.root.children[0].children[2].content);
            var string2 = JSON.stringify(obj.root.children[0].children[2].content).replace(/\*/g, "");
            var count = 1+string.length-string2.length;
            console.log(count);
            string3 = JSON.stringify(obj.root.children[0].children[2].content).replace(/\*/g, ",");
            console.log({
                "count": count,
                "list": [
                    string3
                ]
            })
           /* var jOb = JSON.parse(body);
            resolve(jOb.syllables);*/
        });
    })
    .catch(function (err) {
        console.log(err);
    });
};
module.exports = Word;