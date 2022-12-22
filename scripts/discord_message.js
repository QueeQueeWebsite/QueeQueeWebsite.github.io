function initialize() {
    $('#Submit').click(send_message_to_server);
    const params = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
    console.log(params.name);
}

function send_message_to_server(message = "test_message"){
    var url = fetch('./scripts/config.json')
    .then((response) => {return response.json();})
    console.log(url);

    var content = $("#content").val(); 
    $.post(url, { "content": content }, function () {
					document.getElementById('wb-text').innerHTML = "Message Sent to Discord.";
					document.getElementById("form").style.display = "none";
					setTimeout(() => document.location.reload(), 5000);
                });
}