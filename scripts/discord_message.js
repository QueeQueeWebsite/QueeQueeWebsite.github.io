let props = {}; // empty object to hold all props, gets initialized by initialize()
function initialize() {
    //$('#Submit').click(() => {send_message_to_server()});
    $('#Submit').click(() => {get_current_balance()});
    let params = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
    props = params;
}
async function get_url(){
	return fetch('./scripts/config.json')
    .then((response) => response.json()).then((result) => result.url);
}
async function post_message(message){
    let url = await get_url()
    //var content = message;//$("#content").val(); 
    console.log(props.h);
    $.post(url, { "content": message });
}
function send_message_to_server(message = "test_message"){
    /*var url = fetch('./scripts/config.json')
    .then((response) => {return response.json();})
    console.log(url);*/
    post_message(message);
}
function get_current_balance(){
    //NOTE: ip of server goes before ? below
    balance = $.get('?name=Quinton&num=2732&request=balance')
    console.log(balance);
}
function test_get_response(){
    let info = $.get('https://www.google.com');
}