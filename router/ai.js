const express=require('express')
const router=express.Router()
const {body, validationResult} = require('express-validator')
const {OpenaiAPI} = require('../controller/ai')




router.post('/openai-api',[],(req,res,next)=>{
    next()
},OpenaiAPI)



module.exports=router