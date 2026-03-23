"use strict";

// ==========================
// VALIDADORES
// ==========================
const validarString = (valor, campo) => {
    if (typeof valor !== "string" || !valor.trim())
        throw new Error(`${campo} inválido.`);
};

const validarNumber = (valor, campo) => {
    if (!Number.isFinite(valor) || valor <= 0)
        throw new Error(`${campo} inválido.`);
};

// ==========================
// CONSTRUCTOR PRODUCTO
// ==========================
const Producto = function({
    id,
    nombre,
    precio,
    categoria = "",
    stock = 0
} = {}) {

    validarString(id, "ID");
    validarString(nombre, "Nombre");
    validarNumber(precio, "Precio");

    if (categoria) validarString(categoria, "Categoría");

    if (!Number.isFinite(stock) || stock < 0)
        throw new Error("Stock inválido");

    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.stock = stock;
};

// ==========================
// CONSTRUCTOR GESTOR
// ==========================
const GestorProductos = function() {
    this.productos = [];
};

// ==========================
// MÉTODOS PROTOTYPE
// ==========================

// ➕ Agregar producto
GestorProductos.prototype.agregar = function(data = {}) {

    const producto = new Producto(data);

    if (this.productos.some(p => p.id === producto.id))
        throw new Error(`El producto con ID ${producto.id} ya existe.`);

    this.productos.push(producto);
};

// 📦 Obtener todos (copia defensiva)
GestorProductos.prototype.obtenerTodos = function() {
    return this.productos.map(p => ({ ...p }));
};

// 🔍 Filtrar por precio
GestorProductos.prototype.filtrarPorPrecio = function({ min } = {}) {

    validarNumber(min, "Precio mínimo");

    return this.productos
        .filter(p => p.precio >= min)
        .map(p => ({ ...p }));
};

// 🧾 Obtener nombres
GestorProductos.prototype.mapNombres = function() {
    return this.productos.map(p => p.nombre);
};

// 🧮 Total precios
GestorProductos.prototype.totalPrecio = function() {
    return this.productos.reduce((acc, p) => acc + p.precio, 0);
};

// ❌ Eliminar producto
GestorProductos.prototype.eliminar = function({ id } = {}) {

    validarString(id, "ID");

    this.productos = this.productos.filter(p => p.id !== id);
};

// ✏️ Actualizar precio
GestorProductos.prototype.actualizarPrecio = function({ id, precio } = {}) {

    validarString(id, "ID");
    validarNumber(precio, "Nuevo precio");

    const producto = this.productos.find(p => p.id === id);

    if (!producto) throw new Error("Producto no encontrado");

    producto.precio = precio;
};

// ==========================
// USO
// ==========================
const gestor = new GestorProductos();

try {

    gestor.agregar({
        id: "01",
        nombre: "Gibson Les Paul 1960",
        precio: 1800,
        categoria: "instrumentos",
        stock: 5
    });

    gestor.agregar({
        id: "02",
        nombre: "Fender Stratocaster",
        precio: 1200,
        categoria: "instrumentos",
        stock: 10
    });

    console.log("Todos:", gestor.obtenerTodos());

    console.log("Filtrados:", gestor.filtrarPorPrecio({ min: 1500 }));

    console.log("Nombres:", gestor.mapNombres());

    console.log("Total:", gestor.totalPrecio());

    gestor.actualizarPrecio({ id: "02", precio: 1300 });

    gestor.eliminar({ id: "01" });

    console.log("Final:", gestor.obtenerTodos());

} catch (error) {
    console.error(error.message);
}