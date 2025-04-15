const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const db = require('../database/models')

module.exports = {
    register: (req, res) => {
        return res.render("users/register");
    },
    processRegister: async (req, res) => {
        const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.render('users/register', {
        errors: errors.mapped(), 
        oldData: req.body 
    });
}

        try {
            const { name, surname, email, password } = req.body;

            await db.User.create({
                name: name.trim(),
                surname: surname.trim(),
                email: email.trim(),
                image: null,
                password: bcrypt.hashSync(password, 10),
                token: uuidv4(),
                validate: true,
                lock: false,
                rolId: 2
            });

            return res.redirect('/users/login');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
        }
    },

    login: (req, res) => {
        return res.render("users/login");
    },
        processLogin: async (req, res) => {

            try {
                const { email, password } = req.body

                const user = await db.User.findOne({
                    where: { email }
                })

                if(!user || !bcrypt.compareSync(password, user.password)){

                    return res.render('users/login', {
                        error: "Credenciales inválidas"
                    })
                }

                console.log(bcrypt.compareSync(password, user.password))
                

                req.session.userLogin = {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    rol: user.rolId
                };

                return res.redirect('/')

            } catch (error) {
                console.log(error);
                
            }
        },
        profile: (req, res) => { 
            return res.render('users/profile', {
                user: req.session.userLogin // Pasa los datos del usuario a la vista
            })
        },
                update: (req, res) => { 
                    return res.send('Falta hacer la lógica para actualizar los datos del usuario')

                },
                    logout: (req, res) => { 
                        
                        req.session.destroy()

                        return res.redirect('/')
                    },
};
