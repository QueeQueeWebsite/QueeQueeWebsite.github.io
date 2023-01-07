function qq_initialize() {
    //$('#Submit').click(() => {send_message_to_server()});
    console.log("qq initialized");
    $('#click').click(click_cookie);
    //$('#click').click(() => {click_cookie()});
    setInterval(server_balance_update, 5000);
}
function cheat_detection(click_info){
    console.log(click_info)
}
function server_balance_update(){
    console.log("server updated");
}
function click_cookie(args){
    cheat_detection(args);
}