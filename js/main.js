// Mostramos los productos en el DOM.

let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(productos);

    })

const contenedorProductos = document.querySelector("#contenedor-productos")
let botonesAgregar = document.querySelectorAll(".agregar-producto");
const numerito = document.getElementById("numerito");

function mostrarProductos(){

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto","col-xl-4", "col-md-6", "col-xs-12");
        div.innerHTML = `
            <div class="carta">
                <img class="producto-img" src="${producto.img}" alt="${producto.nombre}">
                <div>
                    <h5 class="producto-nombre">${producto.nombre}</h5>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="agregar-producto" id="${producto.id}" > Agregar al carrito </button>
                </div>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".agregar-producto");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumero();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    
    Toastify({
        text: "Agregaste un producto",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            fontWeight: "bold",
            borderRadius: "2rem",
            border: "3px solid #85586F",
            color: "#85586F",
            background: "#F8ECD1",
            width: "20rem",
            textTransform: "uppercase",
            textAlign: "center",
            boxShadow: "0px 3px 6px 0 #000000",
        },
        onClick: function(){}
      }).showToast();

    const idBoton = e.currentTarget.id;
    const prodAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++;
    } else {
        prodAgregado.cantidad = 1;
        productosEnCarrito.push(prodAgregado);
    }
    actualizarNumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));   
}

function actualizarNumero() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumero;
    
}


