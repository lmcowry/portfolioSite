class GuessObj {
    constructor(s0){
        this.s0 = s0;

        this.css0;

        this.win = false;


        if (this.s0 === 'r'){
            this.css0 = "background:red";
        }
        else if (this.s0 === "g"){
            this.css0 = "background:green";
        }
        else if (this.s0 === "b"){
            this.css0 = "background:blue";
        }
        else if (this.s0 === "c"){
            this.css0 = "background:cyan";
        }
        else if (this.s0 === "y"){
            this.css0 = "background:yellow";
        }
        else if (this.s0 === "m"){
            this.css0 = "background:magenta";
        }


    }
}

var listOfOldGuesses = [];
var theAnswerList = [];


function loadOnce() {
    //check if this has been loaded before
    if (theAnswerList.length > 0){
        //might need to change this.  return - 1?
        return;
    }

    // need to have a check for repeat answers

    var possibleAnswers = ["r", "g", "b", "c", "y", "m"];
    var howManyAnswers = 1;
    for (var counter=0;counter<howManyAnswers;counter++){
        var rand0 = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

        var anAnswer = new GuessObj(rand0);
        theAnswerList.push(anAnswer);
    }
}

function loadData() {
    var g0 = $('#guessAt0Input').val().toLowerCase();



    var possibleAnswers = ["r", "g", "b", "c", "y", "m"];
    var guesses = [g0];

    var pattern = new RegExp(/^([rgbcym]$)/);
    var matches = true;

    guesses.forEach(function(eachGuessElement){
        if (pattern.test(eachGuessElement)){
            $("#errorStatement").text("");
        }
        else{
            matches = false;
            $("#errorStatement").text("");
            $("#errorStatement").append("Answers must be one of these: r g b c y m");
        }
    });

    if (matches === true){


        var thisGuess = new GuessObj(g0);
        listOfOldGuesses.push(thisGuess);

        // checks for a winner
        if (thisGuess.s0 === theAnswerList[0].s0){
            thisGuess.win = true;
        }


        $('.eachOldGuess').text("");

        // this creates a row for each guess in the list of old guesses and adds the inline css style for the color
        for (var counter = 0; counter < listOfOldGuesses.length; counter++){
            $('.eachOldGuess').append("<tr " + "id= guess" + counter + ">");

            $('#guess' + counter).append("<td style=" + listOfOldGuesses[counter].css0 + ">" + listOfOldGuesses[counter].s0 + "</td>");

            $('.eachOldGuess').append("</tr>");
        };


        // this adds the clue information to the row.  could easily be in the previous for loop, but tidied it up
        for (var counter = 0; counter < listOfOldGuesses.length; counter++){
            //check if it's a win guess or not.  if it is, print Win in place of the clues; if it isn't, print the regular clue
            if (listOfOldGuesses[counter].win === true){
                $('#guess' + counter).append("Winner!  Click <a href='tutorial2.html'>here</a> for Part 2 of the tutorial");
            }
            else{
                $('#guess' + counter).append("Not yet.  Keep trying");
            }

        };
    }
}

$('#guessSubmit').submit(function(e){
    e.preventDefault();
    loadOnce();
    loadData();
});
