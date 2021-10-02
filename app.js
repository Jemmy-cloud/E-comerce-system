const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const bodyPareser = require("body-parser")
const conn = require("./db/connection")


const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const adminRouter = require("./routes/admin")

app.use(morgan("dev"))
app.use(cors())
app.use(bodyPareser.urlencoded({
    extended: false
}))
app.use(bodyPareser.json())

const knex = conn.openConnection()

app.locals.knex = knex


// open database conn

// routes

app.use("/user",userRouter)
app.use("/product",productRouter)
app.use("/admin",adminRouter)

app.use((req, res, next) => {

    const error = new Error("Page not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        res.status(404).json({
            status: "error",
            msg: "Page not Found"
        })
    }else {
        console.log(error);
        res.status(500).json({
            status:"error",
            msg:"500 internal server error"
        })
    }
})


module.exports = app