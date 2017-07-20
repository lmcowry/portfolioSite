var theDelay = 0;

var theColors = ["red", "green", "blue", "purple"];
var theAnswerColors = [];
var theGuessColors = [];

var redButton = $("#redButton");
var greenButton = $("#greenButton");
var blueButton = $("#blueButton");
var purpleButton = $("#purpleButton");

var redAudio = document.getElementById("redAudio");
var greenAudio = document.getElementById("greenAudio");
var blueAudio = document.getElementById("blueAudio");
var purpleAudio = document.getElementById("purpleAudio");

var defaultSeconds = 5;

var secondsRemaining = defaultSeconds;

var theReport = "";

var gameGoing = false;

var theAnswerLength = 1;
var theGuessLength = 0;


$(document).ready(function(){

    $("#wholeTimer").hide();
    $("#theGuessCount").hide();

    $("#redButton").click(function(evt){
        document.getElementById("redAudio").play();

        secondsRemaining = defaultSeconds;

        theGuessColors.push("red");

        theGuessLength = theGuessColors.length;
        $("#theGuessCount").text("Guess Count: " + theGuessLength);
        $("#theGuessCount").show();
    });
    $("#greenButton").click(function(evt){
        document.getElementById("greenAudio").play();

        secondsRemaining = defaultSeconds;

        theGuessColors.push("green");

        theGuessLength = theGuessColors.length;
        $("#theGuessCount").text("Guess Count: " + theGuessLength);
        $("#theGuessCount").show();
    });
    $("#blueButton").click(function(evt){
        document.getElementById("blueAudio").play();

        secondsRemaining = defaultSeconds;

        theGuessColors.push("blue");

        theGuessLength = theGuessColors.length;
        $("#theGuessCount").text("Guess Count: " + theGuessLength);
        $("#theGuessCount").show();
    });
    $("#purpleButton").click(function(evt){
        document.getElementById("purpleAudio").play();

        secondsRemaining = defaultSeconds;

        theGuessColors.push("purple");

        theGuessLength = theGuessColors.length;
        $("#theGuessCount").text("Guess Count: " + theGuessLength);
        $("#theGuessCount").show();
    });

    $("#easyStart").click(function(evt){
        theAnswerLength = 1;
        theGuessLength = 0;

        $(".startButtons").hide();

        $("#report").text("");
        $("#wholeTimer").hide();
        secondsRemaining = defaultSeconds;
        window.clearInterval(window.theTimer);

        gameGoing = true;
        theAnswerColors = [];
        theGuessColors = [];


        doItEasy();
        theReport = "";
        $("#report").text(theReport);
    });

    $("#strictStart").click(function(evt){

        theAnswerLength = 1;
        theGuessLength = 0;

        $(".startButtons").hide();

        $("#report").text("");
        $("#wholeTimer").hide();
        secondsRemaining = defaultSeconds;
        window.clearInterval(window.theTimer);

        gameGoing = true;
        theAnswerColors = [];
        theGuessColors = [];


        doIt();
        theReport = "";
        $("#report").text(theReport);

    });

    $("#reset").click(function(evt){
        $("#reset").hide(500).delay(theDelay).show(500);
        theAnswerColors = [];
        theGuessColors = [];
        theAnswerLength = 1;
        theGuessLength = 0;
        gameGoing = false;
        theReport = "";

        hideItAll();

        $(".startButtons").delay(theDelay).show(500);
    });



});

function checkGuessAgainstAnswer(){
    if (theGuessColors.length !== theAnswerColors.length){
        theReport = "Not long enough";
        $("#report").text(theReport);
        theAnswerColors = [];
        gameGoing = false;
    }

    var allGood = true;
    for (var counter = 0; counter < theGuessColors.length; counter++){
        if (theGuessColors[counter] !== theAnswerColors[counter]){
            allGood = false;
        }
    }

    // victory at 20
    if (allGood === true && gameGoing && theAnswerColors.length === 20){
        theAnswerColors = [];
        alert("VICTORY! You did 20! Starting over now");
        return doIt();
    }

    if (allGood === true && gameGoing){
        // theReport = "Perfect"
        // $("#report").text(theReport);
        doIt();

    } else {
        theReport = "Incorrect"
        $("#report").text(theReport);
        theAnswerColors = [];
        gameGoing = false;
    }
}

function checkGuessAgainstAnswerEasy(){
    if (theGuessColors.length !== theAnswerColors.length){
        theReport = "Not long enough";
        $("#report").text(theReport);
        theAnswerColors = [];
        return redoEasy();
    }

    var allGood = true;
    for (var counter = 0; counter < theGuessColors.length; counter++){
        if (theGuessColors[counter] !== theAnswerColors[counter]){
            allGood = false;
        }
    }

    // victory at 20
    if (allGood === true && gameGoing && theAnswerColors.length === 20){
        theAnswerColors = [];
        alert("VICTORY! You did 20! Starting over now");
        return redoEasy();
    }


    if (allGood === true && gameGoing){
        // theReport = "Perfect"
        // $("#report").text(theReport);
        doItEasy();

    } else {
        theReport = "Incorrect"
        $("#report").text(theReport);
        theAnswerColors = [];
        return redoEasy()
    }
}

function hideItAll(){
    $("#theGuessCount").hide();
    $("#answerLength").hide();
    $("#wholeTimer").hide();
    $("#report").hide();

}

