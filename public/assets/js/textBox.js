var textBox = $('#textBox');
//autosize(document.getElementById("textBox"));
$(document).ready(function(){
    $('body').attr('pageID',0);
    if(sessionStorage.textBox){
        console.log(textBox.value);
        textBox.val(sessionStorage.textBox);
    }
    update(textBox.val(), output, true);
});

var output = $("#output");
textBox.keyup(function(){update(textBox.val(), output, true);});
textBox.blur(function() {
    if(textBox.val() == ""){
        console.log('empty');
        update(textBox.val(), output, true);
    }
    else {
        update(textBox.val(), output, true);
    }
});
