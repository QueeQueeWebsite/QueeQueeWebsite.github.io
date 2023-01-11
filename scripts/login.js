const CLIENT_URL = '127.0.0.1';
function login_initialize(){
    $('#loginBtn').click(() => {login_popup();return false;}); // return false stops page from refreshing
}
function login_popup(){
    let popup = {};
    console.log('before popup');
    popup = window.open('https://discord.com/api/oauth2/authorize?client_id=946542952946216960&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2Findex.html&response_type=code&scope=identify','popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    console.log('popup should be up now');
    const checkPopup = setInterval(() => {
        console.log('popup function running');
        if (popup.window.location.href
            .includes(CLIENT_URL)) {popup.close();location.href = popup.window.location.href}
        if (!popup || !popup.closed) return;
        clearInterval(checkPopup);
        }, 100);
}