const product = require("../models/product")
const bcrypt = require("bcrypt")
exports.selectProducts = (request, response)=>{
    const knex = request.app.local.knex

    knex("products")
    .select("code" , "name", "description", "price" , "quantity")
    .then(products=>{
        response.status(200).json(products)
    })
    .catch(error=>{
        console.log(error);
        response.status(500).json({
            status:"error",
            msg:"500 internal server error"
        })
    })
}

exports.addProduct = (request,response) => {
    const knex = request.app.locals.knex

    const code = request.body.code
    const name = request.body.name
    const description = request.body.description
    const price = request.body.price
    const quantity = request.body.quantity

    if(!code || !name || !description || !price || !quantity){
        return response.status(400).json({
            status:"error",
            msg:"400 Bad Request"
        })
    }

    const product = new Product(code,name,description,price,quantity)

    bcrypt.hash(password, 10, (error, hash)=> {
        if(error){
            console.log(error);

            return response.status(500).json({
                status:"error",
                msg:"500 internal server error"
            })
        }

        knex("products")
        .insert({
            code: product.code,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity

        })
        .then(data =>{
            return response.status(201).json({
                status:"ok",
                msg:"Created"
            })
        })
        .catch(error=>{
            return response.status(400).json({
                status:"error",
                msg:"400 Bad request"
            })
        })
    })

}