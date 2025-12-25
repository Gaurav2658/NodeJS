const { default: mongoose } = require('mongoose')
const moongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {dbName: process.env.DB_NAME}).then(()=> {
    console.log("MongoDB is connected")
}).catch((err) => console.log(err.message))


moongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to Db')
})

moongoose.connection.on('error', (err) => {
    console.log(err.message)
})

moongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected to Db')
})

process.on('SIGINT', async() => {
    await mongoose.connection.close()
    process.exit(0)
})