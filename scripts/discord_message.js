let props = {}; // empty object to hold all props, gets initialized by initialize()
let current_user = {};
// this is the url to get user imgage
let image_url = "https://cdn.discordapp.com/avatars/{ID}/{avatar_id).png"

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
function get_current_balance(name, discriminator, request){
    //NOTE: ip of server goes before ? below
    balance = $.get(`?name=${name}&num=${discriminator}&request=${request}`)
    console.log(balance);
}
function add_funds() {
    console.log('funds added');
}
function test_get_response(){
    let info = $.get('https://www.google.com');
}