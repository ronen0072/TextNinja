$(document).ready(function(){
    initialSettings();
    //tools
    $('#speaker').click(function(){
        speaker();
    });
    $('#settings').click(function(){
        settings();
    });
    $('#clear').click(function(){
        clearTheInputBox();
    });
    $('#output').mousemove(function(){showCoords(event, '#output')});
    customRadio("order");
});


function speaker(){
    var speaker = $('#speaker');
    console.log(speaker.attr('title'));
    if(speaker.attr('title') == 'speaker'){
        speaker.attr('title', 'mute');
        speaker.attr('src', '/assets/icon/mute32.png');
        $('#sound').prop("muted", true);
    }
    else{
        speaker.attr('title', 'speaker');
        speaker.attr('src', '/assets/icon/speaker32.png');
        $('#sound').prop("muted", false);
    }
}

function clearTheInputBox(){
    textBox.val('');
    output.text('');
    console.log('clear');
    sessionStorage.removeItem('textBox');
    $('#clear').attr('src', '/assets/icon/broomClear32.png');
    setTimeout(function(){
        console.log('clear');
        $('#clear').attr('src', '/assets/icon/broom32.png');}, 300);
}

function highlighting() {
    if(!$('#highlighting').prop('checked')){
        console.log('not highlighting');
        $("#output").attr('style', '');
    }
}

function pick() {
    setTimeout(function(){
        backgroundColor = document.getElementById('Pick').style.backgroundColor;
    }, 200);
    document.getElementById('highlighting').checked = true;
/*    updateSettings();*/
}






function settings(){
    if($('#settings').attr('title') == 'settingsOn')
        settingsOff();
    else
        settingsOn();
}
function settingsOn(){
    var settings = $('#settings');
    console.log('settingsOn');
    settings.attr('title', 'settingsOn');
    settings.attr('src', '/assets/icon/settings32on.png');
    document.getElementById('settings_content').className='dropdown-content';
}
function settingsOff(){
    var settings = $('#settings');
    console.log('settingsoff');
    settings.attr('title', 'settingsoff');
    settings.attr('src', '/assets/icon/settings32off.png');
    document.getElementById('settings_content').className='dropdown-none';
    updateSettings();
}
function initialSettings(){

    if((sessionStorage.highlighting === 'true')){
        document.getElementById('highlighting').checked = true;
    }
    if(sessionStorage.backgroundColor){
        document.getElementById('Pick').style.backgroundColor = sessionStorage.backgroundColor;
    }
    if((sessionStorage.syllables === 'true') || (sessionStorage.syllables === undefined)){
        document.getElementById("syllables").checked = true;
    }
    else{
        document.getElementById("syllables").checked = false;
    }
    if((sessionStorage.bold === 'true') || (sessionStorage.bold === undefined)){
        document.getElementById("bold").checked = true;
    }
    else{
        document.getElementById("bold").checked = false;
    }
   /* if(sessionStorage.font_size !== undefined){
        document.getElementById("font_size").value = sessionStorage.font_size;
    }
    else{
        document.getElementById("font_size").value = 12;
    }*/
    console.log('---------initialSettings-----------');
    console.log('highlighting: '+  document.getElementById('highlighting').checked);
    console.log('backgroundColor: ', document.getElementById('Pick').style.backgroundColor );
    console.log('syllables: '+  document.getElementById('syllables').checked);
    console.log('bold: '+  document.getElementById("bold").checked);
  /*  console.log('font_size: '+  document.getElementById("font_size").value);*/

}
function updateSettings(){
    sessionStorage.setItem('highlighting', document.getElementById('highlighting').checked);
    sessionStorage.setItem('backgroundColor', document.getElementById('Pick').style.backgroundColor );
    sessionStorage.setItem('syllables', document.getElementById('syllables').checked);
    sessionStorage.setItem('bold', document.getElementById("bold").checked);
   /* sessionStorage.setItem('font_size', document.getElementById("font_size").value);*/
    console.log('---------updateSettings-----------');
    console.log('highlighting: '+  sessionStorage.highlighting);
    console.log('backgroundColor: '+  sessionStorage.backgroundColor);
    console.log('syllables: '+  sessionStorage.syllables);
    console.log('bold: '+  sessionStorage.bold);
  /*  console.log('font_size: '+  sessionStorage.font_size);*/

}
function customRadio(radioName){
    var radioButton = $('input[name="'+ radioName +'"]');
    $(radioButton).each(function(){
        $(this).wrap( "<span class='custom-radio'></span>" );
        if($(this).is(':checked')){
            $(this).parent().addClass("selected");
        }
    });
    $(radioButton).click(function(){
        if($(this).is(':checked')){
            $(this).parent().addClass("selected");
        }
        $(radioButton).not(this).each(function(){
            $(this).parent().removeClass("selected");
        });
    });
}
