let canvas = new Canvas()
canvas.size(400, 500)

class Pila {
    constructor(ini = []) {
        this.items = ini;
    }

    // Agregar un elemento a la pila
    push(elemento) {
        if (Array.isArray(elemento)) {
            this.items.push(...elemento);
        } else {
            this.items.push(elemento);
        }
    }

    // Eliminar y devolver el elemento superior de la pila
    pop() {
        if (this.isEmpty()) {
            return "La pila está vacía";
        }
        return this.items.pop();
    }

    // Devolver el elemento superior de la pila sin eliminarlo
    peek() {
        if (this.isEmpty()) {
            return "La pila está vacía";
        }
        return this.items[this.items.length - 1];
    }

    // Verificar si la pila está vacía
    isEmpty() {
        return this.items.length === 0;
    }

    // Devolver el tamaño de la pila
    size() {
        return this.items.length;
    }

    // Vaciar la pila
    clear() {
        this.items = [];
    }
    paint(x) {
        canvas.rect(x, 30, 100, 410, "red", false, 5)
        for (let i = 410 / 30, e = 0; i > 0; i--, e++) {
            canvas.line(x, 30 * i + 30, x + 100, 30 * i + 30, "red")
            canvas.text(this.items[e] || "", x + 40, 30 * i + 25)
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function validate(exp) {
    const p1 = new Pila(["#"]);
    const p2 = new Pila(["#"]);
    let puntero = 0
    canvas.clear()
    p1.paint(100)
    p2.paint(250)
    await sleep(1e3)
    if (exp[puntero] == "0") {
        if (p1.peek() == "#" && p2.peek() == "#") {
            p1.push([p1.pop(), "A"])
            p2.push([p2.pop(), "A", "A"])
        } else {
            return false
        }
        puntero++
        canvas.clear()
        p1.paint(100)
        p2.paint(250)
        await sleep(1e3)
        while (exp[puntero] == "0") {
            if (p1.peek() == "A" && p2.peek() == "A") {
                p1.push([p1.pop(), "A"])
                p2.push([p2.pop(), "A", "A"])
            } else {
                return false
            }
            puntero++
            canvas.clear()
            p1.paint(100)
            p2.paint(250)
            await sleep(1e3)
        }
        if (exp[puntero] == "1") {
            if (p1.peek() == "A" && p2.peek() == "A") {
                p1.push(p1.pop())
                p2.pop()
            } else {
                return false
            }

            puntero++
            canvas.clear()
            p1.paint(100)
            p2.paint(250)
            await sleep(1e3)

            while (exp[puntero] == "1") {
                if (p1.peek() == "A" && p2.peek() == "A") {
                    p1.push(p1.pop())
                    p2.pop()
                } else {
                    return false
                }
                puntero++
                canvas.clear()
                p1.paint(100)
                p2.paint(250)
                await sleep(1e3)
            }

            if (exp[puntero] == "0") {
                if (p1.peek() == "A" && p2.peek() == "#") {
                    p1.pop()
                    p2.push(p2.pop())
                } else {
                    return false
                }
                puntero++
                canvas.clear()
                p1.paint(100)
                p2.paint(250)
                await sleep(1e3)
                while (exp[puntero] == "0") {
                    if (p1.peek() == "A" && p2.peek() == "#") {
                        p1.pop()
                        p2.push(p2.pop())
                    } else {
                        return false
                    }
                    puntero++
                    canvas.clear()
                    p1.paint(100)
                    p2.paint(250)
                    await sleep(1e3)
                }
            } else {
                return false
            }
        } else {
            return false
        }

    } else {
        return false
    }

    if (exp.length == puntero) {
        console.log(p1, p2)
        if (p2.peek() == "#" && p1.peek() == "#") {
            p2.push(p2.pop())
            p1.push(p1.pop())
        } else {
            return false
        }
    }
    return true

}
async function validarExp() {
    let result = await validate(document.querySelector("#exp").value)
    alert(result ? "La expresión es valida" : "La expresión no es valida")
}