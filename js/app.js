const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito"); 
const modalContainer = document.getElementById("modal-container"); 
const cantidadCarrito = document.getElementById("cantidadCarrito"); // Me gusta, te recomendaria que elijas una convencion de nomnbres, separado con - o en camelCase en este caso tenes 3 con "-" asique cambiaria modal-container por modalContainer 

// Inicialización del carrito como un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // lo declararia como constante ya que no hay una reasignacion, reasignar no es lo mismo que ejecutar un metodo de un objeto, hacer carrito.push() no cambia la referencia del array

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
    comprar.className = "Comprar"; // la clase comprar no existe no hace falta

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
JSON.parse(localStorage.getItem("carrito")); // no estas haciendo nada con esto, ya lo haces en la linea 7, aca simplemente estas buscando el carrito en el localstorage pero no lo estas guardando en ninguna variable, por lo tanto es inutil
