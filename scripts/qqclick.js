let session_data = {
    total_earned: 0,
    current_earned : 0,
}
function qq_initialize() {
    //$('#Submit').click(() => {send_message_to_server()});
    console.log("qq initialized");
    $('#click').click(click_cookie);
    //$('#click').click(() => {click_cookie()});
    setInterval(server_money_update, 5000);
}
function cheat_redirect() {
    let current_url = location.href;
    let new_url = current_url.split('/')[0];
    location.href = new_url + '/pages/CHEATER.html';
}
function cheat_detection(click_info){
    console.log(click_info);
}
function server_money_update(){
    console.log("server updated");
    //console.log(get_current_balance('Quinton','2732','balance'));
    if (session_data.current_earned == 0){
        return
    }
    add_funds(session_data.current_earned / 10);
    session_data.current_earned = 0;
}
function click_cookie(args){
    cheat_detection(args);
    session_data.total_earned += 1;
    session_data.current_earned += 1;
}