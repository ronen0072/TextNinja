class Words {
  constructor() {
    this.words = [];
  }
  getIndex(word){
    var index = this.words.findIndex(function(value){
      return value.getName() == word;
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
}
class Word {
  constructor(word) {
    this.name = word;
    this.clearName = '';
    this.syllables = word;
    this.dataFile = '';
    this.dataDir = '';
    this.soundURL = '';
    this.clearName =  this.clearTheWord();
  }
  setSyllables(_syllables){
    this.syllables = _syllables;
  }
  setSoundURL(_soundURL){
    this.soundURL = _soundURL;
  }
  getName(){
    return this.name;
  }
  getClearName(){
    return this.clearName;
  }
  getSyllables(){
    return this.syllables;
  }
  getSoundURL(){
    return this.soundURL;
  }
  clearTheWord(){
    var clearWord = this.name.replace(/\,|\.|\:|\'|\"|\!|\?|\%|\$|\(|\)/g, "");
    return clearWord.toLowerCase();
  }
  getHTML(index){
    var htmlTag = 'b';
    var res = "<"+htmlTag+" name= '" + this.getName() + "'class='invisible' onclick =clickWord('"+this.getName()+"') onmouseout = outOfWord('word"+index+"') id='syllables_word"+index+"'>";
    res += this.getName();
    res += "</"+htmlTag+">";

    res += "<"+htmlTag+" name= '" + this.getName() + "'class='visible' onmouseover = overWord('"+ this.getName() +"','word"+index+"')  id='word"+index+"'>";
    res += this.getName();
    res += "</"+htmlTag+"><"+htmlTag+"> </"+htmlTag+">";
    return res;
  }
  wordFactory(){
    if(this.getSoundURL() == ""){
      //console.log('wordFactory:'+this.getName());
      //console.log('wordFactory');
      //this = getElement(word);
      //console.log('word:'+this.getName());
      var apiKey = "bafe5fa3-9e6b-4e41-b296-04945d3f912d";
      //exmpele path: https://www.dictionaryapi.com/api/v1/references/collegiate/xml/word?key=bafe5fa3-9e6b-4e41-b296-04945d3f912d
      var path ="https://www.dictionaryapi.com/api/v1/references/collegiate/xml/"+ this.getClearName() +"?key="+apiKey;
      var word = this;
      getXMLFile(path, function(xmlDoc){
        //console.log('xmlDoc:'+xmlDoc.getElementsByTagName('hw')[0].innerHTML);
        if(xmlDoc.getElementsByTagName('hw').length != 0){
          word.setSyllables(xmlDoc.getElementsByTagName('hw')[0].innerHTML);
          if(word.getClearName().length <= word.getSyllables().length){
            console.log('1');
            if(xmlDoc.getElementsByTagName('sound').length != 0){
              var sound = xmlDoc.getElementsByTagName('sound')[0].firstChild.innerHTML;
              word.dataFile = sound.slice(0, (sound.lastIndexOf('.mp3')-3));
              word.dataDir= word.dataFile.slice(0, 1);
              if(word.dataDir == word.getClearName().slice(0, 1)){
                word.setSoundURL("https://media.merriam-webster.com/audio/prons/en/us/mp3/"+word.dataDir+"/"+word.dataFile+".mp3");
              }
            }
          }
          else {//(word.getSyllables().length <= word.getClearName().length)
            var ending = word.getClearName().slice(word.getSyllables().length, word.getClearName().length);
            console.log('ending:'+word.getSyllables().length+','+ word.getClearName().length +','+ending);
            var newPath ="https://www.dictionaryapi.com/api/v1/references/collegiate/xml/"+ word.getSyllables() +"?key="+apiKey;
            getXMLFile(newPath, function(xmlDoc){
              if(xmlDoc.getElementsByTagName('hw').length != 0){
                word.setSyllables(xmlDoc.getElementsByTagName('hw')[0].innerHTML+ending);
                //console.log(word.getSyllables());
                if(xmlDoc.getElementsByTagName('sound').length != 0){
                  var sound = xmlDoc.getElementsByTagName('sound')[0].firstChild.innerHTML;
                  word.dataFile = sound.slice(0, (sound.lastIndexOf('.mp3')-3));
                  word.dataDir= word.dataFile.slice(0, 1);
                  if(word.dataDir == word.getName().slice(0, 1)){
                    word.setSoundURL("https://media.merriam-webster.com/audio/prons/en/us/mp3/"+word.dataDir+"/"+word.dataFile+".mp3");
                  }
                }
              }
            });
          }
        }
      });
    }
  }
}
var textBox = document.getElementById('textBox');
var output = document.getElementById("output");
autosize(document.getElementById("textBox"));
var defaultValue = "Insert text";
var text = new Words();
var numOfWords = 0;
var backgroundColor = 0;
var dissolutionOfSyllables = true;
document.getElementById("syllables").checked = true;
var bold = true;
document.getElementById("onOverBold").checked = true;
textBox.value = defaultValue;
textBox.innerHTML = defaultValue;
textBox.onfocus = function() {
  if(textBox.value ==  defaultValue ){
    textBox.innerHTML = "";
  }
  output.innerHTML = textBox.value;
};
textBox.onfocus = function() {
  if(textBox.value.search(defaultValue) == -1){
    output.innerHTML = sentenceToWords(textBox.value);
  }
  else {
    textBox.value = "";
  }
  console.log('onfocus');
};
textBox.onblur = function() {
  if(textBox.value == ""){
    textBox.value = defaultValue;
    output.innerHTML = "";
  }
  else{
    if(textBox.value.search(defaultValue) == -1){
      output.innerHTML = sentenceToWords(textBox.value);
    }
  }
};


function showCoords(event) {

  var y = event.clientY - 15;
  var x = event.clientX;
  var checked = document.getElementById("markLine").checked;
  if(checked){
    console.log(backgroundColor);
    var background = "background-repeat: no-repeat; background-size: 100% 23px; background-position: 0px 0px;background-image: radial-gradient("+backgroundColor+" , "+backgroundColor+"); background-position: "+ 0 +"px "+ (y-100 -(y % 21.7)+15) +"px;"
    console.log(background);
    document.getElementById("output").style = background;
  }
}

function markLine() {
  var checked = document.getElementById("markLine").checked;
  //document.getElementById("markLine").checked = !checked;
  backgroundColor = document.getElementById('Pick').style.backgroundColor;

  console.log(backgroundColor);
  if(checked){
    document.getElementById("label1").style = "background-color:"+backgroundColor+";";
    //document.getElementById("markLine").style = "color:"+backgroundColor+";";
  }
  else {
    document.getElementById("output").style ="";
  }
}

function pick() {
  document.getElementById("label1").style = "";
  document.getElementById("markLine").checked = false;
  document.getElementById("output").style ="";
}

function syllables(){
  console.log("syllables:"+dissolutionOfSyllables);
  //document.getElementById("syllables").checked = !document.getElementById("syllables").checked;
  dissolutionOfSyllables = document.getElementById("syllables").checked;
}

function onOverBold(){
  console.log("bold:"+bold);
  //document.getElementById("onOverBold").checked = !document.getElementById("onOverBold").checked;
  bold = document.getElementById("onOverBold").checked;
}

function sentenceToWords(sentence){
  sentence = sentence.replace(/\r?\n/g, ' \n ');
  //console.log();
  var numOfSpace = sentence.length - sentence.replace(/ /g, "").length;
  numOfWords = numOfSpace + 1;
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
function clickWord(word){
  console.log(word);
  document.getElementById('sound').src = text.findSoundURL(word);
}
function overWord(word, wordId){
  var element = text.getWord(word);
  element.wordFactory();
  var tims = 0;
  var className = 'visible';
  if(bold)
    className = 'bold';
  if(dissolutionOfSyllables){
    className = 'syllables_'+className;
  }
  console.log("syllables:"+dissolutionOfSyllables);
  console.log("bold:"+bold);
  if(dissolutionOfSyllables){
  document.getElementById('syllables_'+wordId).className=className;
  document.getElementById(wordId).className='invisible';

  document.getElementById('syllables_'+wordId).innerHTML= element.getSyllables();
  var timer = setInterval(function(){
  tims +=400;
    console.log(tims + 'overWord');
    if ((element.dataFile != "") || (tims>=1200)){
      document.getElementById('syllables_'+wordId).innerHTML= element.getSyllables();
      clearInterval(timer);
    }
  }, 400);
  }
  else {
    document.getElementById(wordId).className=className;
  }

  setTimeout(function(){
    console.log('setTimeout');
    outOfWord(wordId);}, 2500);

}

function outOfWord(wordId){
  console.log('outOfWord');
  document.getElementById('syllables_'+wordId).className='invisible';
  document.getElementById(wordId).className='visible';
}

var getXMLFile = function(pathXML, callback){
  var request = new XMLHttpRequest();
  request.open("GET", pathXML, true);
  request.overrideMimeType('application/xml');
//   request.setRequestHeader("Content-Type", "text/xml");
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      callback(request.responseXML);
    }
  };
  request.send();
};

function speaker(){
  var speaker = document.getElementById('speaker');
  if(speaker.title == 'speaker'){
    console.log(speaker.title);
    speaker.title = 'mute';
    speaker.src = 'mute32.png';
    document.getElementById('sound').muted = true;
  }
  else{
    speaker.title = 'speaker';
    speaker.src = 'speaker32.png';
    document.getElementById('sound').muted = false;
  }
}
function settings(){
  var settings = document.getElementById('settings');
  if(settings.title == 'settingsOn')
    settingsOff();
  else
    settingsOn();
}
function settingsOn(){
  var settings = document.getElementById('settings');
  console.log('settingsOn');
  settings.title = 'settingsOn';
  settings.src = 'settings32on.png';
  document.getElementById('settings_content').className='dropdown-content';
}
function settingsOff(){
  var settings = document.getElementById('settings');
  console.log('settingsoff');
  settings.title = 'settingsoff';
  settings.src = 'settings32off.png';
  document.getElementById('settings_content').className='dropdown-none';
}
function clearTheinputBox(){
  var clear = document.getElementById('clear');
  textBox.value = defaultValue;
  output.innerHTML ='';
  console.log('clear');
  clear.src = 'broomClear32.png';
  setTimeout(function(){
    console.log('clear');
    clear.src = 'broom32.png';}, 300);
}
function clearTheWord(w){
  var clearWord = w.replace(/\,|\.|\:|\'|\"/g, "");

  clearWord = clearWord.replace(/\!|\?|\%|\$|\(|\)/g, "");
  console.log(clearWord);
  return clearWord;
}
