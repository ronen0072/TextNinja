String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
String.prototype.insertAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index);
}
class Word {
    constructor(word) {
        this.WordID = word;
        this.clearWord = '';
        this.syllables = word;
        this.soundURL = '';
        this.clearWord =  this.clearTheWord();
    }
    setSyllables(_syllables){
        this.syllables = _syllables;
    }
    setSoundURL(_soundURL){
        this.soundURL = _soundURL;
    }
    getWordID(){
        return this.WordID;
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

    getHTML(index){
        var htmlTag = 'b';
        var res = "<"+htmlTag+" title= '" + this.getWordID() + "'class='wor' id='word"+index+"'>";
        res += this.getWordID();
        res += "</"+htmlTag+">";

        res += "<"+htmlTag+" title= '" + this.getWordID() + "'class='syll' id='syllables_word"+index+"'>";
        res += this.getWordID();
        res += "</"+htmlTag+"><"+htmlTag+"> </"+htmlTag+"><"+htmlTag+" class='spacing'> </"+htmlTag+">";
        return res;
    }
    clearTheWord(){
        var clearWord = this.WordID.replace(/\,|\.|\:|\'|\"|\!|\?|\%|\$|\(|\)/g, "");
        return clearWord.toLowerCase();
    }
    switchBack(syllables){
        var word = this.getWordID();
        var i,j;
        for(i = 0, j = 0; i<syllables.length; i++, j++){
            if(syllables.charAt(i).toUpperCase() === word.charAt(j)){
                syllables = syllables.replaceAt(i, word.charAt(j));
            }
            if((syllables.charAt(i) === '*') && !(word.charAt(j) === '*')) {
                i++;
            }
            if(!(syllables.charAt(i) === word.charAt(j))){
                syllables = syllables.insertAt(i, word.charAt(j));
            }
        }
        syllables = syllables.insertAt(syllables.length, word.substr(j));
        return syllables;
    }
    wordFactory(){
        var word = this;
        return new Promise(resolve => {
            $.ajax({
                type: "GET",
                url: "http://127.0.0.1:3000/api/words/"+word.getClearWord(),
                success: function(data){
                    var syllables = '';
                    if(!(data.syllables === undefined)) {
                        for (var i = 0; i < data.syllables.count - 1; i++)
                            syllables += data.syllables.list[i] + "*";
                        syllables += data.syllables.list[data.syllables.count - 1];
                        var s =word.switchBack(syllables.toLowerCase());
                        console.log(s);
                        word.setSyllables(s);
                    }
                    word.setSoundURL(data.soundURL);
                },
                error: function(jqXHR, textStatus, error){
                    word.setSyllables(word.getWordID());
                    console.log(error);
                }
            }).done(resolve);
        });
    }
}
class Words {
    constructor() {
        this.words = [];
    }
    getIndex(word){
        var index = this.words.findIndex(function(value){
            return value.getWordID() == word;
        });
        return index;
    }
    isExists(word){
        var index = this.getIndex(word);
        return index != -1;
    }
    getWord(word){
        var index = this.getIndex(word);
        return this.words[index];
    }
    findSyllables(word){
        return (this.getWord(word)).getSyllables();
    }
    updateSyllables(word, _syllables){
        (this.getWord(word)).setSyllables(_syllables);
    }
    findSoundURL(word){
        return (this.getWord(word)).getSoundURL();
    }
    updateSoundURL(word, _soundURL){
        (this.getWord(word)).setSoundURL(_soundURL);
    }
    addWord(word){
        var index = this.getIndex(word);
        if (index == -1){
            var newWord = new Word(word);
            this.words.push(newWord);
            return newWord;
        }
        else {
            return this.words[index];
        }

    }
    addWords(sentence){
        sentence = sentence.replace(/\r?\n/g, ' \n ');
        //console.log();
        var numOfSpace = sentence.length - sentence.replace(/ /g, "").length;
        var numOfWords = numOfSpace + 1;
        var res = "";
        var left = sentence+' ';
        for(i = 1; i <= numOfWords; i++){
            var temp = left.substring(0,left.indexOf(" "));
            if (temp != '' && temp !='\n'){
                var currWord = text.addWord(temp);
                res += currWord.getHTML(i);
            }
            else {
                if(temp =='\n'){
                    res += '<br/>';
                }
            }
            left = left.substring(left.indexOf(" ")+1);
        }

        return res;
        //.replace(/\r?\n/g, '<br/>')
    }
}
var text = new Words();
