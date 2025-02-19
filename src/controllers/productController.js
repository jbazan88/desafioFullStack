
const fs = require('fs')
const path = require('path')

const {toThousand} = require('../models/utils.js')
const { readJson, saveJson } = require('../data/index.js')

module.exports = { 
    list: (req,res) => {

        const products = readJson('products.json')
        return res.render('products/productsList',{
            products,
            toThousand
        })
    },
    detail: (req, res) => {
        
        const products = readJson('products.json')
        const product = products.find(product => product.id === +req.params.id)
        
        return res.render('products/productDetail',{
            ...product,
            admin : req.query.admin,
            toThousand
        })
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