const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const {mongoUrl} = require('./keys')


require('./models/user');//order is important first import the model then import the routers.
const requireToken = require('./middleware/requireToken') 
const authRoutes = require('./routes/authRoutes')
app.use(bodyParser.json())
app.use(authRoutes)

 

mongoose.connect(mongoUrl,{
    // for hiding the warning message.
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo successfully")
})

mongoose.connection.on('error',(err)=>{
    console.log("error occurs",err)
})

app.get('/',requireToken,(req,res)=>{
    res.send("your email is "+req.user.email)
})

app.listen(PORT,()=>{
    console.log("Server Runnning"+PORT)
})