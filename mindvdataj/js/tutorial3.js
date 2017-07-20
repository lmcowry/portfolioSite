class GuessObj {
    constructor(s0, s1, s2){
        this.s0 = s0;
        this.s1 = s1;
        this.s2 = s2;

        this.css0;
        this.css1;
        this.css2;

        this.cs0;
        this.cs1;
        this.cs2;

        this.cf2;

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


        if (this.s1 === "r"){
            this.css1 = "background:red";
        }
        else if (this.s1 === "g"){
            this.css1 = "background:green";
        }
        else if (this.s1 === "b"){
            this.css1 = "background:blue";
        }
        else if (this.s1 === "c"){
            this.css1 = "background:cyan";
        }
        else if (this.s1 === "y"){
            this.css1 = "background:yellow";
        }
        else if (this.s1 === "m"){
            this.css1 = "background:magenta";
        }


        if (this.s2 === "r"){
            this.css2 = "background:red";
        }
        else if (this.s2 === "g"){
            this.css2 = "background:green";
        }
        else if (this.s2 === "b"){
            this.css2 = "background:blue";
        }
        else if (this.s2 === "c"){
            this.css2 = "background:cyan";
        }
        else if (this.s2 === "y"){
            this.css2 = "background:yellow";
        }
        else if (this.s2 === "m"){
            this.css2 = "background:magenta";
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
    var howManyAnswers = 3;
    for (var counter=0;counter<howManyAnswers;counter++){
        if (theAnswerList.length == 0){
            var rand0 = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
            var rand1 = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
            var rand2 = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

            var anAnswer = new GuessObj(rand0, rand1, rand2);
            theAnswerList.push(anAnswer);
        }
        else{
            // checks if theAnswerList has added an answer for this iteration
            // guarantees that all the answers in the list are different
            while(theAnswerList.length <= counter){
                var rand0 = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
                var rand1 = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
                var rand2 = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

                var isItUnique = true;

                // changes isItUnique to false if an answer is found that would be the same
                theAnswerList.forEach(function(eachAnswer){
                    if (rand0 === eachAnswer.s0 && rand1 === eachAnswer.s1 && rand2 === eachAnswer.s2){
                        isItUnique = false;
                    }
                });
                if (isItUnique){
                    var anAnswer = new GuessObj(rand0, rand1, rand2);
                    theAnswerList.push(anAnswer);
                }
            }
        }

    }

}

function loadData() {
    var g0 = $('#guessAt0Input').val().toLowerCase();
    var g1 = $('#guessAt1Input').val().toLowerCase();
    var g2 = $('#guessAt2Input').val().toLowerCase();

    var possibleAnswers = ["r", "g", "b", "c", "y", "m"];
    var guesses = [g0, g1, g2];

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

        var thisGuess = new GuessObj(g0, g1, g2);
        listOfOldGuesses.push(thisGuess);

        // gets rid of the solved answers
        var whichAnswerSolved = null;
        for (var counter = 0; counter < theAnswerList.length; counter++){
            if (theAnswerList[counter].win === true){
                whichAnswerSolved = counter;
            }
        }
        if (whichAnswerSolved !== null){
            theAnswerList.splice(whichAnswerSolved, 1);
        }

        // counts the colors in the answers
        var answerColorCounterObject = {
            "r": 0,
            "g": 0,
            "b": 0,
            "c": 0,
            "y": 0,
            "m": 0
        };

        var answerColorCounter = function(){
            theAnswerList.forEach(function(eachAnswer){
                answerColorCounterObject[eachAnswer.s0]++;
                answerColorCounterObject[eachAnswer.s1]++;
                answerColorCounterObject[eachAnswer.s2]++;
            })
        };

        answerColorCounter();

        var exclaCounterS0 = 0;
        var exclaCounterS1 = 0;
        var exclaCounterS2 = 0;

        // gives a ! for right color right spot, ? for right color wrong spot, and X for wrong color wrong spot
        // uses the answerColorCounter
        var clueGiver = function(){
            theAnswerList.forEach(function(eachAnswer){
                if (thisGuess.s0 === eachAnswer.s0){
                    exclaCounterS0 += 1;
                }

                if (thisGuess.s1 === eachAnswer.s1){
                    exclaCounterS1 += 1;
                }

                if (thisGuess.s2 === eachAnswer.s2){
                    exclaCounterS2 += 1;
                }
            });

            // if exclaCounter has something, then add an ! clue.  if not, add a ? clue
            if (exclaCounterS0 > 0){
                thisGuess.cs0 = `${exclaCounterS0}!`;
            }
            else{
                thisGuess.cs0 = `${answerColorCounterObject[thisGuess.s0]}?`;
            }
            if (exclaCounterS1 > 0){
                thisGuess.cs1 = `${exclaCounterS1}!`;
            }
            else{
                thisGuess.cs1 = `${answerColorCounterObject[thisGuess.s1]}?`;
            }
            if (exclaCounterS2 > 0){
                thisGuess.cs2 = `${exclaCounterS2}!`;
            }
            else{
                thisGuess.cs2 = `${answerColorCounterObject[thisGuess.s2]}?`;
            }

        };

        clueGiver();

        //checks if theGuess' first two spots are the first two spots of how many answers
        var firstTwo = 0;
        theAnswerList.forEach(function(eachAnswer){
            if (thisGuess.s0 === eachAnswer.s0 && thisGuess.s1 === eachAnswer.s1){
                firstTwo++;
            }
        });
        thisGuess.cf2 = firstTwo;

        //checks if theGuess is an answer
        var isItAWinner = function(){
            theAnswerList.forEach(function(eachAnswer){
                if (thisGuess.s0 === eachAnswer.s0 && thisGuess.s1 === eachAnswer.s1 && thisGuess.s2 === eachAnswer.s2){
                    thisGuess.win = true;
                    eachAnswer.win = true;

                }
            });
        };

        isItAWinner();

        // checks if all answers have been guessed
        function areAllAnswersGuessed(){
            var yesTheyAre = true;
            theAnswerList.forEach(function(eachAnswer){
                if (eachAnswer.win === false){
                    yesTheyAre = false;
                }
            });
            if (yesTheyAre === true){
                return true;
            }
            return false;
        }

        var wonItAll = areAllAnswersGuessed();





        $('.eachOldGuess').text("");

        // this creates a row for each guess in the list of old guesses and adds the inline css style for the color
        for (var counter = 0; counter < listOfOldGuesses.length; counter++){
            $('.eachOldGuess').append("<tr " + "id= guess" + counter + ">");

            $('#guess' + counter).append("<td style=" + listOfOldGuesses[counter].css0 + ">" + listOfOldGuesses[counter].s0 + "</td>");
            $('#guess' + counter).append("<td style=" + listOfOldGuesses[counter].css1 + ">" + listOfOldGuesses[counter].s1 + "</td>");
            $('#guess' + counter).append("<td style=" + listOfOldGuesses[counter].css2 + ">" + listOfOldGuesses[counter].s2 + "</td>");

            $('.eachOldGuess').append("</tr>");
        }


        // this adds the clue information to the row.  could easily be in the previous for loop, but tidied it up
        for (var counter = 0; counter < listOfOldGuesses.length; counter++){
            //check if it's a win guess or not.  if it is, print Win in place of the clues; if it isn't, print the regular clue
            $('#guess' + counter).append("<td>" + listOfOldGuesses[counter].cs0 + "</td>");
            $('#guess' + counter).append("<td>" + listOfOldGuesses[counter].cs1 + "</td>");
            $('#guess' + counter).append("<td>" + listOfOldGuesses[counter].cs2 + "</td>");

            $('#guess' + counter).append("<td style= padding-left:1em>" + listOfOldGuesses[counter].cf2) + "</td>";
            if (listOfOldGuesses[counter].win === true){
                $('#guess' + counter).append("<td style= padding-left:1em>" + "You've solved this code! Keep going to get them all" + "</td>");
                // this checks if all the answers have been guessed
                if (wonItAll === true){
                    $('#winStatement').text("");
                    $('#winStatement').append("YOU'VE WON IT ALL! Click <a href='tutorial4.html'>here</a> for Part 4 of the tutorial");
                }
            }

        };
    }
}

$('#guessSubmit').submit(function(e){
    e.preventDefault();
    loadOnce();
    loadData();
});
