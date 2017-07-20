// timing isn't exact. setInterval isn't exact, but also, I have it display 0.
//stops on last work set, not last break set.
//todo make pause button work

var DEFAULTCLOCKTIMEINSECONDS = 1000;




var clockModel = {


    secondsRemaining: DEFAULTCLOCKTIMEINSECONDS,

    setCounter: 0
}



$(document).ready(function(){


    $(".pomClock").toggle();

    $("#pomSubmit").click(function(evt){
        let howLongWork = $("#pomWorkTimeForm").val();
        let howLongBreak = $("#pomBreakTimeForm").val();
        let howManySets = $("#pomHowManyForm").val();

        $(".pomSetup").fadeToggle(200);
        $(".pomClock").fadeToggle(200);

        startWorkTimer(howLongWork, howLongBreak, howManySets);
    });

    $("#pomClockStopReset").click(function(evt){

        window.clearInterval(window.theIntervalTimer);
        $(".pomSetup").fadeToggle(200);
        $(".pomClock").fadeToggle(200);

    });

});


function startWorkTimer(workTime, breakTime, numberOfSets){

    timerHelper(workTime, breakTime, numberOfSets, "Work");

};

function startBreakTimer(workTime, breakTime, numberOfSets){

    timerHelper(workTime, breakTime, --numberOfSets, "Break")

};


function timerHelper(workTime, breakTime, numberOfSets, stringForWorkOrBreak){
    if (numberOfSets > 0){

        //if stringForWorkOrBreak = Work, sets howLong to workTime. else, sets it to breakTime.
        var howLong = stringForWorkOrBreak === "Work" ? workTime : breakTime;

        // converts minutes to seconds.
        // eventually get this to represent hours minutes seconds
        var eachIntervalSecondCounter = howLong * 60;

        // clears this each time timerHelper is called
        window.theIntervalTimer = "";

        //gets theAlarm once so I don't have to call for it a bunch.
        var theAlarm = document.getElementById("theAlarmAudio");


        //sets an interval timer as a window global variable, so that it can be stopped elsewhere
        //intervalTimer goes for either workTime or breakTime * 60
        //intervalTimer stops when it hits 0 or when Stop and Reset button is pressed (logic in the document ready function)
        //when intervalTimer stops, and there are still more sets to do, calls the next workTime or breakTime
        window.theIntervalTimer = window.setInterval(function(){
            $("#pomClockTime").text(eachIntervalSecondCounter);
            $("#pomClockStats").text(`${stringForWorkOrBreak} sets completed: ${clockModel.setCounter}`)

            --eachIntervalSecondCounter;

            if (eachIntervalSecondCounter < 0){
                window.clearInterval(window.theIntervalTimer);

                if (stringForWorkOrBreak === "Work"){

                    theAlarm.play();
                    startBreakTimer(workTime, breakTime, numberOfSets);
                } else {
                    theAlarm.play()
                    clockModel.setCounter++;
                    startWorkTimer(workTime, breakTime, numberOfSets);
                }
            }
        }, 1000);
    }
}
