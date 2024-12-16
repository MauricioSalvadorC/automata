/////////////////////////////////////////////////////////////////////////////////////
// Crear el autómata SUMA
const automataSuma = new Automata("Suma");

// Crear nodos (estados)
var q0 = new Nodo("q0", false); // Estado inicial
var q1 = new Nodo("q1", false);
var q2 = new Nodo("q2", false);
var q3 = new Nodo("q3", false);
var q4 = new Nodo("q4", false);
var q5 = new Nodo("q5", false);
var q6 = new Nodo("q6", true); // Estado final

// Agregar arcos
q0.agregarArco("q0", "1", "1", "R");
q0.agregarArco("q0", "+", "+", "R");
q0.agregarArco("q1", "#", "=", "L");

q1.agregarArco("q1", "x", "x", "L");
q1.agregarArco("q1", "+", "+", "L");
q1.agregarArco("q2", "1", "x", "R");
q1.agregarArco("q4", "#", "#", "R");

q2.agregarArco("q2", "=", "=", "R");
q2.agregarArco("q2", "x", "x", "R");
q2.agregarArco("q2", "1", "1", "R");
q2.agregarArco("q2", "+", "+", "R");
q2.agregarArco("q3", "#", "1", "L");

q3.agregarArco("q3", "1", "1", "L");
q3.agregarArco("q1", "=", "=", "L");

q4.agregarArco("q4", "x", "1", "R");
q4.agregarArco("q4", "+", "+", "R");
q4.agregarArco("q5", "=", "=", "L");

q5.agregarArco("q5", "1", "1", "L");
q5.agregarArco("q5", "+", "+", "L");
q5.agregarArco("q6", "#", "#", "R");

// Agregar nodos al autómata
automataSuma.agregarNodo(q0);
automataSuma.agregarNodo(q1);
automataSuma.agregarNodo(q2);
automataSuma.agregarNodo(q3);
automataSuma.agregarNodo(q4);
automataSuma.agregarNodo(q5);
automataSuma.agregarNodo(q6);

// Mostrar el autómata
console.log(automataSuma.toString());
console.log(automataSuma);