function upDetailse(){
    $.ajax({
        type: "GET",
        url: "/api/user/details/",
        success: function(user){
            console.log(user);
            $('#contactUserName').val(user.username);
            $('#contactEmail').val(user.email);
        }
    });
}