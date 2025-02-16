require('dotenv').config()

require('./config/database')
const express = require('express')
const userRouter = require('./routes/userRouter')
const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.use(userRouter)

app.listen(PORT , ()=>{
    console.log(`my server is running on port ${PORT}`)
})
