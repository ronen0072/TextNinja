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
    let wordToSearch = $('#menu').attr('title')
    console.log("checkWikipedia: "+wordToSearch);
    seeWikipedeia.attr('style', noneDisplay);
    $.ajax({
        type: "GET",
        url: "/api/word/wiki/"+wordToSearch,
        success: function(data){
            console.log(data);
            if(!(data.wiki === 'not-exists')){
                seeWikipedeia.attr('style', display);
                if(toUpdate) {
                    $('#wiki-title').html(data.wiki.title);
                    update(data.wiki.info, $('#wikiInfo'), false);
                }
            }
        }
    });
}