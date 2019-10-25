var wordsToPractice = [];
var lastIndex = -1;
wordToDivide = $('#divide_Practice  .toDivide');
wrapSyllables = $('#divide_Practice .wrapSyllables ');
inputSyllables = $('#divide_Practice .inputSyllable');
numOfSyllables = $('#divide_Practice  .selectNumOfSyll');

function initialWordToPractice(words){
    if(sortBy === 'difficulty'){
        words.sort(compare);
    }
    wordsToPractice = words;
    console.log(wordsToPractice);
    console.log('wordsToPractice.length:'+wordsToPractice.length);
    nextWord();
}
function nextWord(){
    console.log(wordsToPractice);
    if(wordsToPractice.length > 0) {
        let nextIndex;

        if((orderBy === 'dynamic')){
            nextIndex = dynamicPolicy();
        }
        if(orderBy === 'random'){
            nextIndex = randomPolicy()
        }
        if((orderBy === 'time')||(orderBy === 'difficulty')){
            nextIndex = simplePolicy()
        }

        wordToDivide.attr('index', nextIndex);
        console.log('nextIndex: '+nextIndex );
        wordToDivide.html(wordsToPractice[nextIndex].wordID);
        wordToDivide.attr('syllables', wordsToPractice[nextIndex].wordID);
    }
    else {
        wordToDivide.html('There are no words to practice!');
    }
}

function simplePolicy(){
    let nextIndex;
    if((!wordToDivide.attr('index'))||(parseInt(wordToDivide.attr('index')) === wordsToPractice.length-1)){
        nextIndex = 0;
    }
    else{
        nextIndex =  parseInt(wordToDivide.attr('index')) + 1;
    }

    return nextIndex;
}

function randomPolicy(){
    let swap = true;
    console.log('lastIndex: '+lastIndex);
    if (lastIndex <= 0) {
        lastIndex = wordsToPractice.length - 1;
    }
    let index = parseInt(wordToDivide.attr('index'));
    let nextIndex = Math.floor(Math.random() * lastIndex);
    //swap
    if(swap){
        let temp = wordsToPractice[index];
        wordsToPractice[index] = wordsToPractice[lastIndex];
        wordsToPractice[lastIndex] = temp;
        lastIndex--;
    }
    return nextIndex;
}

function dynamicPolicy(){
    let nextIndex;
    console.log('indexUp: '+ !(wordToDivide.attr('indexUp')));
    if((!wordToDivide.attr('indexUp'))||
        ((parseInt(wordToDivide.attr('indexUp')) >= wordsToPractice.length) && (parseInt(wordToDivide.attr('indexDown')) < 0))){
        wordToDivide.attr('next','up');
        nextIndex = Math.floor(wordsToPractice.length/2);
        wordToDivide.attr('indexUp', nextIndex + 1);
        wordToDivide.attr('indexDown', nextIndex - 1);
        return nextIndex;
    }
    if(((wordToDivide.attr('next') === 'up') &&
        (parseInt(wordToDivide.attr('indexUp')) < wordsToPractice.length)) ||
        (parseInt(wordToDivide.attr('indexDown')) < 0)){
        nextIndex =  parseInt(wordToDivide.attr('indexUp'));
        wordToDivide.attr('indexUp', nextIndex + 1);
    }else{
        if(parseInt(wordToDivide.attr('indexUp')) <= wordsToPractice.length){
            nextIndex =  parseInt(wordToDivide.attr('indexDown'));
            wordToDivide.attr('indexDown', nextIndex - 1);
        }
    }
    return nextIndex;
}
$(document).ready(function(){
    getWords(initialWordToPractice);
    wordToDivide = $('#divide_Practice  .toDivide');
    wrapSyllables = $('#divide_Practice .wrapSyllables ');
    inputSyllables = $('#divide_Practice .inputSyllable');
    numOfSyllables = $('#divide_Practice  .selectNumOfSyll');
    initialSelectNumOfSyllables(wrapSyllables, wordToDivide, numOfSyllables, 'inputSyllablePractice');
    initialInput(wrapSyllables, inputSyllables, numOfSyllables,'inputSyllablePractice',false);
    $('#settings').click(practiceSettings(initialWordToPractice));
});

