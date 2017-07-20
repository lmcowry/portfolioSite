$(document).ready(function(){
    $("#userSearch").submit(function(evt){
        //this makes the heading fade out when the user submits a search
        //I like the font too much to see it leave.
        // $(".the-big-heading").fadeOut(4000);
        evt.preventDefault();
        renderSearch();
    });
    $("#lucky").click(function(evt){
        evt.preventDefault();
        window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
    });
    $("#location").click(function(evt){
        evt.preventDefault();
        renderLocation();

    })

});

function renderLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            ajaxLocation(position.coords.latitude, position.coords.longitude);

        });
    }
    else {
        return "locationError";
    }
};

function ajaxLocation(theLat, theLong){
    var url= `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${theLat}%7C${theLong}&gsradius=10000&gslimit=10&format=json`
    return $.ajax({

        type:"GET",
        url:url,
        async:false,
        dataType: "jsonp",


        success: function(response){

            $("#article").empty();
            var putItHere = $("#insertHere");

            var theArray = response.query.geosearch;
            $.each( theArray, function(index, obj){

                var theTitle = `${obj.title}`;
                var theLink = `https://en.wikipedia.org/?curid=${obj.pageid}`;
                var distance = obj.dist;
                var distanceString = `${distance} meters away`;


                //definitely could refactor to combine this function with the similar one below
                var theLine =
                `<a href=${theLink}>
                    <div class="panel panel-default col-sm-8 col-sm-offset-2 eachEntry" hidden="true">
                        <div class="panel-heading">
                            <h1 class="panel-title">${theTitle}</h1>
                        </div>
                        <div class="panel-body distanceEntry" value="${distance}">
                            ${distanceString}
                        </div>
                    </div>
                </a>`;
                $("#article").append(theLine)

                //provides the fade in animation
                $(".eachEntry").fadeIn().delay(2000).queue(function(){
                    $(".eachEntry").attr("hidden", false)
                });

            });

        },

        error: function(errorMessage){
            alert("Something messed up with the ajaxLocation function");
        }
    });
};







function renderSearch(){
    var rand = "https://en.wikipedia.org/wiki/Special:Random";
    var searchTerm = $("#searchText").val();

    var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json&callback=?`;

    console.log(url);

    $.ajax({
        type:"GET",
        url:url,
        async:false,
        dataType: "json",
        success: function(data){

            $("#article").empty();

            var howManyResults = data[1].length;
            for (var x = 0; x < howManyResults; x++){
                var theLink = data[3][x];
                var theTitle = data[1][x];
                var theSummary = data[2][x];
                var theLine =
                `<a href=${theLink}>
                    <div class="panel panel-default col-sm-8 col-sm-offset-2 eachEntry" hidden="true">
                        <div class="panel-heading">
                            <h1 class="panel-title">${theTitle}</h1>
                        </div>
                        <div class="panel-body">
                            ${theSummary}
                        </div>
                    </div>
                </a>`;
                $("#article").append(theLine)
            }

            //provides the fade in animation
            $(".eachEntry").fadeIn().delay(2000).queue(function(){
                $(".eachEntry").attr("hidden", false)
            });

        },

        error: function(errorMessage){
            alert("Something messed up with the renderSearch function");
        }

    });
};
