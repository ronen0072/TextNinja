var wordToDivide = $('#toDivide');
var wrapSyllables = $('#wrapSyllables');
var inputSyllables = $('.inputSyllable');
var numOfSyllables = $('#numOfSyllables');

// Get the pop Box
var popBox = $('#popBox');

// Get the fix syll Box
var fixSyllBox = $('#fixSyll-box');

// Get the button that opens the fix the syllables
var fixSyll = $('#fixSyll');

// Get the <span> element that closes the fix syll Box
var closeFixSyllBox = $('#closeFixSyll');

initialInput(wrapSyllables, inputSyllables, numOfSyllables,'inputSyllable');


// When the user clicks the button, open the modal
fixSyll.click( function() {
    console.log($(this));
    $('#toDivide').html($('#menu').attr('title'));
    console.log("fixSyll");
    console.log("display fix the syllables");
    popBox.attr('style', blockDisplay);
    fixSyllBox.attr('style', blockDisplay);
});

closeFixSyllBox.click(function() {
    console.log(close);
    fixSyllBox.attr('style', noneDisplay);
    popBox.attr('style', noneDisplay);
});

$('#submitSyllables').click( function() {
    $('#alertError').remove();
    var wordToFix = wordToDivide.html();

    if(checkNunOFSyllables(wordToDivide.html(), numOfSyllables) && checkTheSyllables(wordToDivide.html(), inputSyllables, numOfSyllables)) {
        console.log('submit Syllables');
        var newSyllables = "\"";
        var syll = "";
        inputSyllables.each(function (index, element) {
            if (index < numOfSyllables.val() - 1) {
                newSyllables += element.value + "\",\"";
                syll += element.value + "*";
            } else {
                newSyllables += element.value + "\"";
                syll += element.value;
            }

        });
        text.getWord(wordToFix).setSyllables(syll);

        var message = `{"wordID":"${wordToFix}","syllables":{"count":"${numOfSyllables.val()}","list":[${newSyllables}]}}`;
        console.log('message: ' + message);
        var data = JSON.parse(message);

        $.ajax({
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
    }
});
