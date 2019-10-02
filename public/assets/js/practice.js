$(document).ready(function(){
    getWords();
});

function getWords(){
    $.ajax({
        type: "GET",
        url: "/api/user/words",
        success: function(data){
            //console.log(data);
            var res = "";
            const htmlTag = 'b';
            console.log(data.words);
            var index = 0;
            data.words.forEach(function(word) {
                text.addWord(word.wordID);
                res +=`<div><label class="container"><input class="toDelete" id='${word._id}' type="checkbox"><span class="checkDelete"></span></label>`;
                res +=`<${htmlTag} title= '${word.wordID}' class='wor' id='wordPractice${index}' syllables='${word.syllables.list.join("*")}'>${word.wordID}</${htmlTag}></div>`;
                index++;
            });
            $('#wordsToPractice').html(res);
            updateFunOfWord(true);

        }
    });
}
//TODO delete the words in the front end
$('#delete').click( function(){
    $('#checkIfSafe').attr('style',displayInlineBlock);
    $('#delete').attr('style',noneDisplay);
});
$('#yes').click( function(){
    $('#delete').attr('style',displayInlineBlock);
    $('#checkIfSafe').attr('style',noneDisplay);
    deleteWords();
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
function deleteWords() {
    var checkbox = $(".toDelete");
    var wordsToDelete = '';
    var isNotTheFirst = false;
    for(var i = 0; i<checkbox.length; i++){
        if(checkbox[i].checked ===true){
            if(isNotTheFirst){
                wordsToDelete += ',';
            }
            else{
                isNotTheFirst = true;
            }
            wordsToDelete += checkbox[i].id;
           $('#'+checkbox[i].id).parent().parent().remove();
        }
    }
    console.log(wordsToDelete);
    $.ajax({
        type: "DELETE",
        url: "/api/user/words/"+wordsToDelete,
        success: function(data){
            console.log(data);
        }
    });
}