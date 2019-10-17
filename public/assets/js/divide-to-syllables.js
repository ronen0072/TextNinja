var inputClassName = "";
var options ="";

for (var i = 1; i < 21 - 1; i++){
    options+=`<option value=\'${ i }\'>${ i }</option>`;
}

function initialSelectNumOfSyllables(wrapSyllables, wordToDivide, numOfSyllables, inputClassName){
    var selectNumOfSyll = $('.selectNumOfSyll');
    selectNumOfSyll.html(options);
    selectNumOfSyll.change( function() {
        inputSyllables = $('.'+inputClassName);
        console.log("change");
        $('#alertErrorTooMany').remove();
        $('#alertErrorNotContainAllTheLetters').remove();
        if(checkNunOFSyllables(wordToDivide.html(), numOfSyllables)){
            initialInput(wrapSyllables, inputSyllables, numOfSyllables, inputClassName,false);
        }
    });
}



function checkNunOFSyllables(wordToDivide, numOfSyllables){
    var alertErrorTooMany = "    <div id=\"alertErrorTooMany\" class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n" +
        "ERROR: Too many syllables, can't be more syllables then letters" +
        "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
        "        <span aria-hidden=\"true\">&times;</span>\n" +
        "      </button>\n" +
        "    </div>";
    if(wordToDivide.length < numOfSyllables.val()) {
        numOfSyllables.prev().before(alertErrorTooMany);
        return false;
    }else{
        return true;
    }
}
function checkTheSyllables(wordToDivide, inputSyllables, numOfSyllables){
    var alertErrorIncorrect = "    <div id='alertErrorNotContainAllTheLetters' class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n" +
        "ERROR: The Syllables is incorrect, The Syllables must contain all the letters of the word" +
        "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
        "        <span aria-hidden=\"true\">&times;</span>\n" +
        "      </button>\n" +
        "    </div>";
    var stringToCheck = "";
    inputSyllables.each(function(index, element){
        stringToCheck += element.value;
    });
    if(!(wordToDivide === stringToCheck)) {
        numOfSyllables.prev().before(alertErrorIncorrect);
        console.log('not a syll wordToDivide:'+wordToDivide+', stringToCheck:'+stringToCheck);
        return false;
    }else{
        return true;
    }
}

function initialInput(wrapSyllables, inputSyllables, numOfSyllables, _inputClassName,toReset){
    inputClassName = _inputClassName;
    console.log(inputClassName);
    var newSyll = [];
    if(!toReset) {
        inputSyllables.each(function (index, element) {
            newSyll[index] = element.value;
        });
    }
    else{
        numOfSyllables.val(1);
    }
    var input = "";
    wrapSyllables.html('');
    var i;
    for (i = 1; i <= numOfSyllables.val(); i++) {
        if (i <= newSyll.length) {
            input += `<input class=${inputClassName} id='syll_${i}' placeholder='syllable ${i}' value='${newSyll[i - 1]}'>`;
        }
        else {
            input += `<input class=${inputClassName} id='syll_${i}' placeholder='syllable ${i}'>`;
        }
        if(i <numOfSyllables.val())
            input += `<b>*</b>`;
    }
    wrapSyllables.html(input);
}