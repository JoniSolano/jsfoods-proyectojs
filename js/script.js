alert("BIENVENIDO A JSFOODS! \n\nA continuacion ingrese su nombre de usuario y contraseña");

const usuarioAutorizado = "coderuser";
const passwordAutorizado = "coderpass";

let usuarioIngresado = prompt("Por favor ingrese su nombre de usuario");
let passwordIngresado = prompt("Ingrese su contraseña");

for(let i = 0; i <= 2 ; i++) {
    if(usuarioIngresado === usuarioAutorizado && passwordIngresado === passwordAutorizado) {
        alert("Los datos ingresados son correctos, puede continuar");
        break;
    }else if (i < 2) {
        alert("No se reconocen los datos ingresados.\nPor favor reviselos e intentelo nuevamente.");
        usuarioIngresado = prompt("Por favor ingrese su nombre de usuario");
        passwordIngresado = prompt("Ingrese su contraseña");
        if(usuarioIngresado === usuarioAutorizado && passwordIngresado === passwordAutorizado) {
            alert("Los datos ingresados son correctos, puede continuar");
            break;
        }
    }else if (i === 2) {
        alert ("Supero el limite de intentos para ingresar.\nPor lo tanto el usuario ha sido bloqueado.");
    }
}

class Producto {
  constructor (nombre, precio, id){
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
  }
}

const muzza = new Producto ("Pizza Muzzarella", 1200, 1);
const napo = new Producto ("Pizza Napolitana", 1500, 2);
const fugazzeta = new Producto ("Pizza Fugazzeta", 1500, 3);
const burguerBacon = new Producto ("Burger Bacon", 1400, 4);
const onionCrazy = new Producto ("Burguer Onion Crazy", 1600, 5);
const classicLibra = new Producto ("Burguer Classic Libra", 1600, 6);
const blonde = new Producto ("Cerveza Blonde", 550, 7);
const honey = new Producto ("Cerveza Honey", 550, 8);
const ipa = new Producto ("Cerveza Ipa", 550, 9);

const arrayProductos = [muzza, napo, fugazzeta, burguerBacon, onionCrazy, classicLibra, blonde, honey, ipa];

const arrayCarrito = [];

function menu (){
  let menuCarta = parseInt (prompt ("Escoja una opcion para añadir al carrito el producto que desee: \n\n1)Pizza Muzzarella. \n2)Pizza Napolitana. \n3)Pizza Fugazzeta. \n4)Burguer Bacon. \n5)Burger Onion Crazy. \n6)Burger Classic Libra. \n7)Cerveza Blonde. \n 8)Cerveza Honey. \n9)Cerveza Ipa."));
  let eleccionProducto = arrayProductos.find (producto => producto.id === menuCarta);
  console.log(eleccionProducto);
  if (eleccionProducto === undefined) {
    alert ("Por favor ingrese una opcion valida");
    menu();
  }
  arrayCarrito.push(eleccionProducto.precio);
  productoAgregado();
}


function productoAgregado() {
  let productoAgregado;
  do {
    productoAgregado = parseInt(prompt("Deseas añadir mas productos al carrito? \n\n 1)Si. \n 2)No."));
  } while (productoAgregado !=1 && productoAgregado !=2);
  switch (productoAgregado) {
    case 1:
      menu();
    case 2:
      finalizarCompra();
      break
    default:
      alert ("Por favor elija una opcion correcta");
      break;
  }
}


function finalizarCompra () {
  let precioTotal = arrayCarrito.reduce((acumulador, producto) => acumulador + producto, 0);
  alert ("El total de su compra es de $" + precioTotal);
  alert ("Muchas gracias por elegir a JSFoods!");
}

menu();
productoAgregado();
finalizarCompra();