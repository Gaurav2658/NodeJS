const JWT = require('jsonwebtoken')
const createError = require('http-errors')
// const { options } = require('@hapi/joi')
// const { error } = require('@hapi/joi/lib/base')
const { token } = require('morgan')
const { error } = require('@hapi/joi/lib/base')
module.exports = {
    singnAccessToken: (userID) =>{
        return new Promise((resolve, reject) =>{
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: "15s",
                issuer: 'webosmotic.com',
                audience: userID
            }
            JWT.sign(payload, secret, options, (error, token) =>{
                if(error) {
                    console.log(error.message)
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })

        }) 
    },

    verifyAccessToken: (req, res, next) => {
        if(!req.header("Authorization")) return next(createError.Unauthorized())
        const authHeader = req.header("Authorization")
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET , (error, payload) =>{
            if(error){
                return next(createError.Unauthorized())
            }
            req.payload = payload
            next()
        })
    }
}