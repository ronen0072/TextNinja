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