const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { jwtkey } = require('../keys')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;// authorization must be in lowercase
   // authorization === Bearer (Bearer as per in documnetation)
    if(!authorization){
        return res.status(401).send({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,jwtkey,async (err,payload)=>{ // the verified token is accessed by payload 
        if(err){// if wrong token
            return res.status(401).send({error:"you must be logged in"})
        }
        //payload is basically a data
    const {userId} = payload; // userId is retrived from the authRoutes and return to payload only after verification
    const user = await User.findById(userId)
    req.user=user;
    next();
    })
}