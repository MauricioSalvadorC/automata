
let cinta = ["1", "1", "1", "1", "+", "1", "1"];
let estado = 0;
let estadoFinal = 6;
let i = 0, iA = -1;

while (estado != estadoFinal) {

    iA = i;

    switch (estado) {
        
        case 0: {   // Estado 0
            
            if (cinta.length == i) {
                cinta.push("=");
                i--;

                estado = 1;
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

                estado = 2;
            }
            break;
        }

        case 2: {   // Estado 2
            
            if (cinta.length == i) {
                cinta.push("1");
                i--;

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

                estado = 4;
            }
            break;
        }

        case 4: {   // Estado 4
            
            if (i < 0) {
                i++;

                estado = 5;
                break;
            }
            if (cinta[i] == "x" || cinta[i] == "+") {
                i--;
            }
            if (cinta[i] == "1") {
                cinta[i] = "x";
                i++;

                estado = 2;
            }
            break;
        }

        case 5: {    // Estado 5

            if (cinta.length == i) {
                estado = 6;
                i--;
                
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

    let flecha = (i>iA ? "->": "<-")

    console.log("[#|"+cinta.toString().replace(/,/g,"|")+"|#] | p:"+(i+1)+' | dir:'+flecha )
}



  