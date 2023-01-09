let props = {}; // empty object to hold all props, gets initialized by initialize()
let current_user = {};
// this is the url to get user imgage
let image_url = "https://cdn.discordapp.com/avatars/{ID}/{avatar_id).png"
function update_cookies_user(user_data){
    let cookie_addon = ";SameSite=None" + ";secure";
    console.log('cookie_update + ');
    console.log(user_data);
    console.log('cookie: ' + document.cookie);
    document.cookie = "username=" + user_data.username + cookie_addon;
    document.cookie = "id=" + user_data.id + cookie_addon;
    document.cookie = "discriminator=" + user_data.discriminator + cookie_addon;
}
function exchange_code(){
    const url = "https://discord.com/api/v10";
    console.log('exchange called');
    console.log(props.code);
    const params = new URLSearchParams();
    params.append('client_id','946542952946216960');
    params.append('client_secret', 'S12fC9TFq7dqfKZ5HOOfL714pBRa2Wm7');
    params.append('grant_type','authorization_code');
    params.append('code', props.code);
    //params.append('redirect_uri', 'https://queequeewebsite.github.io');
    params.append('redirect_uri', 'http://127.0.0.1:5500/index.html');
    params.append('scope','identify');

    data = {
        'client_id': '946542952946216960',
        'client_secret': 'S12fC9TFq7dqfKZ5HOOfL714pBRa2Wm7',
        'grant_type': 'authorization_code',
        'code': props.code,
        'redirect_uri': 'https://queequeewebsite.github.io'
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    fetch('https://discord.com/api/v10/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
    })
    .then(response => response.json()).then(data => fetch(url + '/users/@me', { method: 'GET', headers: {'Authorization': 'Bearer ' + data.access_token}}).then(response => response.json()).then(data=>update_cookies_user(data)));


}

function initialize() {
    //$('#Submit').click(() => {send_message_to_server()});
    $('#Submit').click(() => {get_current_balance()});
    let params = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
    props = params;
    exchange_code();
    let sidebar = document.getElementById("sidebar");
    let new_link = document.createElement("a");
    new_link.innerHTML = "special_generated_link";
    sidebar.appendChild(new_link);
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