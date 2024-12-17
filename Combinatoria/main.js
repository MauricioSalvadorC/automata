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
    case "C":
      let resta= ejecutarMaquinaDeTuring(automataResta, representarOperacion(a, b, "-"));
      console.log("resta", resta);
      let factorialResta= ejecutarMaquinaDeTuring(automataMulti,ejecutarMaquinaDeTuring(automataFactorial, resta));
      console.log("factorialResta", factorialResta);
      let factorialA= ejecutarMaquinaDeTuring(automataMulti,ejecutarMaquinaDeTuring(automataFactorial, "1".repeat(a)));
      console.log("factorialA", factorialA);
      let factorialB= ejecutarMaquinaDeTuring(automataMulti,ejecutarMaquinaDeTuring(automataFactorial,"1".repeat(b)));
      console.log("factorialB", factorialB);
      let multi= ejecutarMaquinaDeTuring(automataMulti, factorialB+"*"+factorialResta);
      console.log("multi", multi);
      let division= ejecutarMaquinaDeTuring(automataDivision, factorialA+"/"+multi);
      console.log("division", division);

      setResult(division);
      break;
    case "+":
      ejecutarMaquinaDeTuring(automataSuma, representarOperacion(a, b, op));
      break;
    case "-":
      ejecutarMaquinaDeTuring(automataResta, representarOperacion(a, b, op));
      break;
    case "*":
      ejecutarMaquinaDeTuring(automataMulti, representarOperacion(a, b, op));
      break;
    case "/":
      ejecutarMaquinaDeTuring(automataResta, representarOperacion(a, b, op));
      break;

    default:
      break;
  }
}
