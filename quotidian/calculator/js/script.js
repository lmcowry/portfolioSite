$(document).ready(function(){


    $(".calcNum").click(function(evt){
        $("#numbersHere").append(evt.currentTarget.innerHTML);
    });

    $("body").keypress(function(evt) {
        if (evt.which == 48){
            $("#numbersHere").append("0");
        } else if (evt.which == 49){
            $("#numbersHere").append("1");
        } else if (evt.which == 50){
            $("#numbersHere").append("2");
        } else if (evt.which == 51){
            $("#numbersHere").append("3");
        } else if (evt.which == 52){
            $("#numbersHere").append("4");
        } else if (evt.which == 53){
            $("#numbersHere").append("5");
        } else if (evt.which == 54){
            $("#numbersHere").append("6");
        } else if (evt.which == 55){
            $("#numbersHere").append("7");
        } else if (evt.which == 56){
            $("#numbersHere").append("8");
        } else if (evt.which == 57){
            $("#numbersHere").append("9");
        }

        else if (evt.which == 46){
            if ($("#numbersHere").text().indexOf(".") !== -1){
                // console.log("already has decimal");
            } else {
                $("#numbersHere").append(".");
            }
        }

        else if (evt.which == 27){
            //esc
            // same as clicking AC
            $("#calculationHere").empty();
            $("#numbersHere").empty();
            $("#totalHere").empty();
        }

    })


    $(".calcOperator").click(function(evt){
        let currentNums = $("#numbersHere").text();

        if (currentNums.length === 0){
            //want to make sure that numbers never starts with an operator

        } else {
            //want to make sure that double operators never happen
            if (currentNums.indexOf("÷") !== -1 || currentNums.indexOf("x") !== -1  || currentNums.indexOf("-") !== -1  || currentNums.indexOf("+") !== -1  ){

            } else {
                let currentNum = $("#numbersHere").text();
                let selectedOperator = evt.currentTarget.innerHTML;
                $("#calculationHere").append(currentNum + selectedOperator);
                // $("#calculationHere").append(selectedOperator);
                $("#numbersHere").empty();
            }

        }


    });

    $("#calcDec").click(function(evt){
        if ($("#numbersHere").text().indexOf(".") !== -1){
            // console.log("already has decimal");
        } else {
            $("#numbersHere").append(".");
        }
    })

    $("#calcEqu").click(function(evt){
        //send whatever is left in the current input to the calculation string
        $("#calculationHere").append($("#numbersHere").text());
        //get rid of whatever is left in the current input
        $("#numbersHere").empty();


        var theTotal = workWithTheString($("#calculationHere").text());

        //will need to change this later when I want it to reuse old total
        $("#totalHere").empty();

        $("#totalHere").text(theTotal);
    });

    $("#calcAC").click(function(evt){
        $("#calculationHere").empty();
        $("#numbersHere").empty();
        $("#totalHere").empty();
    });

    $("#calcCE").click(function(evt){
        $("#numbersHere").empty();
    });
});


function workWithTheString(inputString){
    var aString = inputString;
    // console.log(aString);
    var newString = "";
    var done = false;


    while (!done){


        let firstNum = "";
        let firstNumDone = false;
        let secondNum = "";
        let secondNumDone = false;
        let theOperator = "";

        for (let x = 0; x < aString.length; x++){
            let currentChar = aString[x];

            if (!isNum(currentChar)){
                if (!firstNumDone && !secondNumDone){
                    theOperator = currentChar;
                    firstNumDone = true;
                } else if (firstNumDone){
                    secondNumDone = true;
                    break;
                }
            } else {
                if (!firstNumDone && !secondNumDone){
                    firstNum += currentChar;
                } else if (firstNumDone && !secondNumDone){
                    secondNum += currentChar;
                }
            }
        }

        if (anymoreOperatorsInString(aString)){
            done = false;

            //this is cheating, but it works
            if (!isNum(aString[aString.length - 1])){
                aString = aString.substr(0, aString.length - 1);
            }

        } else {
            // console.log(`All done. The answer is ${aString}`);
            done = true;
            //make sure this gets all the way out of the while loop
            break;
        }

        let howLong = firstNum.length + theOperator.length + secondNum.length;
        let theCalculation = doTheCalculation(firstNum, theOperator, secondNum);
        // console.log(`${firstNum} ${theOperator} ${secondNum} = ${theCalculation}`);
        aString = theCalculation + aString.substr(howLong);
    }

    return aString;
};

//works with decimals
function anymoreOperatorsInString(anInputString){
    for (let x = 0; x < anInputString.length; x++){
        if (anInputString[x] === "."){
            continue;
        }
        if (!isNum(anInputString[x])){
            return true;
        }
    }
    return false;
};

//works with decimals
function doTheCalculation(first, operator, second){
    if (operator === "+"){
        return parseFloat(first) + parseFloat(second);
    } else if (operator === "-") {
        return parseFloat(first) - parseFloat(second);
    } else if (operator === "x"){
        return parseFloat(first) * parseFloat(second);
    } else if (operator === "÷"){
        return parseFloat(first) / parseFloat(second);
    } else {
        return -1000;
    }
};

//works with decimals
//for this purpose, treat a decimal like a num
function isNum(aChar){
    if (aChar === "."){
        return true;
    }
    return !isNaN(parseFloat(aChar)) && isFinite(aChar);
};
