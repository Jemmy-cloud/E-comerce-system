const userRouter = require("express").Router()
const userController = require("../controllers/user")
const middleWares = require("../util/middlewares")

userRouter.get("",userController.selectUsers)
userRouter.post("",userController.addUser)
userRouter.post("/login", userController.login)
userRouter.put("", userController.updateUser)
userRouter.delete("", userController.deleteUser)
userRouter.patch("", userController.restoreUser)


module.exports = userRouter