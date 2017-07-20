//I don't get why this needs to be here. I get that it works with the API URL to process the JSONP
function parseJSONPQuote(response) {
    $("#quoteGoesHere").text(response.quoteText);
    var tweetPopulator = 'https://twitter.com/intent/tweet' + '?text=' + '"' + response.quoteText + '"' + '-' + response.quoteAuthor;
    $("#tweetThis").attr("href", tweetPopulator);
    $("#authorGoesHere").text(response.quoteAuthor);
};




$(document).ready(function(){

    function renderAQuote() {
        var tag = document.createElement("script");
        tag.src="https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=parseJSONPQuote";
        //I have no idea what this does; I just know that it doesn't work without it
        $('#quoteGoesHere').html(tag);
    };

    function getDatColor() {
        //990099 purple
        //009688 turqoise
        //#ff9800 orange
        var colors = ["#333333","#990099", "#ff0000", "#009688", "#ff9800"];
        var rand = Math.floor(Math.random()*colors.length);
        $('body').css("background-color", colors[rand]);
    };

    //when you go to the page, there should already be a quote there
    renderAQuote();
    getDatColor();

    //when you press the button for more quotes
    $('#moreQuotesPlease').click(function(e){
        e.preventDefault();
        renderAQuote();
        getDatColor();
    });




});
