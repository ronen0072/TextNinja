const noneDisplay = "display: none;";
const display = "display: block;";

// Get the log In Box
var popBox = $('#popBox');

// Get the log In Box
var logInBox = $('#login-box');

// Get the sign Up Box
var signUpBox = $('#signUp-box');

// Get the button that opens the log In
var logIn = $('#log_In');

// Get the button that opens the log In
var goToSignUp = $('#goToSignUp');

// Get the button that opens the log In
var goToLogIn = $('#goToLogIn');

// Get the <span> element that closes the Log In Box
var closeLogInBox = $('#closeLogInBox');

// Get the <span> element that closes the Log In Box
var closeSignUpBox = $('#closeSignUpBox');

// When the user clicks the button, open the modal
logIn.click( function() {
    console.log(display);
    popBox.attr('style', display);
    console.log(display);
    logInBox.attr('style', display);
});

goToSignUp.click( function() {
    console.log(close);
    logInBox.attr('style', noneDisplay);
    console.log(display);
    signUpBox.attr('style', display);
});

goToLogIn.click( function() {
    console.log(close);
    signUpBox.attr('style', noneDisplay);
    console.log(display);
    logInBox.attr('style', display);
});

closeLogInBox.click(function() {
    console.log(close);
    logInBox.attr('style', noneDisplay);
    popBox.attr('style', noneDisplay);
});
closeSignUpBox.click(function() {
    console.log(close);

    signUpBox.attr('style', noneDisplay);
    popBox.attr('style', noneDisplay);
});
// When the user clicks anywhere outside of the Log In Box, close it
window.onclick=function(event) {
    if (event.target.id == popBox.attr('id')){
        console.log(close);
        logInBox.attr('style', noneDisplay);
        signUpBox.attr('style', noneDisplay);
        popBox.attr('style', noneDisplay);
    }
    var menu  = $('#menu');
    if (event.target.id != menu.attr('id')) {
        console.log(close);
        menu.attr('style', noneDisplay);
    }
}

/*

var logInBox = document.getElementById("logInBox");

// Get the button that opens the modal
var logIn = document.getElementById("log_In");

// Get the <span> element that closes the modal
var closeLogInBox = document.getElementById("closeLogInBox");
console.log(logIn);
// When the user clicks the button, open the modal
logIn.onclick = function() {
    console.log(logIn);
    logInBox.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeLogInBox.onclick = function() {
    logInBox.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == logInBox) {
        logInBox.style.display = "none";
    }
}*/
