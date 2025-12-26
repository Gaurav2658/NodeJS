const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const userSchema = new Schema({
    email:{
        type: String,
        require: true,
        lowercase: true,
        unique:   true
    },
    password:{
        type: String,
        require: true
    }
})

userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        console.log(hashedPassword)
        this.password = hashedPassword
    } catch (error) {
        throw error
    }
})

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User