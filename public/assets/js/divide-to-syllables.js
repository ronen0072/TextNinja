var inputClassName = "";
var options ="";

for (var i = 1; i < 21 - 1; i++){
    options+=`<option value=\'${ i }\'>${ i }</option>`;
}
var numOfSyllables = $('#numOfSyllables');
var selectNumOfSyll = $('.selectNumOfSyll');
selectNumOfSyll.html(options);
selectNumOfSyll.change( function() {
    inputSyllables = $('.'+'inputSyllable');
    console.log("change");
    $('#alertErrorTooMany').remove();
    if(checkNunOFSyllables(wordToDivide.html(), numOfSyllables)){
        initialInput(wrapSyllables, inputSyllables, numOfSyllables,'inputSyllable');
    }
});


function checkNunOFSyllables(wordToDivide, numOfSyllables){
    var alertErrorTooMany = "<p id='alertErrorTooMany' class='alert-danger'>ERROR: Too many syllables, can't be more syllables then letters </p>";
    if(wordToDivide.length < numOfSyllables.val()) {
        numOfSyllables.prev().before(alertErrorTooMany);
        return false;
    }else{
        return true;
    }
}
function checkTheSyllables(wordToDivide, inputSyllable, numOfSyllables){
    var alertErrorIncorrect = "<p id='alertError' class='alert-danger'>ERROR: The Syllables is incorrect please fix it...</p>";
    var stringToCheck = "";
    inputSyllable.each(function(index, element){
        stringToCheck += element.value;
    });
    if(!(wordToDivide === stringToCheck)) {
        numOfSyllables.prev().before(alertErrorIncorrect);
        console.log('not a syll');
        return false;
    }else{
        return true;
    }
}

function initialInput(wrapSyllables, inputSyllables, numOfSyllables, _inputClassName){
    inputClassName = _inputClassName;
    console.log(inputClassName);
    var newSyll = [];
    inputSyllables.each(function(index, element){
        newSyll[index]= element.value;
    });

    var input = "";
    wrapSyllables.html('');
    var i;
    for (i = 1; i <= numOfSyllables.val(); i++) {
        if (i <= newSyll.length) {
            input += `<input class='inputClassName' id='syll_${i}' placeholder='syllable ${i}' value='${newSyll[i - 1]}'>`;
        }
        else {
            input += `<input class='inputClassName' id='syll_${i}' placeholder='syllable ${i}'>`;
        }
        if(i <numOfSyllables.val())
            input += `<b>*</b>`;
    }
    wrapSyllables.html(input);
}