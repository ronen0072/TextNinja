var textBox = $('#textBox');
//autosize(document.getElementById("textBox"));
$(document).ready(function(){
  initialSettings();
  if(sessionStorage.textBox){
    console.log(textBox.value);
    textBox.val(sessionStorage.textBox);
  }
  updete(textBox.val(), output, true);
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
  $('#output').mousemove(function(){showCoords(event, '#output')});
});

var output = $("#output");
textBox.keyup(function(){updete(textBox.val(), output, true);});
textBox.blur(function() {
  if(textBox.val() == ""){
    console.log('empty');
    updete(textBox.val(), output, true);
  }
  else {
    updete(textBox.val(), output, true);
  }
});
function updete(input, output, update) {
  console.log('updete');
  if(update) {
    if (textBox.val() != '') {
      sessionStorage.setItem('textBox', input);
    } else {
      sessionStorage.setItem('textBox', input);
    }
  }
  output.html(text.addWords(input));
  updatefunOfWord(update);

}
function updateWord(word, wordId){
  // console.log('overWord');
  // console.log('word:'+word);
  // console.log('wordId:'+wordId);
  var element = text.getWord(word);
  if (element.getSoundURL() === ""){
    element.wordFactory().then(()=> {
      if(toSyllables) {
        var syllables = element.getSyllables();
        $("#" + wordId).attr('syllables', syllables);
        $("#" + wordId).text(syllables);
        $('#syllables_' + wordId).text(element.getSyllables());
        console.log(syllables);
      }
    });
  }
  else{
    if(toSyllables) {
      var syllables = element.getSyllables();
      $("#" + wordId).attr('syllables', syllables);
      $("#" + wordId).text(syllables);
      $('#syllables_' + wordId).text(element.getSyllables());
      console.log(syllables);
    }
  }
}

function updatefunOfWord(update){
  $('.wor').hover(function() {
        toSyllables = document.getElementById("syllables").checked;
        bold = document.getElementById("bold").checked;
        console.log("syllables: " + toSyllables);
        updateWord(this.title, this.id);
        if(bold&&!toSyllables){
          $(this).animate({
            fontSize: '118%', fontWeight: 'bold', letterSspacing: '1px',
            lineHeight: '20px', marginLeft: '0px', marginRight: '1px'
          }, 'fast');
        }
        if(bold&&toSyllables){
          $(this).animate({
            fontSize: '118%', fontWeight: 'bold',
            lineHeight: '20px', marginLeft: '0px', marginRight: '1px'
          }, 'fast');
        }
      },
      function(){
        if(toSyllables){
          $(this).text($(this).attr('title'));
        }
        if(bold) {
          $(this).animate({
            fontSize: '112%',
            letterSpacing: '2.3px',
            lineHeight: '22px',
            marginLeft: '0px',
            marginRight: '1px'
          }, 'fast');
        }
      });
  $('.wor').click(function(){
    clickWord(this.title);
  });
  $('.wor' ).contextmenu(function(e) {
    $('#menu').attr('title',this.title);
    console.log($('#menu').attr('title'));
    checkWikipedia(update);
    e.preventDefault();
    const origin = {
      left: e.pageX,
      top: e.pageY
    };
    setPosition(origin);
  });
}

function speaker(){
  var speaker = $('#speaker');
  console.log(speaker.attr('title'));
  if(speaker.attr('title') == 'speaker'){
    speaker.attr('title', 'mute');
    speaker.attr('src', '/assets/icon/mute32.png');
    $('#sound').prop("muted", true);
  }
  else{
    speaker.attr('title', 'speaker');
    speaker.attr('src', '/assets/icon/speaker32.png');
    $('#sound').prop("muted", false);
  }
}

function clearTheInputBox(){
  textBox.val('');
  output.text('');
  console.log('clear');
  sessionStorage.removeItem('textBox');
  $('#clear').attr('src', '/assets/icon/broomClear32.png');
  setTimeout(function(){
    console.log('clear');
    $('#clear').attr('src', '/assets/icon/broom32.png');}, 300);
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
  document.getElementById('highlighting').checked = true;
}

function showCoords(event, outputBackground) {
  var checked = document.getElementById("highlighting").checked;
  if(checked){
    var y = event.clientY - 30;
    var x = event.clientX;
    var shift = 0;
    if(outputBackground === '#output') {
      shift = window.innerWidth > 768 ? 100 : 400;
    }
    if(outputBackground === '.inner-content') {
      shift = 176;
    }
    if(outputBackground === '#wikiInfo') {
      shift = 184;
    }
    backgroundColor = document.getElementById('Pick').style.backgroundColor;
    var whidth = '27px';
    var background = "background-repeat: no-repeat; background-size: 100% "+whidth+"; background-position: 0px 0px;background-image: radial-gradient("+backgroundColor+" , "+backgroundColor+"); background-position: "+ 0 +"px "+ (y-shift -(y % 27)+20) +"px;";
    //console.log(background);
    $(outputBackground).attr('style', background);
  }
}

function clickWord(word){
  console.log(word);
  document.getElementById('sound').src = text.findSoundURL(word);
  var data = "";
  console.log("../../../api/user/words/"+word);
  return new Promise(resolve => {
    $.ajax({
      type: 'PUT',
      url: "../../../api/user/words/"+word,
      success: function () {
        console.log("success");
      },
      failure: function (errMsg) {
        console.log("errMsg");
      }
    }).done(resolve);
  });
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
  settings.attr('src', '/assets/icon/settings32on.png');
  document.getElementById('settings_content').className='dropdown-content';
}
function settingsOff(){
  var settings = $('#settings');
  console.log('settingsoff');
  settings.attr('title', 'settingsoff');
  settings.attr('src', '/assets/icon/settings32off.png');
  document.getElementById('settings_content').className='dropdown-none';
  updateSettings();
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
function updateSettings(){
  sessionStorage.setItem('highlighting', document.getElementById('highlighting').checked);
  sessionStorage.setItem('backgroundColor', document.getElementById('Pick').style.backgroundColor );
  sessionStorage.setItem('syllables', document.getElementById('syllables').checked);
  sessionStorage.setItem('bold', document.getElementById("bold").checked);
  sessionStorage.setItem('font_size', document.getElementById("font_size").value);
  console.log('---------updateSettings-----------');
  console.log('highlighting: '+  sessionStorage.highlighting);
  console.log('backgroundColor: '+  sessionStorage.backgroundColor);
  console.log('syllables: '+  sessionStorage.syllables);
  console.log('bold: '+  sessionStorage.bold);
  console.log('font_size: '+  sessionStorage.font_size);

}



/*window.onclick=function(event) {
 /!* console.log(event.target.id);
  if (event.target.id == menu.attr('id')){*!/
  var display = "display: none;";
  console.log(close);
  menu.attr('style', display);
  //}
}*/
