const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')
const cors = require('cors')
const SERVER_PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

mongoose.connect('mongodb+srv://cyber-sport:.c75JLjK_LuvsBL@cluster0.ojav5.mongodb.net/cyber-db', { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(SERVER_PORT, () => console.log(`server has been started on ${SERVER_PORT}`))