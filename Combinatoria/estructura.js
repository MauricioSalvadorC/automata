const arco = {
  apunta: "q1", // Estado siguiente
  esta: "1", // Lo que está actualmente en la cinta
  reemplazo: "0", // Símbolo que reemplaza en la cinta
  dir: "R", // Dirección del movimiento ('L', 'R', 'S')
};
// Clase para representar un nodo (estado)
class Nodo {
  constructor(nombre, esFinal = false) {
    this.nombre = nombre; // Nombre del estado (por ejemplo, "q0")
    this.arcos = []; // Vector de arcos que salen de este nodo
    this.esFinal = esFinal; // Booleano: si este nodo es un estado final
  }

  // Método para agregar un arco al nodo
  agregarArco(apunta, esta, reemplazo, dir) {
    const arco = { apunta, esta, reemplazo, dir };
    this.arcos.push(arco);
  }

  toString() {
    const arcosStr = this.arcos
      .map(
        (arco) => `[${arco.apunta},${arco.esta}/${arco.reemplazo},${arco.dir}]`
      )
      .join(", ");
    return `${this.nombre}${this.esFinal ? "(final)" : ""}: [ ${arcosStr} ]`;
  }
}

// Clase para representar un autómata
class Automata {
  constructor(nombre) {
    this.nombre = nombre; // Nombre del autómata (por ejemplo, "Factorial")
    this.nodos = {}; // Diccionario (mapa) de nodos por su nombre
  }
  // Método para agregar un nodo al autómata
  agregarNodo(nodo) {
    this.nodos[nodo.nombre] = nodo;
  }
  // Método para obtener un nodo (o null si no existe)
  obtenerNodo(nombre) {
    return this.nodos[nombre] || null;
  }
  // Obtener el primer nodo agregado (sin cambiar la estructura)
  obtenerPrimerNodo() {
    // Obtenemos las claves (nombres de nodos) del diccionario
    const claves = Object.keys(this.nodos);

    // Si existen nodos, devolvemos el primer nodo en el diccionario
    if (claves.length > 0) {
      return this.nodos[claves[0]];
    }

    // Si no hay nodos, devolvemos null
    return null;
  }
  // Representación como string para depuración
  toString() {
    return (
      `Automata: ${this.nombre}\n` +
      Object.values(this.nodos)
        .map((nodo) => nodo.toString())
        .join("\n")
    );
  }
}

///////////////////////////////////////////////////////////////////////////

function actualizarVisualizacionCinta(cinta, pos, nodoActual) {
  let cintaHTML = "<table>";
  let flechaHTML = "<tr>";
  let nodoHTML = "<tr>";

  for (let i = 0; i < cinta.length; i++) {
    

    if (i === pos) {
      cintaHTML += `<td class="nodo-actual">${cinta[i]}</td>`;
      flechaHTML += `<td class="flecha">↓</td>`;
      nodoHTML += `<td class="nodo-actual">${nodoActual.nombre}</td>`;
    } else {
      cintaHTML += `<td>${cinta[i]}</td>`;
      flechaHTML += `<td></td>`;
      nodoHTML += `<td></td>`;
    }
  }

  cintaHTML += "</table>";
  flechaHTML += "</tr>";
  nodoHTML += "</tr>";

  document.getElementById("cinta-visual").innerHTML =
    cintaHTML + "<table>" + flechaHTML + nodoHTML + "</table>";
}

