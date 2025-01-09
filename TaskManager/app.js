require('dotenv').config()
require('../TaskManager/models/db')
const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const router=require('../TaskManager/router/router')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use('/api',router)
global.Joi = require("joi");
global.httpSuccessResponseHandler=require('../TaskManager/utils/common').httpSuccessResponseHandler
global.httpErrorResponseHandler=require('../TaskManager/utils/common').httpErrorResponseHandler

app.listen(3000,()=>{
    console.log(`port is running on http://localhost:3000`);
    
})