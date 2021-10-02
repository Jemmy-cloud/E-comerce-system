const adminRouter = require("express").Router()
const adminController = require("../controllers/admin")
const middleWares = require("../util/middlewares")


adminRouter.get("",adminController.selectAdmins)
adminRouter.post("",adminController.addAdmin)
adminRouter.post("/login", adminController.login)
// adminRouter.put("/",adminController.updateAdmin)


module.exports = adminRouter