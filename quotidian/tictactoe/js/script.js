
var emptySpot = "-";

var model = {
    player1Marker: "X",
    player2Marker: "O",
    withComputer: false,
    gameOver: false,
    whoWon: "",
    whoseTurn: "player1",
    XWinCounter: 0,
    OWinCounter: 0,
    gameCounter: 0,
    rules: "regular",
    switchTurns: function() {
        if (this.whoseTurn === "player1"){
            this.whoseTurn = "player2";
        } else if (this.whoseTurn === "player2"){
            this.whoseTurn = "player1";
        } else {
            // console.log("something fucked up with the switchTurns function")
        }
    },
    currentTurnMarker: function() {
        if (this.whoseTurn === "player1"){
            return this.player1Marker;
        } else if (this.whoseTurn ==="player2") {
            return this.player2Marker;
        } else {
            // console.log("something fucked up with the currentTurnMarker function");
        }
    },
    board: [emptySpot, emptySpot, emptySpot,
    emptySpot, emptySpot, emptySpot,
    emptySpot, emptySpot, emptySpot]
};




$(document).ready(function(){



    // $(".board").click(function(evt){
    //     $( this ).fadeOut(100).fadeIn(100);
    // });


    backgroundColorChanger();

    clearGame();
    $(".board").addClass("inactiveBoard");

    $("#playAgain").click(function(evt){

        clearGame();
        // playGameWithComputer();

        $("#onePlayerMode").attr("hidden", false);
        $("#twoPlayerMode").attr("hidden", false);
        $("#playAgain").attr("hidden", true);

    });

    $("#onePlayerMode").click(function(evt){
        $("#onePlayerMode").attr("hidden", true);
        $("#twoPlayerMode").attr("hidden", true);
        model.withComputer = true;
        chooseMarker();
    });

    $("#twoPlayerMode").click(function(evt){
        $("#onePlayerMode").attr("hidden", true);
        $("#twoPlayerMode").attr("hidden", true);
        chooseMarker();
    });

    $("#changeColor").click(function(evt){
        backgroundColorChanger();
    })
});



function backgroundColorChanger() {
    //#333333 dark gray
    //#990099 purple
    //#ff0000 almost ferrari red
    //#009688 turqoise
    //#ff9800 orange
    //#098243 army green
    var colors = ["#333333","#990099", "#ff0000", "#009688", "#ff9800", "#098243"];
    var rand = Math.floor(Math.random()*colors.length);
    $('body').css("background-color", colors[rand]);
};







function chooseMarker(){
    $("#markerChooser").attr("hidden", false);
    $("#player1IsX").click(function(evt){
        model.player1Marker = "X";
        model.player2Marker = "O";
        $("#markerChooser").attr("hidden", true);
        chooseRules();
    });
    $("#player1IsO").click(function(evt){
        model.player1Marker = "O";
        model.player2Marker = "X";
        $("#markerChooser").attr("hidden", true);
        chooseRules();
    });

};

function chooseRules(){
    $("#ruleChooser").attr("hidden", false);
    $("#regularRules").click(function(evt){
        model.rules = "regularRules";
        $("#ruleChooser").attr("hidden", true);
        startGame();
    });
    $("#oppositeRules").click(function(evt){
        model.rules = "oppositeRules";
        $("#ruleChooser").attr("hidden", true);
        startGame();
    });
}

function startGame(){
    if (model.withComputer){
        if (model.player1Marker === "O"){

            // if the user chooses to play against the computer and chooses to
            // use the O marker, then he elects to go second
            clearGame();
            model.whoseTurn = "player2";
            computerTurn();
        }
        playGameWithComputer();
    } else {
        playGameTwoPlayer();
    }
}

function clearGame(){
    model.whoWon = "";
    model.whoseTurn = "player1";
    model.board = [emptySpot, emptySpot, emptySpot,
    emptySpot, emptySpot, emptySpot,
    emptySpot, emptySpot, emptySpot];

    for (var x = 0; x < model.board.length; x++){
        $(`#${x}`).text(model.board[x]);
    }

    $("#turnText").attr("hidden", true);
};






function playGameTwoPlayer(){
    $(".board").removeClass("inactiveBoard");
    $("#playAgain").attr("hidden", true);
    $("#turnText").attr("hidden", false);
    $("#turnText").text(`${model.currentTurnMarker()}'s turn`);

    $(".board").click(function(evt){
        var whichButtonClicked = evt.target.id;
        render(whichButtonClicked);
        checkForGameOver();
        // if (model.whoWon !== ""){
        //     // console.log(x);
        //     $("#turnText").text(`Winner: ${model.whoWon}`);
        //     $(".board").addClass("inactiveBoard");
        //     $("#playAgain").attr("hidden", false);
        // }
    });
};

