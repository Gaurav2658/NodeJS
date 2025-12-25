const mongoose = require('mongoose')

const schema = mongoose.schema

const userSchema = new schema({
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

const User = mongoose.model('user', userSchema);

module.exports = User