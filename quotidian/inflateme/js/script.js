


$(document).ready(function(){
    $("#endDate").val( function() {

        //calculates current day and formats it in year/month/date format
        var today = new Date().toISOString().slice(0, 10);
        while (today.indexOf("-") >= 0){
            today = today.replace("-", "/");
        }
        return today
    });





    $('#calc').on('click', function calculate() {
        var apiUrl = 'https://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?';

        $.getJSON(apiUrl, {
            country: 'united-states',
            start: $('#startDate').val(),
            end: $('#endDate').val(),
            amount: 100,
            format: true
        })
          .done(function (data) {
              $('#endPrice').text(data);
          });

          $(".allTheFunStuff").fadeIn().delay(2000).queue(function(){
              $(".allTheFunStuff").attr("hidden", false)
          });
    });

    $('#funPart').click(function() {
        var initialPrice = 100;

        var initialHeight = $("#startHeight").val();
        var initialWeight = $("#startWeight").val();


        var finalPrice = parseInt(($('#endPrice').text()).replace("$", ""));

        var percentChange = finalPrice / initialPrice;

        inflateAndDisplayIt("startHeight", initialHeight, percentChange);
        inflateAndDisplayIt("startWeight", initialWeight, percentChange);



    });

    function inflateAndDisplayIt(startSelector, startValue, percentChange){
        if ($(`#${startSelector}`).val() !== ""){
            var endSelector = startSelector.replace("start", "end");
            var endValue = startValue * percentChange;
            $(`#${endSelector}`).text(endValue);
        }
    };


});
