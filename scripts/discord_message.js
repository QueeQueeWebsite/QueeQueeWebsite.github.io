

function initialize() {
    $('#Submit').click(send_message_to_server);
}

function send_message_to_server(message = "test_message"){
    var url = $("#url").val();
    var content = $("#content").val(); 
    $.post(url, { "content": content }, function () {
					document.getElementById('wb-text').innerHTML = "Message Sent to Discord.";
					document.getElementById("form").style.display = "none";
					setTimeout(() => document.location.reload(), 5000);
                });
}