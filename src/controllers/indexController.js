const { readJson } = require('../data/index.js')
const {toThousand, paginator} = require('../models/utils')

module.exports = {
    index : (req,res) => {
        console.log({
            userLogin : req.session.userLogin
        });
        
        const products = readJson('products.json')

            res.render('index')
    },
    aboutUs : (req,res) => {
        return res.render('aboutUs')
    },
    admin : (req,res) => {
        return res.render('admin')
    },
    adminProducts : (req,res) => {
        let products = readJson('products.json')

        const {page, perPage, category, search} = req.query

        if(search) {
            products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase().trim()))
        }

        const {items, total} = paginator(products, page, perPage)

        return res.render('products/productsAdmin',{
            products: items,
            currentPage : page || 1,
            totalPages : total,
            categories,
            filterCategory : category,
            search,
            toThousand
        })
    },
    adminUsers : (req,res) => {
        const users = readJson('users.json')

        const {page, perPage} = req.query

        const {items, total} = paginator(users, page, perPage)

        return res.render('users/usersAdmin',{
            users: items,
            currentPage : page || 1,
            totalPages : total,
        })
    }
}