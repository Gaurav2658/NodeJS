const express = require("express")
const router = express.Router()
const createError = require('http-errors')
const User = require("../models/user.model")
const {authSchema} = require('../helpers/validationSchema')
const { singnAccessToken } = require('../helpers/jwtHelper')


router.post('/register', async(req, res, next) => {
    console.log(req.body)
    try {
        // const {email, password} = req.body
        // if(!email || !password){
        //     throw createError.BadRequest()
        // }
        const result = await authSchema.validateAsync(req.body) 
        // console.log(result)
        const doesExists = await User.findOne({email: result.email})
        if(doesExists) throw createError.Conflict(`${result.email} The User already Exists`)
        const user = new User(result)
        const savedUser = await user.save()
        console.log(savedUser)
        const accessToken = await singnAccessToken(savedUser.id)
        console.log(accessToken)
        res.send({accessToken})
    } catch (error) {
        if(error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login', async(req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({email: result.email})
        if(!user) throw createError.NotFound('User not register')
        const isMatch = await user.isValidPassword(result.password)
        if(!isMatch) throw(createError.Unauthorized("UserName/Password not valid"))
        const accessToken = await singnAccessToken(user.id)
        res.send({accessToken})
    } catch (error) {
        if(error.isJoi === true) return next(createError.BadRequest(`invalid username or password`))
        next(error)
    }
})

router.post('/refresh-token', async(req, res, next) => {
    res.send("refresh-token route");
})

router.delete('/logout', async(req, res, next) => {
    res.send("logout route");
})

module.exports = router