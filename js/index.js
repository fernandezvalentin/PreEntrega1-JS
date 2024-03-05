/* // Definición de la lista de productos con nombre y precio
const productos = [
  { id: 1, nombre: "remera volcom", precio: 21500 },
  { id: 2, nombre: "remera billabong", precio: 22500 },
  { id: 3, nombre: "remera rip curl", precio: 23500 },
  { id: 4, nombre: "remera thrasher", precio: 24500 },
];

// Inicialización del carrito como un array vacío
let carrito = [];

// Preguntar al usuario si está interesado en algún producto
let seleccion = prompt("Hola, ¿está interesado en algún producto?");

// Validación de la respuesta del usuario
while (seleccion !== "si" && seleccion !== "no") {
  alert("Por favor, ingrese si o no.");
  seleccion = prompt("Hola, ¿realmente está interesado en algún producto?");
}

// Mostrar lista de productos si el usuario está interesado
if (seleccion === "si") {
  alert("A continuación, nuestra lista de productos:");
  // Crear una lista formateada de productos
  let todosLosProductos = productos.map(
    (producto) => producto.nombre + " " + producto.precio + "$"
  );
  alert(todosLosProductos.join(" - "));

  // Filtrar productos por precio máximo
  let precioMaximo = parseInt(
    prompt("¿Cuál es el precio máximo que está dispuesto a pagar?")
  );
  let productosFiltrados = productos.filter(
    (producto) => producto.precio <= precioMaximo
  );

  // Mostrar los productos filtrados
  if (productosFiltrados.length > 0) {
    alert("Productos encontrados dentro del rango de precio:");
    let productosFiltradosNombres = productosFiltrados.map(
      (producto) => producto.nombre
    );
    alert(productosFiltradosNombres.join(", "));
  } else {
    alert(
      "No se encontraron productos dentro del rango de precio especificado."
    );
  }
} else if (seleccion === "no") {
  // Mensaje de despedida si el usuario no está interesado
  alert("Gracias por venir, hasta pronto.");
}

// Bucle para agregar productos al carrito
while (seleccion !== "no") {
  // Solicitar al usuario agregar un producto al carrito
  let producto = prompt("Agrega un producto a tu carrito");
  let precio = 0;

  // Validar si el producto está en la lista
  if (
    producto == "remera volcom" ||
    producto == "remera billabong" ||
    producto == "remera rip curl" ||
    producto == "remera thrasher"
  ) {
    // Asignar el precio según el producto seleccionado
    switch (producto) {
      case "remera volcom":
        precio = 21500;
        break;
      case "remera billabong":
        precio = 22500;
        break;
      case "remera rip curl":
        precio = 23500;
        break;
      case "remera thrasher":
        precio = 24500;
        break;
      default:
        break;
    }
    // Solicitar la cantidad de unidades
    let unidades = parseInt(prompt("¿Cuántas unidades desea llevar?"));

    // Agregar el producto al carrito
    carrito.push({ producto, unidades, precio });
    console.log(carrito);

    // Preguntar al usuario si desea cargar otro producto
    seleccion = prompt("¿Desea cargar otra prenda?");

    // Salir del bucle cuando la respuesta es "no"
    if (seleccion === "no") {
      // Mostrar detalles del carrito y calcular el total
      carrito.forEach((carritoFinal) => {
        console.log(
          `Producto: ${carritoFinal.producto}, Unidades: ${
            carritoFinal.unidades
          }, Total a pagar por producto: ${
            carritoFinal.unidades * carritoFinal.precio
          }`
        );
      });

      // Calcular el total general de la compra
      const total = carrito.reduce(
        (acc, el) => acc + el.precio * el.unidades,
        0
      );
      console.log(`El total a pagar por su compra es: ${total} `);

      // Preguntar al usuario por el método de pago
      let metodoPago = prompt(
        "Por favor, seleccione un método de pago (tarjeta, mercado pago, efectivo):"
      );

      // Validar el método de pago seleccionado
      while (
        metodoPago !== "tarjeta" &&
        metodoPago !== "mercado pago" &&
        metodoPago !== "efectivo"
      ) {
        alert("Por favor, seleccione un método de pago válido.");
        metodoPago = prompt(
          "Por favor, seleccione un método de pago (tarjeta, mercado pago, efectivo):"
        );
      }

      // Mostrar mensaje de confirmación con el método de pago seleccionado
      alert(`Ha seleccionado pagar con ${metodoPago}. Gracias por su compra.`);
      console.log(`Método de pago seleccionado: ${metodoPago}`);

      break;
    }
  } else {
    // Mensaje si el producto no está en la lista
    alert("No tenemos el producto indicado.");
  }
}
 */
