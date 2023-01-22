let productos = [];

fetch("../js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(productos);
    })

// let carrito = [];

// if(localStorage.getItem("carrito")){
//     carrito = JSON.parse(localStorage.getItem("carrito"));
// }

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-4", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="carta">
                <img src="${producto.img}" alt="${producto.nombre}">
                <div>
                    <h5>${producto.nombre}</h5>
                    <p>$${producto.precio}</p>
                    <button id="boton${producto.id}" > Agregar al carrito </button>
                </div>
            </div>
                        `
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-12");
        card.innerHTML = `
                <div class="cartaCarrito">
                    <div class="detalles">
                        <img src="${producto.img}" alt="${producto.nombre}">
                        <div>
                            <p>${producto.nombre}</p>
                            <p>$${producto.precio} </p>
                            <p>x${producto.cantidad} </p>
                        </div>
                    </div>
                    <div>
                        <button id="eliminar${producto.id}" > Eliminar Producto </button>
                    </div>
                </div>
                        `
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })

    })
    calcularTotal();
}


const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodo();
})

const eliminarTodo = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra= 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })

    total.innerHTML = `$${totalCompra}`;
}