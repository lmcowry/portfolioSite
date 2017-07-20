var twitchUsers = ["freecodecamp", "ESL_SC2", "timmac", "comster404", "sheriffeli", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var currentlyStreaming = [];
var notCurrentlyStreaming = [];
var notAnAccount = [];

$(document).ready(function(){

    for (var counter = 0; counter < twitchUsers.length; counter++){
        getTwitchUserInfo(twitchUsers[counter]);
    }

});


function getTwitchUserInfo(user){

    //documentation https://wind-bow.glitch.me/



    let url= `https://wind-bow.glitch.me/twitch-api/users/${user}`;

    $.ajax({
        url: url,
        success: function(response){
            if (response.error) {
                notAnAccount.push(user);
            } else {
                getTwitchStreamInfo(user);
            }
        },
        error: function(){
            // console.log(`${user} is not a user`);
        }
    });


}

function getTwitchStreamInfo(user){
    let url= `https://wind-bow.glitch.me/twitch-api/streams/${user}`;

    return $.ajax({
        url: url,
        success: function(response){

            if (user === twitchUsers[twitchUsers.length - 1]){
                displayNonUsers();
            }

            if (response && response.stream !== null){
                // currentlyStreaming.push(user);
                let theLink = response.stream.channel.url;
                let theLine = `<div><a href="${theLink}">${user}</a> is playing ${response.stream.game} with ${response.stream.viewers} viewers</div>`;
                $("#twitchUsersStreamingDiv").append(theLine);
            } else {
                // notCurrentlyStreaming.push(user);
                let theUser = user;
                let theLink = `https://www.twitch.tv/${user}`;
                let theLine = `<div><a href="${theLink}">${theUser}</a></div>`;
                $("#twitchUsersNotStreamingDiv").append(theLine);
            }


        },
        error: function(){
            console.log("error with getTwitchStreamInfo function");
        }
    });
}

// functions, just not needed
// function getTwitchChannelInfo(user){
//     let url= `https://wind-bow.glitch.me/twitch-api/channels/${user}`;
//
//     return $.ajax({
//         url: url,
//         success: function(response){
//
//         },
//         error: function(){
//             console.log("error with getTwitchChannelInfo function");
//         }
//     });
// }

function displayNonUsers(){
    for (var counter3 = 0; counter3 < notAnAccount.length; counter3++){
        let theUser = notAnAccount[counter3];
        let theLine = `<div>${theUser}</div>`;
        $("#twitchNotActuallyUsersDiv").append(theLine);
    }
}
