$('#submitContactUs').click(function () {
    console.log('submit Contact Us');
    let message = `{"name":"${$('#contactUserName').val()}", "email":"${$('#contactEmail').val()}", "message":"${$('#contactMessage').val()}"}`;
    console.log('message: ' + message);
    $.ajax({
        type: "POST",
        url: "/api/contact",
        data: message,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#render-div').html(data);
        }
    });
});