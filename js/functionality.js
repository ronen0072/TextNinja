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
    var res = "<"+htmlTag+" title= '" + this.getName() + "'class='wor' id='word"+index+"'>";
    res += this.getName();
    res += "</"+htmlTag+">";

    res += "<"+htmlTag+" title= '" + this.getName() + "'class='syll' id='syllables_word"+index+"'>";
    res += this.getName();
    res += "</"+htmlTag+"><"+htmlTag+"> </"+htmlTag+"><"+htmlTag+" class='spacing'> </"+htmlTag+">";
    return res;
  }
  wordFactory(){
    if(this.getSoundURL() == ""){
      //console.log('wordFactory:'+this.getName());
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
            var ending = word.getClearName().slice(word.getSyllables().length, word.getClearName().length); // TODO Improve it, not good enough
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
var text = new Words();
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
function textToWords(sentence){
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

var defaultValue = "Insert text";
var textBox = $('#textBox');
autosize(document.getElementById("textBox"));
$(document).ready(function(){
  initialSettings();
  if((!sessionStorage.textBox) || (sessionStorage.textBox == defaultValue) || (sessionStorage.textBox == '')){
    textBox.val(defaultValue);
  }
  else {
    console.log(textBox.value);
    textBox.val(sessionStorage.textBox);
  }
  updete();
  //tools
  $('#speaker').click(function(){
    speaker();
  });
  $('#settings').click(function(){
    settings();
  });
  $('#clear').click(function(){
    clearTheInputBox();
  });
  $('#output').mousemove(function(){showCoords(event);});
});
var output = document.getElementById("output");
textBox.focus(function(){
  if(textBox.value ==  defaultValue ){
    textBox.val('');
  }
});
textBox.keyup(function(){updete();});
textBox.blur(function() {
  if(textBox.val() == ""){
    console.log('empty');
    updete();
    textBox.val(defaultValue);
  }
  else {
    updete();
  }
});
function updete() {
  if((textBox.val() != defaultValue) && (textBox.val() != '')){
    sessionStorage.setItem('textBox', textBox.val());
    output.innerHTML = textToWords(textBox.val());
  }
  else {
    if(textBox.val() == ''){
      sessionStorage.setItem('textBox', textBox.val());
      output.innerHTML = textToWords(textBox.val());
    }
  }
  $('.wor').show();
  $('.syll').hide();
  $('.spacing').hover(function(){
    $('.wor').show();
    $('.syll').hide();
  });
  $('.wor').hover(function(){
    toSyllables = document.getElementById("syllables").checked;
    console.log("syllables: "+toSyllables);
    overWord(this.title, this.id)
      if(toSyllables){
      $(this).hide();
      $('#syllables_'+this.id).show();
      console.log('#syllables_'+this.id);
    }
    else {
      if(document.getElementById("bold").checked)

        $(this).animate({
          fontSize: '118%', fontWeight: '600', letterSpacing: '1px',
          lineHeight: '22px', marginLeft: '0px', marginRight: '1px'
        }, 'fast');
        //$(this).attr('class', 'unSyssables');
    }
  },
  function(){
    $(this).animate({
      fontSize: '118%', fontWeight: '500', letterSpacing: '50px;',
      lineHeight: '22px', marginLeft: '0px', marginRight: '1px'
    }, 'fast');
    //$(this).attr('class', 'wor');
  });
  $('.syll').hover(function(){
    $('.syll').hide();
    $('.wor').show();
    $('#'+this.id.substring(10,this.id.length)).hide();
    $(this).show();
  }, function(){
    $(this).hide();
    $('.wor').show();
    $('#'+this.id.substring(10,this.id.length)).show();
    console.log(this.id.substring(10,this.id.length));
  });
  $('#output').mouseout( function(){
    $('.syll').hide();
    $('.wor').show();
    //console.log('out of #output');
  });
  $('.syll').click(function(){
    clickWord(this.title);
  });
  $('.wor').click(function(){
    clickWord(this.title);
  });
  toBold();
}
function overWord(word, wordId){
  console.log('overWord');
  console.log('word:'+word);
  console.log('wordId:'+wordId);
  var element = text.getWord(word);
  console.log('element:'+element);
  element.wordFactory();
  var tims = 0;

  document.getElementById('syllables_'+wordId).innerHTML= element.getSyllables();
  var timer = setInterval(function(){
    tims +=400;
      console.log(tims + 'overWord');
      if ((element.dataFile != "") || (tims>=1200)){
        document.getElementById('syllables_'+wordId).innerHTML= element.getSyllables();
        clearInterval(timer);
      }
    }, 400);

  // setTimeout(function(){
  //   console.log('setTimeout');
  //   outOfWord(wordId);}, 2500);

}
function outOfWord(wordId){
  console.log('outOfWord: '+ wordId);
  $('#syllables_'+wordId).hide();
  console.log('#'+wordId);
  $('#'+wordId).show();
}

function speaker(){
  var speaker = $('#speaker');
  console.log(speaker.attr('title'));
  if(speaker.attr('title') == 'speaker'){
    speaker.attr('title', 'mute');
    speaker.attr('src', 'icon/mute32.png');
    $('#sound').prop("muted", true);
  }
  else{
    speaker.attr('title', 'speaker');
    speaker.attr('src', 'icon/speaker32.png');
    $('#sound').prop("muted", false);
  }
}

function clearTheInputBox(){
  textBox.val(defaultValue);
  output.innerHTML ='';
  console.log('clear');
  sessionStorage.removeItem('textBox');
  $('#clear').attr('src', 'icon/broomClear32.png');
  setTimeout(function(){
    console.log('clear');
    $('#clear').attr('src', 'icon/broom32.png');}, 300);
}

function highlighting() {
  if(!$('#highlighting').prop('checked')){
    console.log('not highlighting');
    $("#output").attr('style', '');
  }
}

function pick() {
  setTimeout(function(){
    backgroundColor = document.getElementById('Pick').style.backgroundColor;
  }, 200);
}

function showCoords(event) {
  var checked = document.getElementById("highlighting").checked;
  if(checked){
    var y = event.clientY - 15;
    var x = event.clientX;

    var shift = window.innerWidth > 768 ? 100 : 400;
    backgroundColor = document.getElementById('Pick').style.backgroundColor;
    var background = "background-repeat: no-repeat; background-size: 100% 23px; background-position: 0px 0px;background-image: radial-gradient("+backgroundColor+" , "+backgroundColor+"); background-position: "+ 0 +"px "+ (y-shift -(y % 21.7)+15) +"px;"
    console.log(background);
    $('#output').attr('style', background);
  }
}

function toBold(){
  console.log("bold:"+bold);
  //document.getElementById("bold").checked = !document.getElementById("bold").checked;
  bold = document.getElementById("bold").checked;
  if(bold){
    console.log("bold:"+bold);
    $('.syll').css('font-weight', 'bold')
  }
  else {
    console.log("NOT bold:"+bold);
    $('.syll').css('font-size', '112%');
    $('.syll').css('font-weight', 'normal');
    $('.syll').css('letter-spacing','1px');
  }

}

function clickWord(word){
  console.log(word);
  document.getElementById('sound').src = text.findSoundURL(word);
}



function settings(){
  if($('#settings').attr('title') == 'settingsOn')
    settingsOff();
  else
    settingsOn();
}
function settingsOn(){
  var settings = $('#settings');
  console.log('settingsOn');
  settings.attr('title', 'settingsOn');
  settings.attr('src', 'icon/settings32on.png');
  document.getElementById('settings_content').className='dropdown-content';
}
function settingsOff(){
  var settings = $('#settings');
  console.log('settingsoff');
  settings.attr('title', 'settingsoff');
  settings.attr('src', 'icon/settings32off.png');
  document.getElementById('settings_content').className='dropdown-none';
  updeteSettings();
}
function initialSettings(){

  if((sessionStorage.highlighting == 'true')){
    document.getElementById('highlighting').checked = true;
  }
  if(sessionStorage.backgroundColor){
    document.getElementById('Pick').style.backgroundColor = sessionStorage.backgroundColor;
  }
  if((sessionStorage.syllables == 'true') || (sessionStorage.syllables == undefined)){
    document.getElementById("syllables").checked = true;
  }
  else{
    document.getElementById("syllables").checked = false;
  }
  if((sessionStorage.bold == 'true') || (sessionStorage.bold == undefined)){
    document.getElementById("bold").checked = true;
  }
  else{
    document.getElementById("bold").checked = false;
  }
  if(sessionStorage.font_size != undefined){
    document.getElementById("font_size").value = sessionStorage.font_size;
  }
  else{
     document.getElementById("font_size").value = 12;
  }
  console.log('---------initialSettings-----------');
  console.log('highlighting: '+  document.getElementById('highlighting').checked);
  console.log('backgroundColor: ', document.getElementById('Pick').style.backgroundColor );
  console.log('syllables: '+  document.getElementById('syllables').checked);
  console.log('bold: '+  document.getElementById("bold").checked);
  console.log('font_size: '+  document.getElementById("font_size").value);

}
function updeteSettings(){
  sessionStorage.setItem('highlighting', document.getElementById('highlighting').checked);
  sessionStorage.setItem('backgroundColor', document.getElementById('Pick').style.backgroundColor );
  sessionStorage.setItem('syllables', document.getElementById('syllables').checked);
  sessionStorage.setItem('bold', document.getElementById("bold").checked);
  sessionStorage.setItem('font_size', document.getElementById("font_size").value);
  console.log('---------updeteSettings-----------');
  console.log('highlighting: '+  sessionStorage.highlighting);
  console.log('backgroundColor: '+  sessionStorage.backgroundColor);
  console.log('syllables: '+  sessionStorage.syllables);
  console.log('bold: '+  sessionStorage.bold);
  console.log('font_size: '+  sessionStorage.font_size);

}
