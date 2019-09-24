var menu  = $('#menu');
const toggleMenu = command => {
    menu.show();
    menu.css('block', `none`);
};
const setPosition = ({ top, left }) => {
    console.log(`${top}px`);
    menu.css('left', `${left}px`);
    menu.css('top', `${top}px`);
    /*menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;*/
    toggleMenu('show');
};

// Get the pop Box
var popBox = $('#popBox');

// Get the fix syll Box
var fixSyllBox = $('#fixSyll-box');

// Get the button that opens the fix the syllables
var fixSyll = $('#fixSyll');

// Get the <span> element that closes the fix syll Box
var closeFixSyllBox = $('#closeFixSyll');

// When the user clicks the button, open the modal
fixSyll.click( function() {
    console.log($(this));
    $('#toFix').html($('#menu').attr('title'));
    console.log("fixSyll");
    console.log("display fix the syllables");
    popBox.attr('style', display);
    fixSyllBox.attr('style', display);
});

closeFixSyllBox.click(function() {
    console.log(close);
    fixSyllBox.attr('style', noneDisplay);
    popBox.attr('style', noneDisplay);
});

var options ="";

for (var i = 1; i < 21 - 1; i++){
    options+=`<option value=\'${ i }\'>${ i }</option>`;
}
var syllCount = $('#syllCount');
syllCount.html(options);


var inputSyllablse = $('#inputSyllablses');
initialInput();
function checkNunOFSyllables(){
    var wordToFix = $('#menu').attr('title');
    var alertErrorTooMany = "<p id='alertErrorTooMany' class='alert-danger'>ERROR: Too many syllables, can't be more syllables then letters </p>";
    if(wordToFix.length < syllCount.val()) {
        syllCount.prev().before(alertErrorTooMany);
        return false;
    }else{
        return true;
    }
}
function checkTheSyllables(){
    var alertErrorIncorrect = "<p id='alertError' class='alert-danger'>ERROR: The Syllables is incorrect please fix it...</p>";
    var stringToCheck = "";
    var wordToFix = $('#menu').attr('title');
    inputSyllable.each(function(index, element){
        stringToCheck += element.value;
    });
    if(!(wordToFix === stringToCheck)) {
        syllCount.prev().before(alertErrorIncorrect);
        console.log('not a syll');
        return false;
    }else{
        return true;
    }
}
syllCount.change( function() {
    $('#alertErrorTooMany').remove();
    if(checkNunOFSyllables()){
        initialInput();
    }
});
function initialInput(){
    var newSyll = [];
    var inputSyllables = $('.inputSyllable');
    inputSyllables.each(function(index, element){
        newSyll[index]= element.value;
    });
    var input = "";
    inputSyllablse.html('');
    var i;
    for (i = 1; i <= syllCount.val(); i++) {
        if (i <= newSyll.length) {
            input += `<input class='inputSyllable' id='syll_${i}' placeholder='syllable ${i}' value='${newSyll[i - 1]}'>`;
        }
        else {
            input += `<input class='inputSyllable' id='syll_${i}' placeholder='syllable ${i}'>`;
        }
        if(i <syllCount.val())
            input += `<b>*</b>`;
    }
    inputSyllablse.html(input);
}
submitFixSyll = $('#submitFixSyll');
submitFixSyll.click( function() {
    $('#alertError').remove();
    inputSyllable = $('.inputSyllable');
    var wordToFix = $('#menu').attr('title');

    if(checkNunOFSyllables() && checkTheSyllables()) {
        console.log('submit Syllables');
        var newSyllables = "\"";
        var syll = "";
        inputSyllable.each(function (index, element) {
            if (index < syllCount.val() - 1) {
                newSyllables += element.value + "\",\"";
                syll += element.value + "*";
            } else {
                newSyllables += element.value + "\"";
                syll += element.value;
            }

        });
        text.getWord(wordToFix).setSyllables(syll);
        console.log(inputSyllable);
        var message = `{"wordID":"${wordToFix}","syllables":{"count":"${syllCount.val()}","list":[${newSyllables}]}}`
        console.log('message: ' + message);
        var data = JSON.parse(message);
        console.log(data);
        $.ajax({
            type: 'PUT',
            url: "/api/words/syllables",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                console.log(close);
                popBox.attr('style', noneDisplay);
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    }
});

