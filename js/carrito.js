let productosEnCarrito = localStorage.getItem ("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.getElementById("carrito-vacio");
const contenedorCarritoProductos = document.getElementById("productos-carrito");
const contenedorAccionesCarrito = document.getElementById("acciones");
const contenedorCarritoComprado = document.getElementById("carrito-comprado");
let botonEliminar = document.querySelectorAll(".eliminar-producto")
const botonVaciar = document.getElementById("vaciar-carrito");
const contenedorTotal = document.getElementById("total");
const botonComprar = document.getElementById("boton-comprar");

function mostrarCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorAccionesCarrito.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("productos-carrito");
            card.innerHTML = `
                <div class="cartaCarrito">
                    <div class="detalles">
                        <img src="${producto.img}" alt="${producto.nombre}">
                        <div>
                            <p>${producto.nombre}</p>
                            <p>$${producto.precio} || x${producto.cantidad} </p>
                            <p>Subtotal: $${producto.precio * producto.cantidad} </p>
                        </div>
                    </div>
                    <div>
                        <button class="eliminar-producto" id="${producto.id}" > Eliminar Producto </button>
                    </div>
                </div>
            `;
             contenedorCarritoProductos.append(card);
        });
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorAccionesCarrito.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    calcularTotal();
}

mostrarCarrito();

function actualizarBotonesEliminar() {
    botonEliminar = document.querySelectorAll(".eliminar-producto");
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProducto);
    })
}

function eliminarProducto(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    mostrarCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito () {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    mostrarCarrito();
}

function calcularTotal (){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito () {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorAccionesCarrito.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    
}