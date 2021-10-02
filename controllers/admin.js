const bcrypt = require("bcrypt")
const Admin = require("../models/admin")
const jwt = require('jsonwebtoken');
const joi = require("joi")

exports.selectAdmins = (request, response) => {
    const knex = request.app.locals.knex
    knex("admins")
        .select("id", "code", "name", "phone", "email")
        .then(admins => {
            response.status(200).json(admins)
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.addAdmin = (request, response) => {
    const knex = request.app.locals.knex
    
    const code = request.body.code
    const name = request.body.name
    const password = request.body.password
    const phone = request.body.phone
    const email = request.body.email
    const token = request.body.token
    

    if (!code || !name ||!password || !phone || !email || !token ) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }
    const admin = new Admin(code,name,password,phone,email, "123")

    const adminSchema = joi.object({
        
        code: joi.string().not().empty().min(3).max(20).pattern(/[0-9]{3,20}/).required(),
        name: joi.string().not().empty().min(3).max(20).pattern(/[a-z A-Z]{3,20}/).required(),
        password: joi.string().not().empty().min(8).max(100).required(),
        phone: joi.string().not().empty().min(3).max(20).pattern(/[0-9]{11}/).required(),
        email: joi.string().not().empty().required(),
        hashedPassword: joi.string().not().empty().min(1).max(5).required(),
    })

    const joiErrors = adminSchema.validate(admin)
    if (joiErrors.error) {

        console.log(joiErrors.error.details);
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
            console.log(error);

            return response.status(500).json({
                status: "error",
                msg: "500 internal server error"
            })
        }

        admin.hashedPassword = hash
                knex("admins")
                    .insert({
                        code: admin.code,
                        name: admin.name,
                        password: admin.hashedPassword,
                        phone: admin.phone,
                        email: admin.email
                        
                    })
                    .then(data => {
                        response.status(201).json({
                            status: "ok",
                            msg: "Created"
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        response.status(500).json({
                            status: "error",
                            msg: "500 Internal Server Error"
                        })
                })
        
        
        
    })
}

    

exports.login = (request, response) => {

    const knex = request.app.locals.knex

    const email = request.body.email
    const password = request.body.password
    if (!email || !password) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    

    knex("admins")
        .select('email', 'password')
        .limit(1)
        .where('email', '=', email)
        .then(admin => {
            console.log(admin);
            if (admin[0] == null) {
                return response.status(401).json({
                    status: "error",
                    msg: "invalid email"
                })
            } else {
                bcrypt.compare(password, admin[0].password, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    if (result) {
                        const token = jwt.sign({
                            adminEmail: admin[0].email,
                            admintype: "Admins"
                        }, '12345', {})

                        return response.status(200).json({
                            status: "ok",
                            msg: "Login",
                            token
                        })
                    } else {
                        return response.status(401).json({
                            status: "error",
                            msg: "invalid password"
                        })
                    }
                })

            }

        })
        .catch(error => {
            console.log(error);
            return response.status(400).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })

}