async function ejecutarMaquinaDeTuring(automata, cinta, maxPasos = 100000) {
  let nodoActual = automata.obtenerPrimerNodo();
  let cintaActual = "#" + cinta + "#";
  let pos = 1;
  let pasos = 0;
  actualizarTituloMaquina(automata.nombre + ": " + cinta);
  actualizarVisualizacionCinta(cintaActual, pos, nodoActual);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  while (nodoActual) {
    if (pasos >= maxPasos) {
      setResult(`Se alcanzó el límite máximo de ${maxPasos} pasos.`);
      break;
    }
    pasos++;

    let simboloActual =
      pos >= 0 && pos < cintaActual.length ? cintaActual[pos] : "#";
    const arco = nodoActual.arcos.find((arco) => arco.esta === simboloActual);

    if (arco) {
      setResult(
        `Paso ${pasos}: (${nodoActual.nombre}, ${cintaActual}, ${pos}) -> ${arco.esta} -> (${arco.apunta}, ${arco.reemplazo}, ${arco.dir})`
      );

      // Actualización de la cinta
      if (pos >= 0 && pos < cintaActual.length) {
        cintaActual =
          cintaActual.slice(0, pos) +
          arco.reemplazo +
          cintaActual.slice(pos + 1);
        if (pos === cintaActual.length - 1 && arco.reemplazo !== "#")
          cintaActual += "#";
        if (pos === 0 && arco.reemplazo !== "#") {
          cintaActual = "#" + cintaActual;
          pos++;
        }
      } else if (pos === cintaActual.length) {
        cintaActual += arco.reemplazo;
      } else if (pos < 0) {
        cintaActual = arco.reemplazo + cintaActual;
        pos++;
      }

      // Mover la cabeza
      if (arco.dir === "R") pos++;
      else if (arco.dir === "L") pos--;

      nodoActual = automata.obtenerNodo(arco.apunta);

      // Actualización visual
      actualizarVisualizacionCinta(cintaActual, pos, nodoActual);
      await new Promise((resolve) => setTimeout(resolve, velocidadAnimacion));

      if (nodoActual?.esFinal) {
        console.log(`Nodo final alcanzado (${nodoActual.nombre}).`);
        break;
      }
    } else {
      setResult(
        `No hay transición para (${nodoActual.nombre}, ${cintaActual}, ${pos})`
      );
      break;
    }
  }

  cintaActual = cintaActual.replace(/#/g, ""); // Eliminar los símbo

  setResult(
    `Ejecución finalizada en ${pasos} pasos. cantidad de digitos: ${cintaActual.length}`
  );
  setResult(`${automata.nombre}: ${"#" + cintaActual + "#"}`);

  actualizarTituloMaquina(automata.nombre + ": " + cinta + " = " + cintaActual);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return cintaActual; // Eliminamos símbolos '#' al final
}
//esta version es sin los # al inicio y al final
async function ejecutarMaquinaDeTuring2(automata, cinta, maxPasos = 100000) {
  let pos = 0;
  let nodoActual = automata.obtenerPrimerNodo();
  let cintaActual = cinta;
  let pasos = 0;
  actualizarTituloMaquina(automata.nombre + ": " + cinta);
  actualizarVisualizacionCinta(cintaActual, pos, nodoActual);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  while (nodoActual) {
    if (pasos >= maxPasos) {
      setResult(`Se alcanzó el límite máximo de ${maxPasos} pasos.`);
      break;
    }
    pasos++;

    let simboloActual =
      pos >= 0 && pos < cintaActual.length ? cintaActual[pos] : "#";
    const arco = nodoActual.arcos.find((arco) => arco.esta === simboloActual);

    if (arco) {
      setResult(
        `Paso ${pasos}: (${nodoActual.nombre}, ${cintaActual}, ${pos}) -> ${arco.esta} -> (${arco.apunta}, ${arco.reemplazo}, ${arco.dir})`
      );

      // Actualización de la cinta
      if (pos >= 0 && pos < cintaActual.length) {
        cintaActual =
          cintaActual.slice(0, pos) +
          arco.reemplazo +
          cintaActual.slice(pos + 1);
      } else if (pos === cintaActual.length && arco.reemplazo !== "#") {
        cintaActual += arco.reemplazo;
      } else if (pos === -1 && arco.reemplazo !== "#") {
        cintaActual = arco.reemplazo + cintaActual;
        pos++;
      }

      // Mover la cabeza
      if (arco.dir === "R") pos++;
      else if (arco.dir === "L") pos--;

      nodoActual = automata.obtenerNodo(arco.apunta);

      // Actualización visual
      actualizarVisualizacionCinta(cintaActual, pos, nodoActual);
      await new Promise((resolve) => setTimeout(resolve, velocidadAnimacion));

      if (nodoActual?.esFinal) {
        console.log(`Nodo final alcanzado (${nodoActual.nombre}).`);
        break;
      }
    } else {
      setResult(
        `No hay transición para (${nodoActual.nombre}, ${cintaActual}, ${pos})`
      );
      break;
    }
  }
  cintaActual = cintaActual.replace(/#/g, ""); // Eliminar los símbo

  setResult(
    `Ejecución finalizada en ${pasos} pasos. cantidad de digitos: ${cintaActual.length}`
  );
  setResult(`${automata.nombre}: ${"#" + cintaActual + "#"}`);

  actualizarTituloMaquina(automata.nombre + ": " + cinta+" = "+cintaActual);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return cintaActual; // Eliminamos símbolos '#' al final
}
function ejecutarMaquinaDeTuringSinDelay(automata, cinta, maxPasos = 100000) {
  let pos = 0; // Posición de la cabeza en la cinta
  let nodoActual = automata.obtenerPrimerNodo(); // Empezar en el primer nodo
  let cintaActual = cinta; // Cinta original en forma de string
  let pasos = 0; // Contador de pasos

  while (nodoActual) {
    // Si se alcanza el límite de pasos, detener la ejecución
    if (pasos >= maxPasos) {
      console.log(
        `Se alcanzó el límite máximo de ${maxPasos} pasos. Ejecución detenida.`
      );
      break;
    }
    pasos++;

    // Si pos está fuera de los límites, consideramos que el símbolo es '#'
    let simboloActual =
      pos >= 0 && pos < cintaActual.length ? cintaActual[pos] : "#";

    // Buscar un arco que coincida con el símbolo en la posición actual de la cinta
    const arco = nodoActual.arcos.find((arco) => arco.esta === simboloActual);

    // Si encontramos un arco correspondiente
    if (arco) {
      console.log(
        `(${nodoActual.nombre}, ${cintaActual}, ${pos}) -> ${arco.esta} -> (${arco.apunta}, ${arco.reemplazo}, ${arco.dir})`
      );

      // Reemplazamos el símbolo en la cinta solo si la posición es válida
      if (pos >= 0 && pos < cintaActual.length) {
        let reemplazo = arco.reemplazo === "#" ? "#" : arco.reemplazo;
        // Actualizar la cinta respetando la posición
        cintaActual =
          cintaActual.slice(0, pos) + reemplazo + cintaActual.slice(pos + 1);
      } else if (pos === cintaActual.length && arco.reemplazo !== "#") {
        // Si la posición está al final, agregamos el símbolo al final de la cinta
        cintaActual = cintaActual + arco.reemplazo;
      } else if (pos === -1 && arco.reemplazo !== "#") {
        // Si la posición es -1, agregamos el símbolo al inicio de la cinta
        cintaActual = arco.reemplazo + cintaActual;
      }

      // Movemos la cabeza (si es 'R' mueve a la derecha, si es 'L' a la izquierda)
      if (arco.dir === "R") {
        pos++;
      } else if (arco.dir === "L") {
        pos--;
      }

      // Cambiamos al nodo siguiente según el arco
      nodoActual = automata.obtenerNodo(arco.apunta);

      // Si llegamos a un nodo final, detenemos la ejecución
      if (nodoActual?.esFinal) {
        console.log(`final(${nodoActual.nombre}, ${cintaActual}, ${pos})`);
        break;
      }
    } else {
      // Si no encontramos un arco correspondiente, detenemos la ejecución
      console.log(
        `No se encontró arco para (${nodoActual.nombre}, ${cintaActual}, ${pos})`
      );
      break;
    }
  }
  cintaActual = cintaActual.replace(/#/g, ""); // Eliminar los símbolos '#' de la cinta
  console.log(
    `Ejecución finalizada en ${pasos} pasos. cantidad de digitos: ${cintaActual.length}`
  );
  // Devolvemos la cinta modificada como string
  return cintaActual;
}
//ejemplos para combinatoria
// let a="1111", b="11";
// ejecutarMaquinaDeTuringSinDelay(
//   automataDivision,
//   ejecutarMaquinaDeTuringSinDelay(
//     automataMulti,
//     ejecutarMaquinaDeTuringSinDelay(automataFactorial, a)
//   ) +
//     "/" +
//     ejecutarMaquinaDeTuringSinDelay(
//       automataMulti,
//       ejecutarMaquinaDeTuringSinDelay(
//         automataMulti,
//         ejecutarMaquinaDeTuringSinDelay(automataFactorial, b)
//       ) +
//         "*" +
//         ejecutarMaquinaDeTuringSinDelay(
//           automataFactorial,
//           ejecutarMaquinaDeTuringSinDelay(automataResta, a + "-" + b)
//         )
//     )
// );

//ejejmplo para factorial de 1111
// ejecutarMaquinaDeTuringSinDelay(automataMulti, ejecutarMaquinaDeTuringSinDelay(automataFactorial, "1111"))
