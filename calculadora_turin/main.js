let salida = document.querySelector("#resultado")

function setResult(texto) {
    salida.innerHTML += texto
}
function createCinta(a, b, op) {
    let cinta = [];
    cinta = cinta.concat(Array(a).fill(1), op, Array(b).fill(1));
    return cinta;
}

function sumaTurin(cinta) {

    //let cinta = ["1", "1", "1", "1", "+", "1", "1"];
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
                if (cinta[i] == "1" || cinta[i] == "+" || cinta[i] == "=" || cinta[i] == "x") {
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

        let flecha = (i > iA ? "->" : "<-")

        setResult("[#|" + cinta.toString().replace(/,/g, "|") + "|#] | p:" + (i + 1) + ' | dir:' + flecha)
        //console.log("[#|"+cinta.toString().replace(/,/g,"|")+"|#] | p:"+(i+1)+' | dir:'+flecha )
    }

    return cinta;
}

function restaTurin(cinta) {

    //let cinta = ['1', '1', '1', '-', '1', '1', '1'];
    let estado = 1;
    let estadoFinal = 16;
    let i = 0, iA;


    while (estado != estadoFinal) {

        iA = i;

        switch (estado) {

            case 1: {  // Estado 1
                if (cinta.length == i) {
                    cinta.push('=')
                    i--
                    estado = 2
                    break
                }
                else if (cinta[i] == '1' || cinta[i] == '-') {
                    i++
                }
                break
            }
            case 2: {  // Estado 2
                if (cinta[i] == '1') {
                    cinta[i] = 'x'
                    i--
                    estado = 3
                }
                break;
            }
            case 3: {  // Estado 3
                if (cinta[i] == '1') {
                    i--
                }
                else if (cinta[i] == '-') {
                    i--
                    estado = 4
                }
                break
            }
            case 4: {  // Estado 4
                if (i < 0) {
                    i++
                    estado = 10
                    break
                }
                else if (cinta[i] == 'x') {
                    i--
                }
                else if (cinta[i] == '1') {
                    cinta[i] = 'x'
                    i++
                    estado = 5
                }
                break
            }
            case 5: {  // Estado 5
                if (cinta[i] == 'x' || cinta[i] == '-' || cinta[i] == '1') {
                    i++
                }
                else if (cinta[i] == '=') {
                    i--
                    estado = 6
                }
                break
            }
            case 6: {  // Estado 6
                if (cinta[i] == 'x') {
                    i--
                }
                else if (cinta[i] == '1') {
                    cinta[i] = 'x'
                    i--
                    estado = 3
                }
                else if (cinta[i] == '-') {
                    i--
                    estado = 7
                }
                break
            }
            case 7: {  // Estado 7
                if (i < 0) {
                    i++
                    estado = 8
                    break
                }
                else if (cinta[i] == 'x') {
                    i--
                }
                else if (cinta[i] == '1') {
                    cinta[i] = 'x'
                    i++
                    estado = 11
                }
                break
            }
            case 8: {  // Estado 8
                if (cinta.length == i) {
                    cinta.push('0')
                    i--
                    estado = 9
                }
                else if (cinta[i] == 'x' || cinta[i] == '1' || cinta[i] == '=' || cinta[i] == '-') {
                    i++
                }
                break
            }
            case 9: {  // Estado 9
                if (i < 0) {
                    i++
                    estado = 14
                }
                else if (cinta[i] == 'x' || cinta[i] == '1' || cinta[i] == '=' || cinta[i] == '-') {
                    i--
                }
                break
            }
            case 10: {  // Estado 10
                if (cinta.length == i) {
                    cinta.push('-')
                    i++
                    estado = 15
                    break
                }
                else if (cinta[i] == 'x' || cinta[i] == '1' || cinta[i] == '=' || cinta[i] == '-') {
                    i++
                }
                break
            }
            case 11: {  // Estado 11
                if (cinta.length == i) {
                    cinta.push('1')
                    i--
                    estado = 12
                    break
                }
                else if (cinta[i] == 'x' || cinta[i] == '1' || cinta[i] == '=' || cinta[i] == '-') {
                    i++
                }
                break
            }
            case 12: {  // Estado 12
                if (cinta[i] == '1' || cinta[i] == '-') {
                    i--
                }
                else if (cinta[i] == '=') {
                    i--
                    estado = 13
                }
                break
            }
            case 13: {  // Estado 13
                if (i < 0) {
                    i++
                    estado = 14
                    break
                }
                else if (cinta[i] == '=' || cinta[i] == '-' || cinta[i] == 'x') {
                    i--
                }
                else if (cinta[i] == '1') {
                    cinta[i] = 'x'
                    i++
                    estado = 11
                }
                break
            }
            case 14: {  // Estado 14
                if (cinta.length == i) {
                    estado = 16
                    break
                }
                else if (cinta[i] == '1' || cinta[i] == '=' || cinta[i] == '-' || cinta[i] == '0') {
                    i++
                }
                else if (cinta[i] == 'x') {
                    cinta[i] = '1'
                    i++
                }
                break
            }
            case 15: {  // Estado 15
                if (cinta.length == i) {
                    cinta.push('1')
                    i--
                    estado = 13
                }
                break
            }
        }

        let flecha = (i > iA ? "->" : "<-")

        setResult("[#|" + cinta.toString().replace(/,/g, "|") + "|#] | p:" + (i + 1) + ' | dir:' + flecha)
        //console.log("[#|"+cinta.toString().replace(/,/g,"|")+"|#] | p:"+(i+1)+' | dir:'+flecha )
    }

    return cinta;
}

