let salida = document.querySelector("#resultado");

function setResult(texto) {
  salida.innerHTML += texto + "\n";
}
function createCinta(a, b, op) {
  let cinta = [];
  cinta = cinta.concat(Array(a).fill(1), op, Array(b).fill(1));
  return cinta;
}

let cinta = createCinta(2, 3, "+");
let label = Array.from(document.getElementsByTagName("label"))[3];
const representarOperacion = (a, b, op) =>
  `${"1".repeat(a)}${op}${"1".repeat(b)}`;

setResult(cinta);
function calcular() {
  salida.innerHTML = "";
  let a = parseInt(document.querySelector("#num1").value);
  let b = parseInt(document.querySelector("#num2").value);
  let op = document.querySelector("#operation").value;

  let cinta, label;

  switch (op) {
    case "+":
      ejecutarMaquinaDeTuring(automataSuma, representarOperacion(a, b, op));
      break;
    case "-":
      cinta = createCinta(a, b, op);
      label = Array.from(document.getElementsByTagName("label"))[3];

      let resta = restaTurin(cinta);
      label.innerText = `Resultado: [${resta.toString().replace(/,/g, "|")}]`;
      break;
    case "*":
      let validado= ejecutarMaquinaDeTuring(automataMulti0PorNum, representarOperacion(a, b, op));
      let validado2= ejecutarMaquinaDeTuring(automataMultiNumPor0, validado);
      ejecutarMaquinaDeTuring(automataMulti, validado2);
      break;
    case "/":
      cinta = createCinta(a, b, op);
      label = Array.from(document.getElementsByTagName("label"))[3];

      let division = divisionTurin(cinta);
      label.innerText = `Resultado: [${division
        .toString()
        .replace(/,/g, "|")}]`;
      break;

    default:
      break;
  }
}
