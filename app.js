const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const alienRouter = require('./routes/aliens')


//const url = 'mongodb+srv://kireetir2005:qwertyuiop@kireeticluster.u1rse.mongodb.net/'
const url = 'mongodb://127.0.0.1:27020,127.0.0.1:27021,127.0.0.1:27022/cbitit1?replicaSet=m101';
const app = express()
mongoose.connect(url)
const con = mongoose.connection

app.use(cors())
con.on('open', () =>
{
console.log('connected...')
})
app.use(cors())
app.use(express.json())

app.use('/aliens',alienRouter)
app.listen(9000, () =>
{
console.log('Server started')
})
