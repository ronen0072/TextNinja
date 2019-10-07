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