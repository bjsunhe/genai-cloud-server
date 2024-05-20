const express=require('express')
const router=express.Router()
const {body, validationResult} = require('express-validator')
const {OpenaiAPI,RexrothAPI} = require('../controller/ai')




router.post('/openai-api',[],(req,res,next)=>{
    next()
},OpenaiAPI)
router.post('/rexroth-api',[],(req,res,next)=>{
    next()
},RexrothAPI)



module.exports=router