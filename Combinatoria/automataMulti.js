/////////////////////////////////////////////////////////////////////////////////////
// Crear el autómata multiplicación infinita
const automataMulti = new Automata("Multiplicación Infinita");

// Crear nodos (estados)
var q0 = new Nodo("q0", false); // Estado inicial
var q1 = new Nodo("q1", false);
var q2 = new Nodo("q2", false);
var q3 = new Nodo("q3", false);
var q4 = new Nodo("q4", false);
var q5 = new Nodo("q5", false);
var q6 = new Nodo("q6", false);
var q7 = new Nodo("q7", false);
var q8 = new Nodo("q8", false);
var q9 = new Nodo("q9", false);
var q10 = new Nodo("q10", false);
var q11 = new Nodo("q11", false);
var q12 = new Nodo("q12", false); 
var q13 = new Nodo("q13", false);
var q14 = new Nodo("q14", true); // Estado final

var qa1 = new Nodo("qa1", false); // Estado inicial
var qa2 = new Nodo("qa2", false); // Estado inicial

// Agregar arcos
q0.agregarArco("q0", "1", "1", "R");
q0.agregarArco("q0", "*", "*", "R");
q0.agregarArco("q1", "#", "=", "L");

q1.agregarArco("q2", "1", "A", "L");
q1.agregarArco("q8", "*", "*", "L");

q2.agregarArco("q2", "1", "1", "L");
q2.agregarArco("q3", "*", "*", "L");
q2.agregarArco("qa1", "#", "#", "R");

qa1.agregarArco("qa1", "A", "1", "R");
qa1.agregarArco("qa2", "=", "#", "L");

qa2.agregarArco("qa2", "1", "1", "L");
qa2.agregarArco("q14", "#", "#", "R");

q3.agregarArco("q3", "B", "B", "L");
q3.agregarArco("q4", "1", "B", "R");
q3.agregarArco("q6", "*", "*", "R");
q3.agregarArco("q6", "#", "#", "R");

q4.agregarArco("q4", "B", "B", "R");
q4.agregarArco("q4", "*", "*", "R");
q4.agregarArco("q4", "1", "1", "R");
q4.agregarArco("q4", "A", "A", "R");
q4.agregarArco("q4", "=", "=", "R");
q4.agregarArco("q5", "#", "1", "L");

q5.agregarArco("q5", "1", "1", "L");
q5.agregarArco("q5", "=", "=", "L");
q5.agregarArco("q5", "A", "A", "L");
q5.agregarArco("q3", "*", "*", "L");

q6.agregarArco("q6", "B", "1", "R");
q6.agregarArco("q7", "*", "*", "R");

q7.agregarArco("q7", "1", "1", "R");
q7.agregarArco("q1", "A", "A", "L");

q8.agregarArco("q8", "1", "1", "L");
q8.agregarArco("q9", "#", "#", "R");
q8.agregarArco("q9", "*", "*", "R");

q9.agregarArco("q9", "1", "e", "R");
q9.agregarArco("q9", "*", "e", "R");
q9.agregarArco("q9", "A", "e", "R");
q9.agregarArco("q10", "=", "e", "R");

q10.agregarArco("q10", "e", "e", "R");
q10.agregarArco("q11", "1", "e", "L");
q10.agregarArco("q13", "#", "#", "L");

q11.agregarArco("q11", "e", "e", "L");
q11.agregarArco("q12", "*", "*", "R");
q11.agregarArco("q12", "#", "#", "R");
q11.agregarArco("q12", "1", "1", "R");

q12.agregarArco("q10", "e", "1", "R");

q13.agregarArco("q13", "e", "#", "L");
q13.agregarArco("q13", "1", "1", "L");
q13.agregarArco("q0", "*", "*", "R");
q13.agregarArco("q14", "#", "#", "R");




// Agregar nodos al autómata

automataMulti.agregarNodo(q0);
automataMulti.agregarNodo(q1);
automataMulti.agregarNodo(q2);
automataMulti.agregarNodo(q3);
automataMulti.agregarNodo(q4);
automataMulti.agregarNodo(q5);
automataMulti.agregarNodo(q6);
automataMulti.agregarNodo(q7);
automataMulti.agregarNodo(q8);
automataMulti.agregarNodo(q9);
automataMulti.agregarNodo(q10);
automataMulti.agregarNodo(q11);
automataMulti.agregarNodo(q12);
automataMulti.agregarNodo(q13);
automataMulti.agregarNodo(q14);
automataMulti.agregarNodo(qa1);
automataMulti.agregarNodo(qa2);

// Mostrar el autómata
console.log(automataMulti.toString());
console.log(automataMulti);