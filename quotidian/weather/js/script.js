var userLat = 0;
var userLng = 0;
var weatherLocation = "";



$(document).ready(function(){

    $("#customZipInput").hide();
    $("#customZipButton").hide();
    $("#changeTempUnit").hide();


    $("#customZipShow").click(function(evt){
        $( this ).hide();
        $("#customZipInput").show();
        $("#customZipButton").show();
    });


    // makes it so that you can just type the zip code and press enter, rather
    // than having to click the submit button
    $("#customZipInput").keypress(function (e) {
        if (e.which == 13) {
            customZipEntry();
        }

    });


    $("#changeTempUnit").click(function(evt){
        evt.preventDefault();
        if ($("#tempUnit").text() === "F"){
            $("#tempUnit").text("C");
            var fTemp = parseFloat($("#tempSpan").text()).toFixed(2);
            var cTemp = (fTemp - 32) * 5 / 9;
            $("#tempSpan").text(cTemp.toFixed(2));

        } else {
            $("#tempUnit").text("F");
            var cTemp = parseFloat($("#tempSpan").text()).toFixed(2);
            var fTemp = (cTemp * 9 / 5) + 32;
            $("#tempSpan").text(fTemp.toFixed(2));

        }
    });
    $("#autoWeather").click(function(evt){
        renderAuto();
    })


    $("#customZipButton").click(function(evt){
        customZipEntry();
    });
});


function customZipEntry(){
    var theZip = $("#customZipInput").val();
    convertZipToLatLongAndRender(theZip);
}


function convertLatLongToCityName(){
    // documentation https://developers.google.com/maps/documentation/geocoding/start
    var url= `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLat},${userLng}&key=AIzaSyAdLUs2RKknCuYqMB__9jBS469HSPcvTXU`;

    // this shouldn't be in charge of data display, but it wasn't working when in render()
    $.ajax({
        url: url,

        success: function(response){

            weatherLocation = " for " + response.results[0].address_components[2]["long_name"];
            $("#weatherLocation").text(weatherLocation);
            $("#weatherLocation").show();
        },
        fail: function(){
            console.log("convertLatLongToCityName didn't work");
        }
    });
}


function convertZipToLatLongAndRender(theZip){

    var url= `https://maps.googleapis.com/maps/api/geocode/json?address=${theZip}&key=AIzaSyAdLUs2RKknCuYqMB__9jBS469HSPcvTXU`;

    // this shouldn't be in charge of data display, but it wasn't working when in render()
    $.ajax({
        url: url,

        success: function(response){
            userLat = response.results[0].geometry.location.lat;
            userLng = response.results[0].geometry.location.lng;
            renderCustom();
        },
        fail: function(){
            console.log("convertZipToLatLong didn't work");
        }
    });
}


function renderCustom(){
    getThatJSON(userLat, userLng);
}


function renderAuto(){


    // $("#message").empty();
    getLatAndLong();

};


function getLatAndLong(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            getThatJSON(userLat, userLng);

        });
    }
    else {
        return "locationError";
    }
};

function getThatJSON(theLat, theLong){

    var key = "aed1b25df41c6607c531579a114701fb";
    var url= `https://api.darksky.net/forecast/${key}/${theLat},${theLong}`;

    // this shouldn't be in charge of data display, but it wasn't working when in render()
    return $.ajax({
        url: url,
        dataType: "jsonp",

        success: function(response){
            loadAllThatData(response);

        }
    });

};

function loadAllThatData(weatherData){

    $("#tempSpan").text(weatherData.currently.temperature);
    $("#tempDiv").show();

    convertLatLongToCityName();

    $("#descSpan").text(weatherData.currently.summary);

    $("#changeTempUnit").show();

    // loadTheGif(weatherData.currently.summary, renderGif);
    makeSkycon(weatherData.currently.icon);

};


function makeSkycon(weatherText){

    weatherText2 = weatherText.toUpperCase();
    weatherText3 = weatherText2.replace("-", "_");
    while (weatherText3.indexOf("-") > 0){
        weatherText3 = weatherText3.replace("-", "_");
    }
    var icons = new Skycons({"color": "black"});
    icons.add(document.getElementById("icon1"), Skycons[weatherText3]);
    icons.play();
};
