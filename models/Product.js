class Product {
    constructor(id, imagen, año, marca, modelo, kilometraje, transmision, precio) {
        this.id = id;
        this.imagen = imagen || '/images/default.png';
        this.año = año;
        this.marca = marca;
        this.modelo = modelo;
        this.kilometraje = kilometraje;
        this.transmision = transmision;
        this.precio = precio;
    }
}

module.exports = Product;