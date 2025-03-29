const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { readJson, saveJson } = require('../data/index.js');

const db = require('../database/models')

module.exports = {
    register: (req, res) => {
        return res.render("users/register");
    },
    processRegister: async (req, res) => {

        try {
            const { name, surname, email, password } = req.body

            db.User.create({
                name: name.trim(),
                surname: surname.trim(),
                email: email.trim(),
                image : null,
                password: bcrypt.hashSync(password, 10),
                token: null,
                validate: true,
                lock: false,
                rolId: 2
            });

            return res.redirect('/users/login');

        } catch (error) {
            console.log(error);
        }
    },

    login: (req, res) => {
        return res.render("users/login");
    },
        processLogin: async (req, res) => {

            try {
                const { email, password } = req.body

                const user = await db.User.findOne({
                    email
                })

                if(!user || !bcrypt.compareSync(password, user.password)){

                    return res.render('users/login', {
                        error: "Credenciales inválidas"
                    })
                }

                console.log(bcrypt.compareSync(password, user.password))
                

                req.session.userLogin = {
                    id: user.id,
                    name: user.firstName,
                    rol: user.rolId
                }

                return res.redirect('/')

            } catch (error) {
                console.log(error);
                
            }
        },
            profile: (req, res) => { 
                return res.send('Falta hacer la vista de profile')
            },
                update: (req, res) => { 
                    return res.send('Falta hacer la lógica para actualizar los datos del usuario')

                },
                    logout: (req, res) => { 
                        
                        req.session.destroy()

                        return res.redirect('/')
                    },
};
