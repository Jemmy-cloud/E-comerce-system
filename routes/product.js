const productRouter = require("express").Router()
const productController = require("../controllers/product")
const middleWares = require("../util/middlewares")


productRouter.get("",productController.selectProducts)
//productRouter.post("",)
//productRouter.put("",)
//productRouter.delete("",)

module.exports = productRouter