var textBox = $('#textBox');
autosize(document.getElementById("textBox"));
$(document).ready(function(){
  initialSettings();
  if(sessionStorage.textBox){
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
var output = $("#output");
textBox.keyup(function(){updete();});
textBox.blur(function() {
  if(textBox.val() == ""){
    console.log('empty');
    updete();
  }
  else {
    updete();
  }
});
function updete() {
  if(textBox.val() != ''){
    sessionStorage.setItem('textBox', textBox.val());
  }
  else {
    sessionStorage.setItem('textBox', textBox.val());
  }
  output.html(text.addWords(textBox.val()));
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
  $('.syll' ).contextmenu(function(e) {
    $('#menu').attr('title',this.title)
    e.preventDefault();
    const origin = {
      left: e.pageX,
      top: e.pageY
    };
    setPosition(origin);
  });
  toBold();
}
function overWord(word, wordId){
  // console.log('overWord');
  // console.log('word:'+word);
  // console.log('wordId:'+wordId);
  var element = text.getWord(word);
  if (element.getSoundURL() === ""){
    element.wordFactory().then(()=> {
        $('#syllables_'+wordId).text(element.getSyllables());
    });
  }
  else{
    $('#syllables_'+wordId).text(element.getSyllables());
  }
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
  settings.attr('src', '/assets/icon/settings32on.png');
  document.getElementById('settings_content').className='dropdown-content';
}
function settingsOff(){
  var settings = $('#settings');
  console.log('settingsoff');
  settings.attr('title', 'settingsoff');
  settings.attr('src', '/assets/icon/settings32off.png');
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



/*window.onclick=function(event) {
 /!* console.log(event.target.id);
  if (event.target.id == menu.attr('id')){*!/
  var display = "display: none;";
  console.log(close);
  menu.attr('style', display);
  //}
}*/
