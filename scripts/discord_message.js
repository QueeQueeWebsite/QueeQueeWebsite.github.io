import config from 'config.json' assert { type: 'JSON'};

function initialize() {
    $('#Submit').click(send_message_to_server);
}

function send_message_to_server(message = "test_message"){
    var url = config.url;
    console.log(url)
    var content = $("#content").val(); 
    $.post(url, { "content": content }, function () {
					document.getElementById('wb-text').innerHTML = "Message Sent to Discord.";
					document.getElementById("form").style.display = "none";
					setTimeout(() => document.location.reload(), 5000);
                });
}