var homelink = $('.home');
var aboutLink = $('.about');
var contactLink = $('.contact');
var main = $('#main');
var page = {
    index: 0,
    about: 1,
    contact: 2,
    practice: 3
};
$(document).ready(function(){
    //displyFrame('main');
});

homelink.click( function(){
    navTo('home');
});
aboutLink.click( function(){
    navTo('about');
});
contactLink.click( function(){
    navTo('contact');
});
$('#simplePractice').click( function(){
    navTo('simple-practice');
});
$('#dividePractice').click( function(){
    console.log('divide-practice');
    navTo('divide-practice');
});
function navTo(pageName){
    $.ajax({
        type: "GET",
        url: "../../../"+pageName,
        success: function (data) {
            $('#render-div').html(data);
        }
    });
}
function displyFrame(page){
    var frames = $('div').filter(".intro");
    for(var i = 0; i<frames.length; i++){
        $(frames[i]).attr('style', noneDisplay);
    }
    $('#'+page).attr('style', blockDisplay);

}