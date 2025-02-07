
const Product = require('../../models/Product');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/products.json');

const getProducts = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data).map(productData => new Product(
            productData.id, productData.imagen, productData.año, productData.marca, productData.modelo, productData.kilometraje, productData.transmision, productData.precio
        ));
    } catch (error) {
        console.error("Error al leer productos:", error);
        return [];
    }
};

const saveProducts = (products) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
        return true;
    } catch (error) {
        console.error("Error al guardar productos:", error);
        return false;
    }
};

const productControllers = {
    admin: (req, res) => {
        const products = getProducts();
        res.render('products/admin', { products });
    },
    add: (req, res) => {
        res.render('products/productAdd');
    },
    create: (req, res) => {
        const products = getProducts();
        const newProduct = new Product(
            products.length + 1,
            req.body.imagen,
            req.body.año,
            req.body.marca,
            req.body.modelo,
            req.body.kilometraje,
            req.body.transmision,
            parseInt(req.body.precio) // Convertir a número
        );
        products.push(newProduct);
        saveProducts(products);
        res.redirect('/admin');
    },
    remove: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        const filterProducts = products.filter(p => p.id !== parseInt(req.params.id));
        fs.writeFileSync(dataPath, JSON.stringify(filterProducts, null, 2));
        res.redirect('/admin');
    },
    editForm: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('products/productEdit', { product });
    },
    edit: (req, res) => {
        const products = getProducts();
        const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
        if (productIndex === -1) {
            return res.status(404).send('Producto no encontrado');
        }

        // Actualiza los campos del producto
        products[productIndex].año = req.body.año;
        products[productIndex].marca = req.body.name;
        products[productIndex].modelo = req.body.description;
        products[productIndex].kilometraje = req.body.kilometraje;
        products[productIndex].transmision = req.body.transmision;
        products[productIndex].precio = req.body.precio;

        saveProducts(products);
        res.redirect('/admin');
    },

    update: (req, res) => {
        const products = getProducts();
        const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
        if (productIndex === -1) {
            return res.status(404).send('Producto no encontrado');
        }

        products[productIndex] = new Product(
            parseInt(req.params.id),
            req.body.año,
            req.body.marca,
            req.body.modelo,
            req.body.imagen,
            req.body.kilometraje,
            req.body.transmision,
            parseInt(req.body.precio)
        );
        saveProducts(products);
        res.redirect('/admin');
    },
    delete: (req, res) => {
        let products = getProducts();
        products = products.filter(product => product.id !== parseInt(req.params.id));
        saveProducts(products);
        res.redirect('/admin');
    }
};

module.exports = productControllers;