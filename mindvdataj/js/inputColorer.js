window.onload = function() {


    var textEntry0 = document.getElementById("guessAt0Input");
    var textEntry1 = document.getElementById("guessAt1Input");
    var textEntry2 = document.getElementById("guessAt2Input");
    var textEntry3 = document.getElementById("guessAt3Input");

    var textEntries = [textEntry0, textEntry1, textEntry2, textEntry3];

    textEntries.forEach(function(element){
        element.oninput = function() {

            if (element.value === "r" || element.value === "R"){
                element.style.backgroundColor = "red";
            }
            else if (element.value === "g" || element.value === "G"){
                element.style.backgroundColor = "green";
            }
            else if (element.value === "b" || element.value === "B"){
                element.style.backgroundColor = "blue";
            }
            else if (element.value === "c" || element.value === "C"){
                element.style.backgroundColor = "cyan";
            }
            else if (element.value === "y" || element.value === "Y"){
                element.style.backgroundColor = "yellow";
            }
            else if (element.value === "m" || element.value === "M"){
                element.style.backgroundColor = "magenta";
            }
            else{
                element.style.backgroundColor = "";
            }

        };
    });

}
