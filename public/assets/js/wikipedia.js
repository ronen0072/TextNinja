// Get the fix syll Box
var wikipediaBox = $('#wikipedia-box');

// Get the button that opens the fix the syllables
var seeWikipedeia = $('#seeWikipedia');

// Get the <span> element that closes the fix syll Box
var closeWikipediaBox = $('#closeWikipedia');

seeWikipedeia.click( function() {
    checkWikipedia(true);
    $('.inner-content').mousemove(function(){showCoords(event, '.inner-content')});
    console.log($(this));
    //$('#menu').attr('title');
    console.log("seeWikipedeia");
    console.log("display see in Wikipedeia");
    popBox.attr('style', display);
    wikipediaBox.attr('style', display);
});
closeWikipediaBox.click(function() {
    closeAll();
});
function checkWikipedia(toUpdate){
    seeWikipedeia.attr('style', noneDisplay);
    $.ajax({
        type: "GET",
        url: "/api/word/wiki/"+$('#menu').attr('title'),
        success: function(data){
            console.log(data);
            if(!(data.wiki === 'not-exists')){
                seeWikipedeia.attr('style', display);
                if(toUpdate) {
                    $('#wiki-title').html(data.wiki.title);
                    updete(data.wiki.info, $('#wikiInfo'), false);
                }
            }
        }
    });
}