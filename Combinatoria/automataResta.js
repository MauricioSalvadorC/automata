/////////////////////////////////////////////////////////////////////////////////////
// Crear el autómata multiplicación infinita
const automataResta = new Automata("Multiplicación Infinita");

// Crear nodos (estados)
var q0 = new Nodo("q0", false); // Estado inicial
var q1 = new Nodo("q1", false);
var q2 = new Nodo("q2", false);
var q3 = new Nodo("q3", false);
var q4 = new Nodo("q4", false);
var q5 = new Nodo("q5", true);

// Agregar arcos
q0.agregarArco("q1", "1", "#", "R");
q0.agregarArco("q5", "-", "#", "R");

q1.agregarArco("q1", "1", "1", "R");
q1.agregarArco("q1", "-", "-", "R");
q1.agregarArco("q2", "#", "#", "L");

q2.agregarArco("q3", "1", "#", "L");
q2.agregarArco("q4", "-", "1", "L");

q3.agregarArco("q3", "1", "1", "L");
q3.agregarArco("q3", "-", "-", "L");
q3.agregarArco("q0", "#", "#", "R");

q4.agregarArco("q4", "1", "1", "L");
q4.agregarArco("q5", "#", "#", "R");

// Agregar nodos al autómata
automataResta.agregarNodo(q0);
automataResta.agregarNodo(q1);
automataResta.agregarNodo(q2);
automataResta.agregarNodo(q3);
automataResta.agregarNodo(q4);
automataResta.agregarNodo(q5);

// Mostrar el autómata
console.log(automataResta.toString());
console.log(automataResta);