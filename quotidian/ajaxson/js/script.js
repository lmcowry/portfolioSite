$(document).ready(function(evt){


    $("#gifSearch").submit(function(evt) {
        evt.preventDefault();
        if (captchaValid()){
            $("#whereTheGifGoes").attr("hidden", true);
            $("#loading").attr("hidden", false);

            var query = $("#userSearchText").val();
            searchGifs(query, render);
        }



    });
});

function searchGifs(query, callback){

    //this was for making a query "like this" into "jackson+5+like+this"
    //but apparently it's not needed?
    // var theQueryFormatted = query;
    // while (theQueryFormatted.indexOf(" ") > 0){
    //     theQueryFormatted = theQueryFormatted.replace(" ", "+");
    // }
    // theQueryFormatted = "jackson+5+" + query;


    var theURL = "https://api.giphy.com/v1/gifs/random?";
    var theAPI = "dc6zaTOxFJmzC"; //just for demo

    $.ajax({
        url: theURL,
        data: {
            api_key: theAPI,
            tag: "jackson 5" + query
        },
        success: function(response){
            callback(response.data.image_url);
        },
        error: function(){
            $("#loading").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });


};


function render(theDataToBeRendered){
    $("#whereTheGifGoes").empty();
    $("#whereTheGifGoes").attr("src", theDataToBeRendered);
    setGifLoadedStatus(true);

};

function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#whereTheGifGoes").attr("hidden", !isCurrentlyLoaded);
    $("#loading").attr("hidden", isCurrentlyLoaded);
}


function captchaValid(){
    if ($("#captcha").val() === "1"){
        //probably should be in own function. this whole function checks captcha input, but this part changes display
        $("#captcha").removeClass('inputBoxInvalidCaptcha');
        $("#captchaError").empty();

        return true;
    }
    //probably should be in own function. this whole function checks captcha input, but this part changes display
    $("#captcha").addClass('inputBoxInvalidCaptcha');
    $("#captchaError").text("I think you're a robot. No more gifs");

    return false;
}
