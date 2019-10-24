var sortBy = 'time';
var orderBy = 'time';

function compare( a, b ) {
    if ( a.difficulty < b.difficulty ){
        return -1;
    }
    if ( a.difficulty > b.difficulty ){
        return 1;
    }
    return 0;
}
function practiceSettings(callback){
    return function () {
        if ($('#settings').attr('title') === 'settingsOn') {
            let newOrder = $('input[name=order]:checked', '#settingsForm').val();
            console.log('_________________________________________________________');
            let oldSort = sortBy;
            console.log(newOrder);
            //sort words if it the  is Changed
            if ((sortBy === 'difficulty') && (newOrder === 'time')) {
                sortBy = 'time';
                console.log(sortBy);
                getWords(callback);
            } else {
                if ((sortBy === 'time') && ((newOrder === 'gradual') || (newOrder === 'dynamic'))) {
                    sortBy = 'difficulty';
                    console.log(sortBy);
                    getWords(callback);
                }
            }
            console.log(orderBy);
            //update the index if the order is Changed
            if ((newOrder !== orderBy) && ($('#divide_Practice  .toDivide').length !== 0)) {
                orderBy = newOrder;
                $('#divide_Practice  .toDivide').attr('index', -1);
                console.log('the index is update');
            }
        };
    }
}
function getWords(callback){
    $.ajax({
        type: "GET",
        url: "/api/user/words",
        success: function(data){
            //console.log(data);
            callback(data.words);
        }
    });
}
function deleteWords(wordsToDelete) {
    console.log(wordsToDelete);
    $.ajax({
        type: "DELETE",
        url: "/api/user/words/"+wordsToDelete,
        success: function(data){
            console.log(data);
        }
    });
}
$('#delete').click( function(){
    $('#checkIfSafe').attr('style',displayInlineBlock);
    $('#delete').attr('style',noneDisplay);
});
$('#no').click( function(){
    $('#delete').attr('style',displayInlineBlock);
    $('#checkIfSafe').attr('style',noneDisplay);
});
$('#delete').hover( function(){
    $('#trash').attr('src',"/assets/icon/trash on hover.png")
},function(){
    $('#trash').attr('src',"/assets/icon/trash.png")
});
$('.content').hover(function(){},function(){
    $('#delete').attr('style',displayInlineBlock);
    $('#checkIfSafe').attr('style',noneDisplay);
});