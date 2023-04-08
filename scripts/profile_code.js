async function profile_initialize(){
    let user = get_cookie_user();
    console.log(user);
    $("#namePlate").html(user.username);
    $("#avatarLink").attr("src",`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar_link}.png`);
    let balance = await get_current_balance('Quinton','2732','balance');
    console.log(balance);
    $("#current_balance").html(balance);
}