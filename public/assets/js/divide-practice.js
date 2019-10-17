var wordsToPractice = [];

wordToDivide = $('#divide_Practice  .toDivide');
wrapSyllables = $('#divide_Practice .wrapSyllables ');
inputSyllables = $('#divide_Practice .inputSyllable');
numOfSyllables = $('#divide_Practice  .selectNumOfSyll');

function initialWordToPractice(words){
    wordsToPractice = words;
    console.log(wordsToPractice);
    console.log('wordsToPractice.length:'+wordsToPractice.length);
    if(wordsToPractice.length > 0){
        console.log(wordsToPractice[0].wordID);

        wordToDivide.html(wordsToPractice[0].wordID+'');
        wordToDivide.attr('index',0);
        wordToDivide.attr('title',wordsToPractice[0].wordID);
        console.log(wordToDivide);
    }
    else {
        wordToDivide.html('There are no words to practice!');
    }
}
function nextWord(index){
    index++;
    if(wordsToPractice.length < index) {
        index=0;
    }
    console.log(wordsToPractice[index].wordID);
    wordToDivide.attr('index', index);
    wordToDivide.html(wordsToPractice[index].wordID);
    wordToDivide.attr('syllables', wordsToPractice[index].wordID);

}
$(document).ready(function(){
    getWords(initialWordToPractice);
    wordToDivide = $('#divide_Practice  .toDivide');
    wrapSyllables = $('#divide_Practice .wrapSyllables ');
    inputSyllables = $('#divide_Practice .inputSyllable');
    numOfSyllables = $('#divide_Practice  .selectNumOfSyll');
    initialSelectNumOfSyllables(wrapSyllables, wordToDivide, numOfSyllables, 'inputSyllablePractice');
    initialInput(wrapSyllables, inputSyllables, numOfSyllables,'inputSyllablePractice',false);
});



function checkIfTheSyllablesIsCorrect(){
    let ans = true;
    let wordObj = wordsToPractice[wordToDivide.attr('index')];
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
    $('#alertError').remove();
    let ans = true;
    var wordToFix =    wordToDivide.html();
    inputSyllables = $('#divide_Practice .inputSyllablePractice');
    if(checkNunOFSyllables(wordToDivide.html(), numOfSyllables) && checkTheSyllables(wordToDivide.html(), inputSyllables, numOfSyllables)) {
        ans = checkIfTheSyllablesIsCorrect();
    }
    else {
        ans = false;
    }
    console.log(ans);
    if(ans === true) {
        console.log(ans);
        //TODO upDate the difficulty
        $('#good-gob').fadeOut(2000);
        setTimeout(() => {
            nextWord(wordToDivide.attr('index'));
            initialInput(wrapSyllables, inputSyllables, numOfSyllables,'inputSyllablePractice',true);
            $('#good-gob').remove();
        }, 2100);

    }
/*        $.ajax({
            type: 'PUT',
            url: "/api/words/syllables",
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
    }*/
});
$('#yes').click( function(){
    $('#delete').attr('style',displayInlineBlock);
    $('#checkIfSafe').attr('style',noneDisplay);
    deleteWords([wordsToPractice[wordToDivide.attr('index')]._id]);
    nextWord(wordToDivide.attr('index'));
});