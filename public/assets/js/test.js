let getXMLFile = function(pathXML, callback){
  let request = new XMLHttpRequest();
  request.open("GET", pathXML, true);
  //request.setRequestHeader("Content-Type", "text/xml");
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      callback(request.responseXML);
    }
  };
  request.send();
};

var word = "dictionary";
var apiKey = "bafe5fa3-9e6b-4e41-b296-04945d3f912d";
var path ="https://www.dictionaryapi.com/api/v1/references/collegiate/xml/"+word+"?key="+apiKey;

getXMLFile(path, function(xmlDoc){
  console.log(xmlDoc);
});



function breakWord(word){
  //console.log("word:"+ word);
  console.log(breakWordHelpre(word,0,0,0,""));
}
function breakWordHelpre(word,av,lastAV){
  console.log("word:"+ word);
  //console.log("res:"+ res);

  if (word.length <= 1){
    return word;
  }
  //return "";
  var currentChar = word.substring(0,1);
  var currentAV = ((currentChar == 'a') || (currentChar == 'e') || (currentChar == 'i') || (currentChar == 'o') || (currentChar == 'u'));
  av += currentAV;
  if ((av > 1) && (lastAV == 0) && (currentAV == 1)){
    return "";
  }
  var res = breakWordHelpre(word.substring(1,word.length),av,currentAV);

  if (res == ""){
    //console.log("res:"+ res);
    if (lastAV == 1){
      return " "+(word.substring(0,1) + breakWordHelpre(word.substring(1,word.length),0,0));
    }
    else {
      return "";
    }
  }
  else {
    return (word.substring(0,1) + res);
  }

}

function numOfWordsInSentence(sentence){
  var numOfSpace = sentence.length - sentence.replace(/ /g, "").length;
  return numOfSpace + 1;
}




for(i = 1; i <= numOfSpace; i++){
  //console.log(left.indexOf(" "));
  //console.log(left.substring(0,left.indexOf(" ")));
  tempName = left.substring(0,left.indexOf(" "));
  res += "<b name= '" + tempName + "'class='' onmouseover = overWord('word"+i+"') onmouseout = outOfWord('word"+i+"') id='word"+i+"'' >";
  res += tempName;
  res += " </b>";
  left = left.substring(left.indexOf(" ")+1);
}
//console.log(left.length);
//console.log(left.substring(0,left.length));
res += "<b name= '" + left + "'class='invisible' onmouseover = overWord('word"+numOfWords+"') onmouseout = outOfWord('word"+numOfWords+"') id='word"+i+"'' >";
res += left;
res += "</b>";
res += "<b name= '" + left + "'class='visible' onmouseover = overWord('word"+numOfWords+"') onmouseout = outOfWord('word"+numOfWords+"') id='word"+i+"'' >";
res += left;
res += "</b>";
return res;
}



<a class="play-pron hw-play-pron converted" data-lang="en_us"
data-file="dichot07" data-dir="d"
href="https://www.merriam-webster.com/dictionary/dichotomy?pronunciation&amp;lang=en_us&amp;dir=d&amp;file=dichot07"
title="How to pronounce dichotomy (audio)">
<span class="play-box"> </span></a>

//https://media.merriam-webster.com/audio/prons/en/us/mp3/f/finish01.mp3

//https://media.merriam-webster.com/audio/prons/en/us/mp3/f/finish01.wav
