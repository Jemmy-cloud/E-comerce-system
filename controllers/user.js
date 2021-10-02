const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require('jsonwebtoken');
const joi = require("joi")

exports.selectUsers = (request, response) => {
    const knex = request.app.locals.knex
    knex("users")
        .select("id", "code", "name", "phone", "email")
        .then(users => {
            response.status(200).json(users)
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.addUser = (request, response) => {
    const knex = request.app.locals.knex
    
    const code = request.body.code
    const name = request.body.name
    const password = request.body.password
    const phone = request.body.phone
    const email = request.body.email
    const address = request.body.address

    if (!code || !name || !password || !phone || !email || !address) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }



    
        const user = new User('1' ,code, phone, name, email, password, address, 'has')
        
        // const userSchema = joi.object({
        //     id:joi.string().not().empty().min(1).max(50),
        //     code:joi.string().not().empty().min(2).max(5).required(),
        //     name: joi.string().not().min(3).max(50).required(),
        //     password: joi.string().min(6).max(20).required(),
        //     phone:joi.string().required().pattern(/[0-9]{11}/),
        //     email:joi.string().email().min(6).max(60).required(),
        //     address: joi.string().not().min(3).max(50).pattern(/[a-z A-Z]{3,50}/).required(),
        //     hash: joi.string().min(1).max(100).required(),
        // })

    //     const joiError = userSchema.validate(user)

    // if (joiError.error) {
    //     console.log(joiError.error.details);
    //     return response.status(400).json({
    //         status: "error",
    //         msg: "400 Bad Request"
    //     }) 
    // }

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            console.log(err);
        }
       user.hashedPassword = hash

        knex("users")
            .insert({
                
                code: user.code,
                name: user.name,
                password: user.hashedPassword,
                phone: user.phone,
                email: user.email,
                address: user.address
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



    });


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

    knex("users")
        .select('email', 'password')
        .limit(1)
        .where('email', '=', email)
        .then(user => {
            console.log(user);
            if (user[0] != null) {
                bcrypt.compare(password, user[0].password, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    if (result) {
                        
                        const token = jwt.sign({
                            userEmail: user[0].email,
                            usertype: 'User'
                        } , "123456", {})

                        response.status(200).json({
                            token: token,
                            status: "ok",
                            msg: "login"
                        })
                    } else {
                        response.status(401).json({
                            status: "error",
                            msg: "invalid password"
                        })
                    }
                })

            } else {
                response.status(401).json({
                    status: "error",
                    msg: "401 not Auth"
                })
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.updateUser = (request, response) => {
    const knex = request.app.locals.knex

}
exports.deleteUser = (request, response) => {
    const knex = request.app.locals.knex

}
exports.restoreUser = (request, response) => {
    const knex = request.app.locals.knex

}