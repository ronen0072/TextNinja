
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
    console.log(blockDisplay);
    $('#loginSignUpBox').attr('style', blockDisplay);
    console.log(blockDisplay);
    logInBox.attr('style', blockDisplay);
});

goToSignUp.click( function() {
    console.log(close);
    logInBox.attr('style', noneDisplay);
    console.log(blockDisplay);
    signUpBox.attr('style', blockDisplay);
});

goToLogIn.click( function() {
    console.log(close);
    signUpBox.attr('style', noneDisplay);
    console.log(blockDisplay);
    logInBox.attr('style', blockDisplay);
});

closeLogInBox.click(function() {
    console.log(close);
    closeAll();
});
closeSignUpBox.click(function() {
    console.log(close);
    closeAll();
});

$('#submitSignUp').click(function () {
    console.log('submitSignUp');
    let post = `{"username":"${$('#singUpUserName').val()}", "email":"${$('#singUpEmail').val()}", "password":"${$('#singUpPassword').val()}", "password2":"${$('#singUpPassword2').val()}"}`;
    console.log('post: '+post);
    $.ajax({
        type: "POST",
        url: "/auth/signup",
        data:post,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#render-div').html(data);
        }
    });
});
$('#submitLogIn').click(function () {
    console.log('submitLogin');
    let post = `{"email":"${$('#loginEmail').val()}", "password":"${$('#loginPassword').val()}"}`;
    console.log('post: '+post);
    $.ajax({
        type: "POST",
        url: "/auth/login",
        data:post,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if(data.login === true){
                console.log(data);
                location.reload();
            }
            else{
                $('#render-div').html(data);
            }

        }
    });
});
