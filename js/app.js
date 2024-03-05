const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");
// Definición de la lista de productos con nombre y precio
const productos = [
  {
    id: 1,
    nombre: "Remera Volcom",
    precio: 21500,
    img: "assets/img/volcom-gris-remera-1.jpg",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "Remera Billabong",
    precio: 22500,
    img: "assets/img/billabong-blanca.jpg",
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "Remera Rip Curl",
    precio: 23500,
    img: "assets/img/ripcurl-azul-remera.jpg",
    cantidad: 1,
  },
  {
    id: 4,
    nombre: "Remera Thrasher",
    precio: 24500,
    img: "assets/img/thrasher-negra.jpg",
    cantidad: 1,
  },
];

// Inicialización del carrito como un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src= "${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
    `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "Comprar";
  comprar.className = "Comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some(
      (repeatProduct) => repeatProduct.id === product.id
    );

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
    }
    console.log(carrito);
    carritoCounter();
    saveLocal();
  });
});

//Local Storage
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Get Item

JSON.parse(localStorage.getItem("carrito"));
