
const fs = require('fs')
const path = require('path')
const db = require('../database/models')
const {toThousand} = require('../utils/utils.js')
const { readJson, saveJson } = require('../data/index.js')

module.exports = { 
    list: async (req,res) => {

        try {
            const products = await db.Product.findAll({
                include : ['images']
            })
            return res.render('products/productsList',{
                products,
                toThousand
            })
        } catch (error) {
            console.log(error);   
        }
    },
    detail: async (req, res) => {
        try {
          const product = await db.Product.findByPk(req.params.id, {
            include: ['images','model','make'],
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

    add: async (req, res) => {

        try {
            const [makes, models, transmissions, origins, states, categories] = await Promise.all([
                db.Make.findAll(),
                db.Pattern.findAll(),
                db.Transmission.findAll(),
                db.Origin.findAll(),
                db.State.findAll(),
                db.Category.findAll()
            ]) 
            return res.render('products/productAdd',{
                models,
                makes,
                transmissions,
                origins,
                states,
                categories
            })
            
        } catch (error) {
            console.log(error);
            
        }

       
    },

    create: async (req, res) => {

        try {
            const {price, model, make, transmission, mileage, state, category, year, origin, description} = req.body;

            const product = await db.Product.create({
                makeId : make,
                patternId : model,
                categoryId : category,
                stateId : state,
                description : description.trim(),
                originId : origin,
                year,
                mileage,
                transmissionId : transmission,
                price
            })

            if(req.file) {
                await db.Image.create({
                    name : req.file.filename,
                    productId : product.id
                })
            }

            return res.redirect('/admin')


        } catch (error) {
            console.log(error);
        }
    },

    edit: async  (req, res ) => {

        try {
            const {id} = req.params
            const [product, makes, models, transmissions, origins, states, categories] = await Promise.all([
                db.Product.findByPk(id),
                db.Make.findAll(),
                db.Pattern.findAll(),
                db.Transmission.findAll(),
                db.Origin.findAll(),
                db.State.findAll(),
                db.Category.findAll()
            ]) 

            return res.render('products/productEdit',{
                makes, 
                models, 
                transmissions, 
                origins, 
                states, 
                categories,
                ...product.dataValues
            })
        } catch (error) {
            console.log(error);   
        }
       
    },
    update: async (req, res) => {

        try {
            const {price, model, make, transmission, mileage, state, category, year, origin, description} = req.body;

            await db.Product.update(
                {
                    makeId : make,
                    patternId : model,
                    categoryId : category,
                    stateId : state,
                    description : description.trim(),
                    originId : origin,
                    year,
                    mileage,
                    transmissionId : transmission,
                    price
                },
                {
                    where : {
                        id : req.params.id
                    }
                }
            )

            return res.redirect('/admin')

        } catch (error) {
            console.log(error);   
        }
    
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