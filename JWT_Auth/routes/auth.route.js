const express = require("express")
const router = express.Router()
const createError = require('http-errors')
const user = require


router.post('/register', async(req, res, next) => {
    console.log(req.body)
    try {
        const {email, passoword} = req.body
        if(!email || !passoword){
            throw createError.BadRequest()
        }
        

    } catch (error) {
        next(error)
    }
})

router.post('/login', async(req, res, next) => {
    res.send("login route");
})

router.post('/refresh-token', async(req, res, next) => {
    res.send("refresh-token route");
})

router.delete('/logout', async(req, res, next) => {
    res.send("logout route");
})

module.exports = router