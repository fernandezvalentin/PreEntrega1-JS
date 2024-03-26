// Función para mostrar una notificación con Toastify
const mostrarNotificacion = (mensaje, tipo) => {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: tipo === "error" ? "#ff3333" : "#32CD32",
  }).showToast();
};

const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>`;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerHTML = "❌";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p>${product.precio}$</p>
    <span class="restar"> - </span>
    <p>Cantidad: ${product.cantidad}</p>
    <span class="sumar"> + </span>
    <p>Total: ${product.cantidad * product.precio}</p>
    <span class="delete-product"> ❌ </span>
    `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => { // vas a ver como esto de agregar listeners, por ejemplo este que se queda escuchando un click, en react es una boludez pero es importante que aprendas como hacerlo con javascript nativo
      if (product.cantidad !== 1) {
        product.cantidad--;
        saveLocal();
        pintarCarrito();
      }
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
      // Mostrar notificación al eliminar un producto del carrito
      mostrarNotificacion("Producto eliminado del carrito", "success");
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: $ ${total} `;
  modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito); // esto te anda de pedo porque en el index.html agregaste el script de este archivo despues que el de app.js, si lo intercambias de lugar te vas a dar cuenta que no funciona, porque? porque la variable verCarrito, la create en app.js. move la linea 2 de app.js y ponela aca, fijate que verCarrito no lo usas en app.js

const eliminarProducto = (id) => {
  const foundId = carrito.findIndex((element) => element.id === id);

  if (foundId !== -1) {
    carrito.splice(foundId, 1);
    carritoCounter();
    saveLocal();
    pintarCarrito();

    // Mostrar notificación al cerrar el carrito por completo
    if (carrito.length === 0) {
      mostrarNotificacion("Carrito vacio", "info");
    }
  }
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();
