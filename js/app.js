const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

// Inicialización del carrito como un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  console.log(data);
  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
          <img src= "${product.img}">
          <h3>${product.nombre}</h3>
          <p class="price">$ ${product.precio.toLocaleString("es-ES")}</p>
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

      // Mostrar alerta de éxito si se agregó el producto al carrito
      mostrarAlertaExito();
    });
  });
};

getProducts();

// Función para mostrar una alerta de éxito
const mostrarAlertaExito = () => {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: "El producto ha sido añadido al carrito",
    timer: 1300,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

// Función para mostrar una alerta de error
const mostrarAlertaError = () => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "No se pudo añadir el producto al carrito",
  });
};

//Local Storage
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Get Item
JSON.parse(localStorage.getItem("carrito"));
