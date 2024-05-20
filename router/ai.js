const express=require('express')
const router=express.Router()
const {body, validationResult} = require('express-validator')
const {OpenaiAPI,RexrothAPI,FestoAPI} = require('../controller/ai')




router.post('/openai-api',[],(req,res,next)=>{
    next()
},OpenaiAPI)
router.post('/rexroth-api',[],(req,res,next)=>{
    next()
},RexrothAPI)
router.post('/festo-api',[],(req,res,next)=>{
    next()
},FestoAPI)



module.exports=router