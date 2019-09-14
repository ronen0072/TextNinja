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

// Get the google+ button
var google = $('#google');

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
/*google.click(function(){

});*/

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
