$(document).ready(function(){
    update($('#aboutInfo').text(), $('#aboutInfo'), false);
    $('.inner-content').mousemove(function(){showCoords(event, '.inner-content')});
});