function checkIfTheSyllablesIsCorrect(wordObj){
    let ans = true;
    if (numOfSyllables.val() === wordObj.syllables.count+'') {
        inputSyllables.each(function (index, syllable) {
            if (syllable.value !== wordObj.syllables.list[index]) {

                ans = false;
                return;
            }
        });
    }
    else {
        var alertWrongNumOfSyllables = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n" +
            "WRONG: The number of Syllables in the word is incorrect" +
            "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
            "        <span aria-hidden=\"true\">&times;</span>\n" +
            "      </button>\n" +
            "    </div>";
        $('.wrapper').before(alertWrongNumOfSyllables);
        return false;
    }
    if(ans) {
        var alertSuccess = "<div id=\"good-gob\" class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n" +
            "GOOD JOB" +
            "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
            "        <span aria-hidden=\"true\">&times;</span>\n" +
            "      </button>\n" +
            "    </div>";
        $('.wrapper').before(alertSuccess);
    }
    else {
        var alertWrongSyllables = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n" +
            "WRONG: The division word into Syllables is incorrect" +
            "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
            "        <span aria-hidden=\"true\">&times;</span>\n" +
            "      </button>\n" +
            "    </div>";
        $('.wrapper').before(alertWrongSyllables);
    }
    return ans;

}

$('#divide_Practice .submitSyllables').click( function() {
    $('.alert').remove();
    let ans = true;
    let wordObj = wordsToPractice[wordToDivide.attr('index')];
    inputSyllables = $('#divide_Practice .inputSyllablePractice');
    if(checkNunOFSyllables(wordToDivide.html(), numOfSyllables) && checkTheSyllables(wordToDivide.html(), inputSyllables, numOfSyllables)) {
        ans = checkIfTheSyllablesIsCorrect(wordObj);
    }
    else {
        ans = false;
    }
    if(ans === true) {
        console.log(ans);
        //TODO upDate the difficulty

        $('#good-gob').fadeOut(2000);
        setTimeout(() => {
            if(wordToDivide.attr('next') !== 'up'){
                console.log('next: up');
                if(wordToDivide.attr('next') === 'none'){
                    wordToDivide.attr('next','');
                }
                else{
                    wordToDivide.attr('next','none');
                }
            }
            else{
                wordToDivide.attr('next','up');
            }
            nextWord();
            initialInput(wrapSyllables, inputSyllables, numOfSyllables,'inputSyllablePractice',true);
            $('#good-gob').remove();
        }, 2100);
        $.ajax({
            type: 'PUT',
            url: "../../../api/user/words/difficulty/"+wordObj._id+"/dec",
            success: function () {
                console.log("success");
            },
            failure: function (errMsg) {
                console.log('errMsg');
            }
        });

    }
    else{
        wordToDivide.attr('next','down');
        console.log('next: down');
        $.ajax({
            type: 'PUT',
            url: "../../../api/user/words/difficulty/"+wordObj._id+"/inc",
            success: function () {
                console.log("success");
            },
            failure: function (errMsg) {
                console.log('errMsg');
            }
        });
    }
/*
    var message = `{"wordObj":"${wordsToPractice[wordToDivide.attr('index')]}", "_id":"${wordsToPractice[wordToDivide.attr('index')]}"}`;
    console.log('message: ' + message);
    $.ajax({
        type: 'PUT',
        url: "/api/words/update-difficulty",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            console.log(close);
            popBox.attr('style', noneDisplay);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
*/

});

$('#yes').click( function(){
    $('#delete').attr('style',displayInlineBlock);
    $('#checkIfSafe').attr('style',noneDisplay);
    deleteWords([wordsToPractice[wordToDivide.attr('index')]._id]);
    nextWord();
});