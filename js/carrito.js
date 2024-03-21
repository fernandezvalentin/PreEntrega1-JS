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

    restar.addEventListener("click", () => {
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
  totalBuying.innerHTML = `Total a pagar: $${total.toLocaleString("es-ES")}`;
  modalContainer.append(totalBuying);

  // Botón "Finalizar compra"
  const finalizarCompraButton = document.createElement("button");
  finalizarCompraButton.innerText = "Finalizar compra";
  finalizarCompraButton.className = "finalizar-compra-button";
  finalizarCompraButton.addEventListener("click", () => {
    mostrarNotificacion("Compra finalizada", "info");
  });
  modalContainer.append(finalizarCompraButton);

  // Verificar si el carrito está vacío y ocultar el contenedor del carrito
  if (carrito.length === 0) {
    modalContainer.style.display = "none";
  }
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.findIndex((element) => element.id === id);

  if (foundId !== -1) {
    carrito.splice(foundId, 1);
    carritoCounter();
    saveLocal();
    pintarCarrito();

    // Verificar si el carrito está vacío y ocultar el contenedor del carrito
    if (carrito.length === 0) {
      modalContainer.style.display = "none";
      mostrarNotificacion("Carrito vacío", "info");
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
