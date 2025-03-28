
const fs = require('fs')
const path = require('path')
const db = require('../database/models')
const {toThousand} = require('../utils/utils.js')
const { readJson, saveJson } = require('../data/index.js')

module.exports = { 
    list: (req,res) => {

        const products = readJson('products.json')
        return res.render('products/productsList',{
            products,
            toThousand
        })
    },
    detail: async (req, res) => {
        try {
          const product = await db.Product.findByPk(req.params.id, {
            include: ['images'],
          });
    
          if (!product) {
            return res.status(404).send('Producto no encontrado');
          }
    
          return res.render('products/productDetail', {
            ...product.dataValues,
            admin: req.query.admin,
            toThousand,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).send('Error interno del servidor');
        }
      },

    add: (req, res) => {
        return res.render('products/productAdd',{
            categories
        })
    },

    create: (req, res) => {

        const products = readJson('products.json')
        const {name, price, discount, description, category} = req.body

        const newProduct = {
            id : products[products.length - 1].id + 1,
            name : name.trim(),
            description : description.trim(),
            price : +price,
            image : "default-image.png",
            category
        }

        products.push(newProduct)

        saveJson('products.json',products)

        return res.redirect('/products/detail/' + newProduct.id)
    },

    edit: (req, res ) => {
        
        const {id} = req.params
        const products = readJson('products.json')
        
        const product = products.find(product => product.id === +id)

        return res.render('products/productEdit',{
            categories,
            ...product
        })
    },
    update: function(req, res) {

        const products = readJson('products.json')

        const {name, price, discount, description, category} = req.body
        
        const productsModify = products.map(product => {
            if(product.id === +req.params.id){
                product.name = name.trim();
                product.price = +price;
                product.description = description.trim();
                product.category = category;
            }
            return product
        })

        saveJson('products.json',productsModify)

        return res.redirect('/admin')
    
    },
    remove: function(req,res){
        
        const products = readJson('products.json');
        const {id} = req.params;

        const productsModify = products.filter(product => product.id !== +id)

        saveJson('products.json',productsModify)

        return res.redirect('/admin')

    },

    search: function(req, res) {
  
    },
    showCart : (req,res) => res.render('products/productCart')

}