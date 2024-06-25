const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#productos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contendorCarrito = document.querySelector('#lista-carrito tbody');
let productosCarrito = [];

addeventListeners();
function addeventListeners() {

    listaProductos.addEventListener('click', agregarProducto);

    carrito.addEventListener('click', eliminarProducto);

    document.addEventListener('DOMContentLoaded', () => {
        productosCarrito = JSON.parse(localStorage.getItem('carrito'))
        carritoHtml();
    })

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

//Funciones

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerProducto(productoSeleccionado);
    }
}

function vaciarCarrito() {
    productosCarrito = [];
    limpiarHtml();
};

function eliminarProducto(e) {

    if (e.target.classList.contains('borrar-producto')) {
        const cursoId = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter(p => p.id !== cursoId);
        carritoHtml();
    }


}

function leerProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('.product-image').src,
        nombre: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.price').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = productosCarrito.some(p => p.id === infoProducto.id)
    if (existe) {
        const productos = productosCarrito.map(p => {
            if (p.id === infoProducto.id) {
                p.cantidad++;
                return p;
            } else {
                return p;
            }
        })

        productosCarrito = [...productos];
    } else {

        productosCarrito = [...productosCarrito, infoProducto];
    }
    carritoHtml();
}

function carritoHtml() {
    limpiarHtml();
    productosCarrito.forEach(p => {
        const { imagen, nombre, precio, id, cantidad } = p
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src='${imagen}' width='100'/></td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href='#'  ><img class='borrar-producto' src='./images/borrar.png' width='20' data-id='${id}'/> </a>  </td>
        `
        contendorCarrito.appendChild(row);
    })
    sincronizarStorage();
}


function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito))
}

function limpiarHtml() {

    while (contendorCarrito.firstChild) {
        contendorCarrito.removeChild(contendorCarrito.firstChild);
    }
}



