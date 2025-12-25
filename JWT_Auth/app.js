const express = require("express")
const morgan = require("morgan")
const error = require("http-errors");
const createHttpError = require("http-errors");
require("dotenv").config()
const authRoute = require('./routes/auth.route')
require('./helpers/db')
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded(true))


app.get('/', async(req, res, next) => {
    res.send("Hello from express");
})


app.use('/auth', authRoute);
app.use(async(req, res, next) => {
    // const error = new Error("Not Found")
    // error.status = 404
    // next(error)
    next(createHttpError.NotFound())
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.send({
        error:{
            status: error.status || 500,
            message: error.message
        }
    }
    )
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})