function multiplicacionTurin(cinta) {

    //let cinta = ['1', '1', '1', '*', '1', '1', '1', '1'];
    let estado = 1;
    let estadoFinal = 10;
    let i = 0, iA;


    while (estado != estadoFinal) {

        switch (estado) {
            case 1: {  // Estado 1
                if (cinta.length == i) {
                    cinta.push('=');
                    i--;
                    estado = 2;
                    break
                }
                else if (cinta[i] == '1' || cinta[i] == '*') {
                    i++;
                }
                break;
            }
            case 2: {  // Estado 2
                if (cinta[i] == '1') {
                    cinta[i] = 'x';
                    i--;
                    estado = 3;
                    break;
                }
                else if (cinta[i] == '*') {
                    i++;
                    estado = 9;
                    break;
                }
                else if (cinta[i] == 'x') {
                    i--;
                }
                break;
            }
            case 3: {  // Estado 3
                if (cinta[i] == '1') {
                    i--;
                }
                else if (cinta[i] == '*') {
                    i--
                    estado = 4;
                }
                break;
            }
            case 4: {  // Estado 4
                if (i < 0) {
                    i++;
                    estado = 7;
                    break;
                }
                else if (cinta[i] == 'y') {
                    i--;
                }
                else if (cinta[i] == '1') {
                    cinta[i] = 'y';
                    i++;
                    estado = 5;
                }
                break;
            }
            case 5: {  // Estado 5
                if (cinta.length == i) {
                    cinta.push('1');
                    i--;
                    estado = 6;
                }
                else if (cinta[i] == 'x' || cinta[i] == 'y' || cinta[i] == '*' || cinta[i] == '1' || cinta[i] == '=') {
                    i++;
                }
                break;
            }
            case 6: {  // Estado 6
                if (cinta[i] == '1' || cinta[i] == '=' || cinta[i] == 'x') {
                    i--;
                }
                else if (cinta[i] == '*') {
                    i--;
                    estado = 4;
                }
                break;
            }
            case 7: {  // Estado 7
                if (cinta[i] == '*' || cinta[i] == 'x' || cinta[i] == '1') {
                    i++;
                }
                else if (cinta[i] == 'y') {
                    cinta[i] = '1';
                    i++;
                }
                else if (cinta[i] == '=') {
                    i--;
                    estado = 8;
                }
                break;
            }
            case 8: {  // Estado 8
                if (cinta[i] == 'x') {
                    i--;
                    estado = 2;
                }
                break;
            }
            case 9: {  // Estado 9
                if (cinta.length == i) {
                    estado = 10;
                }
                else if (cinta[i] == '1' || cinta[i] == '=') {
                    i++;
                }
                else if (cinta[i] == 'x') {
                    cinta[i] = 1;
                    i++;
                }
                break;
            }
        }

        let flecha = (i > iA ? "->" : "<-")

        setResult("[#|" + cinta.toString().replace(/,/g, "|") + "|#] | p:" + (i + 1) + ' | dir:' + flecha)
        //console.log("[#|"+cinta.toString().replace(/,/g,"|")+"|#] | p:"+(i+1)+' | dir:'+flecha )
    }

    return cinta;
}