function doIt(){

    theGuessLength = 0;
    $("#theGuessCount").hide();
    $("#answerLength").text("Answer Count: " + theAnswerLength);
    $("#answerLength").show();

    //disables user input until after the sequence is completed
    $(".colorButtons").addClass("inactiveButtons");

    theDelay = 0;

    var anotherColor = theColors[Math.floor(Math.random()*theColors.length)];
    theAnswerColors.push(anotherColor);
    theAnswerLength += 1;

    for (var counter = 0; counter < theAnswerColors.length; counter++){


        highlightAndPlay(theAnswerColors[counter]);


        //enables user input after the sequence is completed
        if (counter === theAnswerColors.length - 1){
            window.doItTimer = setTimeout(function(){
                theGuessColors = [];
                $(".colorButtons").removeClass("inactiveButtons");
                $("#theGuessCount").text("Guess Count: " + theGuessLength);
                startTheTimer();

                // theReport = "";
                // $("#report").text(theReport);

            }, theDelay + 1000);
        }


    }


}

function doItEasy(){

    theGuessLength = 0;
    $("#theGuessCount").hide();
    $("#answerLength").text("Answer Count: " + theAnswerLength);
    $("#answerLength").show();

    //disables user input until after the sequence is completed
    $(".colorButtons").addClass("inactiveButtons");

    theDelay = 0;

    var anotherColor = theColors[Math.floor(Math.random()*theColors.length)];
    theAnswerColors.push(anotherColor);
    theAnswerLength += 1;

    for (var counter = 0; counter < theAnswerColors.length; counter++){

        highlightAndPlay(theAnswerColors[counter]);


        //enables user input after the sequence is completed
        if (counter === theAnswerColors.length - 1){
            window.doItEasyTimer = setTimeout(function(){
                theGuessColors = [];
                $(".colorButtons").removeClass("inactiveButtons");
                $("#theGuessCount").text("Guess Count: " + theGuessLength);

                startTheTimerEasy();

                // theReport = "";
                // $("#report").text(theReport);

            }, theDelay + 1000);
        }
    }


}

function redoEasy(){

    $("#timer").text("");

    theGuessLength = 0;
    $("#theGuessCount").hide();
    $("#answerLength").text("Answer Count: " + theAnswerLength);

    //disables user input until after the sequence is completed
    $(".colorButtons").addClass("inactiveButtons");

    theDelay = 0;

    for (var counter = 0; counter < theAnswerColors.length; counter++){

        highlightAndPlay(theAnswerColors[counter]);


        //enables user input after the sequence is completed
        if (counter === theAnswerColors.length - 1){
            window.redoEasyTimer = setTimeout(function(){
                theGuessColors = [];
                $(".colorButtons").removeClass("inactiveButtons");
                $("#theGuessCount").text("Guess Count: " + theGuessLength);
                $("#theGuessCount").show();
                startTheTimerEasy();

                // theReport = "";
                // $("#report").text(theReport);

            }, theDelay + 1000);
        }
    }


}

function startTheTimer(){

    secondsRemaining = 5;

    $("#wholeTimer").show();
    // $("#timer").text(secondsRemaining);

    window.theTimer = setInterval(function(){

        $("#timer").text(secondsRemaining);


        if (theGuessColors.length === theAnswerColors.length){
            $("#timer").text("");
            $("#wholeTimer").hide();
            $(".colorButtons").addClass("inactiveButtons");
            checkGuessAgainstAnswer();
            window.clearInterval(window.theTimer);
        }


        // 1 because for some reason it works better
        // technically gives one extra second since it drops to zero
        if (secondsRemaining < 1){
            $("#timer").text("0");
            $(".colorButtons").addClass("inactiveButtons");
            checkGuessAgainstAnswer();
            $("#report").text("Lost due to time running out");
            window.clearInterval(window.theTimer);
        }
        --secondsRemaining;
    }, 1000);
}

function startTheTimerEasy(){

    secondsRemaining = 5;

    $("#wholeTimer").show();
    // $("#timer").text(secondsRemaining);

    window.theTimer = setInterval(function(){

        $("#timer").text(secondsRemaining);


        if (theGuessColors.length === theAnswerColors.length){
            $("#timer").text("");
            $("#wholeTimer").hide();
            $(".colorButtons").addClass("inactiveButtons");
            checkGuessAgainstAnswerEasy();
            window.clearInterval(window.theTimer);
        }


        // 1 because for some reason it works better
        // technically gives one extra second since it drops to zero
        if (secondsRemaining < 1){
            $("#timer").text("0");
            window.clearInterval(window.theTimer);
            redoEasy();
        }
        --secondsRemaining;
    }, 1000);
}



function highlightAndPlay(color){

    theDelay += 1000;
    window.highlightAndPlayTimer = setTimeout(function(){
        if (color === "red"){
            highlightColor = "#ff6666";
            redButton.animate({
                backgroundColor: highlightColor
            }, 600, function(){
                redAudio.play();
                redButton.css("backgroundColor", "");
            });

        } else if (color === "green"){
            highlightColor = "#66b266";
            greenButton.animate({
                backgroundColor: highlightColor
            }, 600, function(){
                greenAudio.play();
                greenButton.css("backgroundColor", "");
            });
        } else if (color === "blue"){
            highlightColor = "#6666ff";
            blueButton.animate({
                backgroundColor: highlightColor
            }, 600, function(){
                blueAudio.play();
                blueButton.css("backgroundColor", "");
            });
        } else if (color === "purple"){
            highlightColor = "#b266b2";
            purpleButton.animate({
                backgroundColor: highlightColor
            }, 600, function(){
                purpleAudio.play();
                purpleButton.css("backgroundColor", "");

            });
        }
    }, theDelay);
}
