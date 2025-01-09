const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')
const {createTask}=require('../controller/createTask')
const { updateTask } = require('../controller/updateTask')
const { deleteTask } = require('../controller/deleteTask')
const { getTask } = require('../controller/getTask')
const { createUser } = require('../controller/createUser')
const { login } = require('../controller/login')

router.post('/createUser',(req,res)=>{
   createUser (req,res)
})
router.post('/login',(req,res)=>{
    login(req,res)
})

router.get('/tasks',auth(['Admin', 'Manager', 'User']),(req,res)=>{
    getTask(req,res)
})
router.post('/tasks',auth(['Admin', 'Manager']),(req,res)=>{
    createTask(req,res)
})
router.put('/tasks/:taskId',auth(['Admin', 'Manager']),(req,res)=>{
    updateTask(req,res)
})
router.delete('/tasks/:taskId',auth(['Admin']),(req,res)=>{
    deleteTask(req,res)
})






module.exports=router