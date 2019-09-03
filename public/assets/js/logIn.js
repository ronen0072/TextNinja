// Get the log In Box
var logInBox = $('#logInBox');

// Get the log In Box
var signUpBox = $('#signUpBox');

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
    var display = "display: block;";
    console.log(display);
    logInBox.attr('style', display);
});

goToSignUp.click( function() {
    var display = "display: none;";
    console.log(close);
    logInBox.attr('style', display);
    var display = "display: block;";
    console.log(display);
    signUpBox.attr('style', display);
});

goToLogIn.click( function() {
    var display = "display: none;";
    console.log(close);
    signUpBox.attr('style', display);
    var display = "display: block;";
    console.log(display);
    logInBox.attr('style', display);
});

closeLogInBox.click(function() {
    var display = "display: none;";
    console.log(close);
    logInBox.attr('style', display);
});
closeSignUpBox.click(function() {
    var display = "display: none;";
    console.log(close);
    signUpBox.attr('style', display);
});
// When the user clicks anywhere outside of the Log In Box, close it
window.onclick=function(event) {
    if (event.target.id == logInBox.attr('id')){
        var display = "display: none;";
        console.log(close);
        logInBox.attr('style', display);
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
