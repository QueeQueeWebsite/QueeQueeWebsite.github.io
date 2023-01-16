// all pages will use this default initializer
//initializes sidebar, also checks to see that user is logged in
props = {}

function update_cookies_user(user_data){
    console.log(user_data);
    let cookie_addon = ";SameSite=None" + ";secure";
    document.cookie = "username=" + user_data.username + cookie_addon;
    document.cookie = "id=" + user_data.id + cookie_addon;
    document.cookie = "discriminator=" + user_data.discriminator + cookie_addon;
    document.cookie = "avatar_link=" + user_data.avatar + cookie_addon;
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
function get_cookie_user(){
    const return_user = {};
    const cookies = document.cookie;
    return_user.username = getCookie('username');
    return_user.id = getCookie('id');
    return_user.discriminator = getCookie('discriminator');
    return_user.avatar_link = getCookie('avatar_link');
    return return_user;
}
function is_user_logged(){
    const cookies = get_cookie_user();
    return !(cookies.username == 'undefined' || cookies.id == 'undefined' || cookies.discriminator == 'undefined' || cookies.username == undefined || cookies.id == undefined || cookies.discriminator == undefined)
}
function exchange_code(){
    const url = "https://discord.com/api/v10";
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
function strip_href(ref){
    if(ref != undefined){
        let splitter = ref.split('/');
        return splitter[splitter.length - 1];
    }
}
function sidebar_initialize(){
    var path = window.location.pathname;
    var current_page = path.split("/").pop();
    let page_names = ['Profile','QueeQueeClicker','Stocks','Unboxing']
    let hrefs = ['index.html','pages/qqclicker.html','pages/stocks.html','pages/csgo_unboxing.html']
    let sidebar = document.getElementById("sidebar");
    for (page in page_names) {
        let new_link = document.createElement("a");
        new_link.innerHTML = page_names[page];
        sidebar.appendChild(new_link);
        let href = hrefs[page];
        if (current_page != 'index.html'){
            href = '../' + href;
            //new_link.class = 'active';
        }
        if(current_page == strip_href(href)){
            new_link.classList.add('active');
        }
        new_link.href = href;
    }
}

function default_initialize(){
    if (window.opener && window.opener !== window) {
        return
    }
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
            console.log('user is logged');
        }
        else{ // if not logged in send them to login page
            let current_url = location.href;
            let new_url = current_url.split('/')[0];
            location.href = new_url + '/pages/login.html';
        }
    }
    sidebar_initialize();
}