# Gestor de Productos en JavaScript

Sistema dinámico para registrar, listar, buscar y eliminar productos, usando validaciones y promesas.

## Descripción
Este proyecto permite manejar productos con **ID, nombre y precio**, asegurando que los datos sean válidos y ofreciendo métodos asíncronos para simular operaciones reales de un sistema de gestión.

---

## Características
- Registro de productos con validación de **ID, nombre y precio**
- Manejo de errores con `try/catch`
- Funciones asíncronas usando **Promise** y `setTimeout`
- Métodos disponibles:  
  - `agregar` → Añade un producto  
  - `obtenerTodos` → Devuelve todos los productos  
  - `eliminar` → Elimina un producto por ID  
  - `buscarPorId` → Busca un producto por ID

---

## Objetivo
Practicar la construcción de sistemas dinámicos en JavaScript, manejo de promesas, asincronía y estructuras de datos flexibles.

---

## Conceptos aplicados
- Validación de datos (`string`, `number`)
- Encapsulación con closures
- Promesas y asincronía
- Manejo de errores
- Arrays y métodos de búsqueda (`find`, `some`, `splice`)

---

## Ejemplo de uso
```javascript
const gestor = gestorProductos();

// Agregar producto
gestor.agregar({ id: "1001", nombre: "Gibson Les Paul", precio: 1300 })
  .then(res => console.log("Producto agregado:", res))
  .catch(err => console.error("Error:", err.message));

// Listar todos los productos
setTimeout(() => {
  console.log("Todos los productos:", gestor.obtenerTodos());
}, 1000);

// Eliminar producto
setTimeout(() => {
  gestor.eliminar("1001")
    .then(res => console.log("Producto eliminado:", res))
    .catch(err => console.error("Error al eliminar:", err.message));
}, 1500);