function divisionTurin(cinta) {

    //let cinta = ['1', '1', '1', '1','1','1','1','1', '/', '1', '1', '1'];
    let estado = 1;
    let estadoFinal = 16;
    let i = 0, iA;
    
    while (estado != estadoFinal) {
    
        switch (estado) {
            case 1: {  // Estado 1
                if (cinta.length == i) {
                    cinta.push('=');
                    i--;
                    estado = 2;
                    break
                }
                else if (cinta[i] == '1' || cinta[i] == '/') {
                    i++;
                }
                break;
            }
            case 2: {  // Estado 2
                if (i < 0) {
                    i++;
                    estado = 3;
                    break;
                }
                else if (cinta[i] == 'x' || cinta[i] == 'y' || cinta[i] == '/' || cinta[i] == '1') {
                    i--;
                } 
                break;
            }
            case 3: {  // Estado 3
                if(cinta[i] == 'x'){
                    i++;
                }
                else if(cinta[i]=='1'){
                    cinta[i] = 'x';
                    i++;
                    estado = 4;
                }
                else if(cinta[i] == '/'){
                    i++;
                    estado = 9;
                }
                break;
            }
            case 4: {  // Estado 4
                if (cinta[i] == '1') {
                    i++;
                }
                else if (cinta[i] == '/') {
                    i++;
                    estado = 5;
                }
                break;
            }
            case 5: {  // Estado 5
                if (cinta[i] == 'y') {
                    i++;
                }
                else if(cinta[i] == '1'){
                    cinta[i] = 'y';
                    i--;
                    estado = 2;
                }
                else if(cinta[i] == '='){
                    i++;
                    estado=6;
                }
                break;
            }
            case 6: {  // Estado 6
                if (cinta.length == i) {
                    cinta.push('1');
                    i--;
                    estado = 7;
                }
                else if(cinta[i]=='1'){
                    i++;
                }
                break;
            }
            case 7: {  // Estado 7
                if (cinta[i] == '1'||cinta[i] == '='||cinta[i] == '/') {
                    i--;
                }
                else if(cinta[i] == 'y'){
                    cinta[i]='1';
                    i--;
                }
                else if (cinta[i] == 'x') {
                    cinta[i]='1';
                    i--;
                    estado = 8;
                }
                break;
            }
            case 8: {  // Estado 8
                if (i < 0) {
                    i++;
                    estado = 3;
                    break;
                }
                else if (cinta[i]=='x') {
                    i--;
                }
                break;
            }
            case 9: {  // Estado 9
                if (cinta[i] == 'y') {
                    i++;
                }
                else if (cinta[i] == '1') {
                    i++;
                    estado = 10;
                }
                else if(cinta[i]=='='){
                    i++;
                    estado = 13;
                }
                break;
            }
            case 10: {  // Estado 10
                if (cinta.length == i) {
                    cinta[i] = 'R'
                    i--;
                    estado = 11;
                }
                else if (cinta[i] == '1'||cinta[i] == '='||cinta[i] == 'y'){
                    i++;
                }
                break;
            }
            case 11:{//Estado 11
                if(cinta[i]=='1'||cinta[i]=='='||cinta[i]=='R'){
                    i--;    
                }
                else if(cinta[i]=='/'){
                    i++;
                    estado = 15;
                }
                else if(cinta[i]=='y'){
                    cinta[i] = '1';
                    i++;
                    estado = 12;
                }
                break;    
            }
            case 12:{//Estado 12
                if(cinta.length == i){
                    cinta.push('1');
                    i--;
                    estado = 11;
                }
                else if(cinta[i]=='1'||cinta[i]=='='||cinta[i]=='R'){
                    i++;    
                }
                break;
            }
            case 13:{//Estado 13
                if(cinta.length == i){
                    cinta.push('1');
                    i--;
                    estado = 14;
                }
                else if(cinta[i]=='1'){
                    i++;
                }
                break;
            }
            case 14:{//Estado 14
                if(i<0){
                    estado = 16;
                }
                else if(cinta[i]=='1'||cinta[i]=='='||cinta[i]=='/'||cinta[i]=='R'){
                    i--;
                }
                else if(cinta[i]=='x'||cinta[i]=='y'){
                    cinta[i] = '1';
                    i--;
                }
                break;
            }
            case 15:{//Estado 15
                if(cinta.length == i){
                    i--;
                    estado = 14
                }
                else if(cinta[i]=='1'||cinta[i]=='='||cinta[i]=='R'){
                    i++;
                }
                break;
            }
        }

        let flecha = (i > iA ? "->" : "<-")

        setResult("[#|" + cinta.toString().replace(/,/g, "|") + "|#] | p:" + (i + 1) + ' | dir:' + flecha)
        //console.log("[#|"+cinta.toString().replace(/,/g,"|")+"|#] | p:"+(i+1)+' | dir:'+flecha )
    }

    return cinta;
}

function calcular() {
    salida.innerHTML = ""
    let a = parseInt(document.querySelector("#num1").value)
    let b = parseInt(document.querySelector("#num2").value)
    let op = document.querySelector("#operation").value

    let cinta, label

    switch (op) {
        case "+":
            cinta = createCinta(a, b, op);
            label = Array.from(document.getElementsByTagName("label"))[3]

            let suma = sumaTurin(cinta)
            label.innerText = `Resultado: [${suma.toString().replace(/,/g, "|")}]`
            break;
        case "-":
            cinta = createCinta(a, b, op);
            label = Array.from(document.getElementsByTagName("label"))[3]

            let resta = restaTurin(cinta)
            label.innerText = `Resultado: [${resta.toString().replace(/,/g, "|")}]`
            break;
        case "*":
            cinta = createCinta(a, b, op);
            label = Array.from(document.getElementsByTagName("label"))[3]

            let multiplicacion = multiplicacionTurin(cinta)
            label.innerText = `Resultado: [${multiplicacion.toString().replace(/,/g, "|")}]`
            break;
        case "/":
            cinta = createCinta(a, b, op);
            label = Array.from(document.getElementsByTagName("label"))[3]

            let division = divisionTurin(cinta)
            label.innerText = `Resultado: [${division.toString().replace(/,/g, "|")}]`
            break;

        default:
            break;
    }
}



