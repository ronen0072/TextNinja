var linkHome = $('#linkHome');
var linkAbout = $('#linkAbout');
var linkContact = $('#linkContact');
var main = $('#main');
var about = $('#about');
var contact = $('#contact')

$(document).ready(function(){
    displyFrame('main');
});

linkHome.click( function(){
    displyFrame('main');
});
linkAbout.click( function(){
    displyFrame('about');
});
linkContact.click( function(){
    displyFrame('contact');
});

function displyFrame(page){
    var nonedisplay = "display: none;";
    var blockDisplay = "display: block;";
    var frames = $('div').filter(".intro");
    for(var i = 0; i<frames.length; i++){
        $(frames[i]).attr('style', nonedisplay);
    }
    $('#'+page).attr('style', blockDisplay);

}