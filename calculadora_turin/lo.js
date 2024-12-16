let cinta = ["1", "1", "1", "+", "1", "1"];
let estado = 0;
let estadoFinal = 6;
let i = 0;

while (estado != estadoFinal) {
    switch (estado) {
        case 0: {   // Estado 0
            
            if (cinta.length == i) {
                cinta.push("=");
                i--;

                estado = 1;
                console.log(cinta + " state 1, pos: " + cinta[i]);
                break;
            }
            if (cinta[i] == "1" || cinta[i] == "+") {
                i++;
            }
            break;
        }

        case 1: {   // Estado 1
            
            if (cinta[i] == "1") {
                cinta[i] = "x";

                console.log(cinta + " state 2, pos: " + cinta[i]);
                estado = 2;
            }
            break;
        }

        case 2: {   // Estado 2
            
            if (cinta.length == i) {
                cinta.push("1");
                i--;

                console.log(cinta + " state 3, pos: " + cinta[i]);
                estado = 3;
                break;
            }
            if (cinta[i] == "1" || cinta[i] == "+" || cinta[i] == "=" ||cinta[i] == "x") {
                i++;
            }
            break;
        }

        case 3: {   // Estado 3
            
            if (cinta[i] == "1") {
                i--;
            }
            if (cinta[i] == "=") {
                i--;

                console.log(cinta + " state 4, pos: " + cinta[i]);
                estado = 4;
            }
            break;
        }

        case 4: {   // Estado 4
            
            if (i < 0) {
                i++;

                console.log(cinta + " state 5, pos: " + cinta[i]);
                estado = 5;
                break;
            }
            if (cinta[i] == "x" || cinta[i] == "+") {
                i--;
            }
            if (cinta[i] == "1") {
                cinta[i] = "x";
                i++;

                console.log(cinta + " state 2, pos: " + cinta[i]);
                estado = 2;
            }
            break;
        }

        case 5: {    // Estado 5

            if (cinta.length == i) {
                estado = 6;
                i--;
                console.log(cinta + " state 6, pos: " + cinta[i]);
                break;
            }
            if (cinta[i] == "x") {
                cinta[i] = 1;
                i++;
            }
            if (cinta[i] == "+" || cinta[i] == "=" || cinta[i] == "1") {
                i++;
            }
            break;
        }
    }
}

console.log("CINTA: " + cinta);
