const noneDisplay = "display: none;";
const blockDisplay = "display: block;";
const displayInlineBlock = "display: inline-block;";
function update(input, output, update) {
  console.log('update');
  if(update) {
    if (textBox.val() != '') {
      sessionStorage.setItem('textBox', input);
    } else {
      sessionStorage.setItem('textBox', input);
    }
  }
  output.html(text.addWords(input));
  updateFunOfWord(update);

}
function updateFunOfWord(update){
  $('.wor').hover(function() {
        toSyllables = sessionStorage.syllables;
        bold = sessionStorage.bold;
        console.log("syllables: " + toSyllables);
        updateWord(this.title, this.id);
        if((bold === 'true')&&(toSyllables === 'false')){
          console.log('B');
          $(this).animate({
            fontSize: '118%', fontWeight: 'bold', letterSspacing: '1px',
            lineHeight: '20px', marginLeft: '0px', marginRight: '1px'
          }, 'fast');
        }
        if((bold === 'true')&&(toSyllables === 'true')){
          console.log('S&B');
          $(this).animate({
            fontSize: '118%', fontWeight: 'bold',
            lineHeight: '20px', marginLeft: '0px', marginRight: '1px'
          }, 'fast');
        }
      },
      function(){
        if(toSyllables === 'true'){
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
function updateWord(word, wordId){
  // console.log('overWord');
  // console.log('word:'+word);
  // console.log('wordId:'+wordId);
  var element = text.getWord(word);
  if (element.getSoundURL() === ""){
    element.wordFactory().then(()=> {
      if(toSyllables === 'true') {
        var syllables = element.getSyllables();
        $("#" + wordId).attr('syllables', syllables);
        $("#" + wordId).text(syllables);
        $('#syllables_' + wordId).text(element.getSyllables());
        console.log(syllables);
      }
    });
  }
  else{
    if(toSyllables === 'true') {
      var syllables = element.getSyllables();
      $("#" + wordId).attr('syllables', syllables);
      $("#" + wordId).text(syllables);
      $('#syllables_' + wordId).text(element.getSyllables());
      console.log(syllables);
    }
  }
}
function clickWord(word){
  console.log(word);
  let wordObj = text.getWord(word);
  console.log('word:',text.isExists(word));
  if(wordObj.getSoundURL !== undefined) {
    document.getElementById('sound').src = text.findSoundURL(word);
  }
  console.log("../../../api/user/words/"+wordObj.getClearWord());
  return new Promise(resolve => {
    $.ajax({
      type: 'PUT',
      url: "../../../api/user/words/"+wordObj.getClearWord(),
      success: function () {
        console.log("success");
      },
      failure: function (errMsg) {
        console.log("errMsg");
      }
    }).done(resolve);
  });
}
function showCoords(event, outputBackground) {
  /*    console.log(document.getElementById('highlighting').checked);
      console.log(sessionStorage.highlighting );*/
  var checked = sessionStorage.highlighting;
  if(checked === 'true'){
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
    backgroundColor = sessionStorage.backgroundColor;
    var width = '27px';
    var background = "background-repeat: no-repeat; background-size: 100% "+width+"; background-position: 0px 0px;background-image: radial-gradient("+backgroundColor+" , "+backgroundColor+"); background-position: "+ 0 +"px "+ (y-shift -(y % 27)+20) +"px;";
    //console.log(background);
    $(outputBackground).attr('style', background);
  }
}


// When the user clicks anywhere outside of the pop Box, close it
window.onclick=function(event) {
  if ((event.target.id !== '')&&($('#'+event.target.id).attr('class')=== popBox.attr('class')||event.target.id === wikipediaBox.attr('id'))){
    closeAll();
  }
  if (event.target.id != menu.attr('id')) {
    console.log(close);
    $('#menu').attr('style', noneDisplay);
  }
};
function closeAll(){
  console.log(close);
  $('#login-box').attr('style', noneDisplay);
  $('#signUp-box').attr('style', noneDisplay);
  $('#fixSyll-box').attr('style', noneDisplay);
  $('#wikipedia-box').attr('style', noneDisplay);
  $('.popBox').attr('style', noneDisplay);
}
