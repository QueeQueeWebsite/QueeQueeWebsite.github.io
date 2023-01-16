let props = {}; // empty object to hold all props, gets initialized by initialize()
let current_user = {};
// this is the url to get user imgage
let image_url = "https://cdn.discordapp.com/avatars/{ID}/{avatar_id).png"

async function get_url(){
	return fetch('./scripts/config.json')
    .then((response) => response.json()).then((result) => result.url);
}
async function post_message(body){
    
    let url = 'http://127.0.0.1/';
    //var content = message;//$("#content").val(); 
    $.post(url, body);
}
function send_message_to_server(message = "test_message"){
    /*var url = fetch('./scripts/config.json')
    .then((response) => {return response.json();})
    console.log(url);*/
    post_message(message);
}
function get_current_balance(name, discriminator, request){
    //NOTE: ip of server goes before ? below
    balance = $.get(`http://127.0.0.1:80?name=${name}&num=${discriminator}&request=${request}`);
    balance_amount = balance.responseText;
    return balance_amount;
}
function add_funds(funds) {
    let user = get_cookie_user();
    let body = {   
                    name: user.username,
                    discriminator: user.discriminator,
                    request: 'add_funds',
                    amount: funds
                }
    post_message(body);
}
function test_get_response(){
    let info = $.get('https://www.google.com');
}