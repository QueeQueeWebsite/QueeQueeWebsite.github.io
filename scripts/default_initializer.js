// all pages will use this default initializer
//initializes sidebar, also checks to see that user is logged in
props = {}

function update_cookies_user(user_data){
    let cookie_addon = ";SameSite=None" + ";secure";
    console.log('cookie_update + ');
    console.log(user_data);
    console.log('cookie: ' + document.cookie);
    document.cookie = "username=" + user_data.username + cookie_addon;
    document.cookie = "id=" + user_data.id + cookie_addon;
    document.cookie = "discriminator=" + user_data.discriminator + cookie_addon;
}
function get_cookie_user(){
    const return_user = {};
    const cookies = document.cookie;
    return_user.username = cookies.username;
    return_user.id = cookies.id;
    return_user.discriminator = cookies.discriminator;
    return return_user;
}
function is_user_logged(){
    const cookies = get_cookie_user();
    return !(cookies.username == undefined || cookies.id == undefined || cookies.discriminator == undefined)
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
        //'redirect_uri': 'https://queequeewebsite.github.io'
        'redirect_uri' : 'http://127.0.0.1:5500/index.html'
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
function sidebar_initialize(){
    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log( page );
    let sidebar = document.getElementById("sidebar");
    let new_link = document.createElement("a");
    new_link.innerHTML = "special_generated_link";
    sidebar.appendChild(new_link);
}

function default_initialize(){
    let params = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
    let popup = {};
    props = params;
    if (props.code){ // user has used a discord generated link
        if (is_user_logged()){ // we are re-logging in potentially unnecessarily
            // TODO: popup to ask if you wants to relog
        }
        else{
            exchange_code();
        }
    }
    else{ // user has entered site without a generated link
        if (is_user_logged()){
            // do nothing
        }
        else{ // if not logged in send them to login page
            console.log('should show login page');
            let current_url = location.href;
            let new_url = current_url.split('/')[0];
            console.log(new_url);
            location.href = new_url + '/pages/login.html';
        }
    }
    console.log(get_cookie_user());
    sidebar_initialize();
}