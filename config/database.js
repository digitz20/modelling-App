require('dotenv').config()

const mongoose = require('mongoose')

const DB = process.env.MONGODB_URI


mongoose.connect(DB)

.then(() => {
    console.log('connection to database is successful')
})

.catch((error) => {
    console.log('error connecting to database' , + error.message)
})

