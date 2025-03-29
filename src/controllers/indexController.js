const { readJson } = require('../data/index.js')
const db = require('../database/models')
const { toThousand, paginator } = require('../utils/utils.js')

module.exports = {
    index : async (req,res) => {
      
        try {

            const products = await db.Product.findAll({
                include : ['images','make','model']
            });

            return res.render('index', { 
                products,
                toThousand
            })
        } catch (error) {
            console.log(error);
        }
       
    },
    
    aboutUs: (req, res) => {
        return res.render('aboutUs')
    },
    admin: async (req, res) => {

        try {
            const { page, perPage, category, search } = req.query

            const products = await db.Product.findAll({
                include : ['images','make','model']
            });
            return res.render('admin', {
                products,
                currentPage: page || 1,
              /*   totalPages: total,
                categories, */
                filterCategory: category,
                search,
                toThousand
            })
            
            
        } catch (error) {
            console.log(error);
            
        }
    },
    adminProducts: (req, res) => {
        

        const { page, perPage, category, search } = req.query

        if (search) {
            products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase().trim()))
        }

        const { items, total } = paginator(products, page, perPage)

        return res.render('products/productsAdmin', {
            products: items,
            currentPage: page || 1,
            totalPages: total,
            categories,
            filterCategory: category,
            search,
            toThousand
        })
    },
    adminUsers: (req, res) => {
        const users = readJson('users.json')

        const { page, perPage } = req.query

        const { items, total } = paginator(users, page, perPage)

        return res.render('users/usersAdmin', {
            users: items,
            currentPage: page || 1,
            totalPages: total,
        })
    }
}