function playGameWithComputer(){
    $(".board").removeClass("inactiveBoard");
    $("#playAgain").attr("hidden", true);
    $("#turnText").attr("hidden", false);
    model.withComputer = true;

    $("#turnText").text(`${model.currentTurnMarker()}'s turn`);



    if (model.whoseTurn === "player1"){
        $(".board").click(function(evt){
            var whichButtonClicked = evt.target.id;
            render(whichButtonClicked);
            checkForGameOver();
            computerTurn();
            checkForGameOver();
        });
    }


}

function computerTurn(){

    if (model.whoseTurn === "player2" && model.withComputer){
        var possibleMoves = [];

        for (var x = 0; x < model.board.length; x++){
            if (model.board[x] === "-"){
                possibleMoves.push(x);
            }
        }

        var randomPick = Math.floor(Math.random() * possibleMoves.length);

        // $(`#${randomPick}`).css( "backgroundColor", "white");
        // $(`#${randomPick}`).css( "backgroundColor", "");


        render(possibleMoves[randomPick]);

    }

};




function render(userClickSpot){


    if (model.board[userClickSpot] === emptySpot){
        model.board[userClickSpot] = model.currentTurnMarker();
        model.switchTurns();
        $("#turnText").text(`${model.currentTurnMarker()}'s turn`);
    }

    for (var x = 0; x < model.board.length; x++){
        $(`#${x}`).text(model.board[x]);
    }


};

function checkForGameOver(){

    // | -- 0 -- | -- 1 -- | -- 2 -- |
    // | -- 3 -- | -- 4 -- | -- 5 -- |
    // | -- 6 -- | -- 7 -- | -- 8 -- |

    // | -- 0 -- | -- 0 -- | -- c -- |
    // | -- 0 -- | -- b -- | -- 0 -- |
    // | -- a -- | -- 0 -- | -- 0 -- |





        var a = model.board[6];

        //checks for all the ways [a] can win. left vertical, bottom horizontal,
        //down left to up right diagonal
        if (a !== emptySpot && ((model.board[0] === a && model.board[3] === a) || (model.board[7] === a && model.board[8] === a) ||
        (model.board[4] === a && model.board[2] === a))){
             //this would assign the winner to be whoever's marker is same
             //as a's
            model.whoWon = a;
            // return `${model.whoWon} was the winner`;
        }


        //checks for all the ways [b] can win. middle horizontal, middle vertical,
        //up left to down right diagonal
        var b = model.board[4];

        if (b !== emptySpot && ((model.board[3] === b && model.board[5] === b) ||
        (model.board[1] === b && model.board[7] === b) ||
        (model.board[0] === b && model.board[8] === b))){
            model.whoWon = b;
            // return `${model.whoWon} was the winner`;
        }


        //checks for all the ways [c] can win. top horizontal, right vertical
        var c = model.board[2];

        if (c !== emptySpot && ((model.board[0] === c && model.board[1] === c) ||
        (model.board[5] === c && model.board[8] === c))){
            model.whoWon = c;
            // return `${model.whoWon} was the winner`;
        }



        if (model.rules === "regularRules"){
            var allSpotsFilled = true;
            for (var x = 0; x < model.board.length; x++){
                if (model.board[x] === emptySpot){
                    allSpotsFilled = false;
                }
            }
            if (allSpotsFilled && model.whoWon === ""){

                $("#turnText").text("Stalemate");
                $(".board").addClass("inactiveBoard");
                $("#playAgain").attr("hidden", false);
                model.withComputer = false;

            } else if (model.whoWon !== ""){
                $("#turnText").text(`Winner: ${model.whoWon}`);

                // ++model[`${model.whoWon}WinCounter`];

                // $("#xWinCount").text(model.XWinCounter);
                // $("#oWinCount").text(model.OWinCounter);


                $(".board").addClass("inactiveBoard");
                $("#playAgain").attr("hidden", false);
                model.withComputer = false;
            }
        } else {

            var allSpotsFilled = true;
            for (var x = 0; x < model.board.length; x++){
                if (model.board[x] === emptySpot){
                    allSpotsFilled = false;
                }
            }
            if (allSpotsFilled && model.whoWon === ""){

                $("#turnText").text("Stalemate");
                $(".board").addClass("inactiveBoard");
                $("#playAgain").attr("hidden", false);
                model.withComputer = false;

            } else if (model.whoWon !== ""){
                $("#turnText").text(`Loser: ${model.whoWon}`);

                // --model[`${model.whoWon}WinCounter`];
                //
                // $("#xWinCount").text(model.XWinCounter);
                // $("#oWinCount").text(model.OWinCounter);


                $(".board").addClass("inactiveBoard");
                $("#playAgain").attr("hidden", false);
                model.withComputer = false;
            }


        }




};
