const {httpErrorResponseHandler,httpSuccessResponseHandler}=require('../utils/common')
const {bodyValidtion}=require('../utils/bodyValidation')
const {User}=require('../models/user')
async function createUser(req,res) {
    try{
  const regSchema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    role:Joi.string().required(),
    password:Joi.string().required(),
    confirmPassword:Joi.any().valid(Joi.ref('password')).required()

  })
  const {valid,data,error}=await bodyValidtion(res,regSchema,req.body)
  
  if(!valid){
   return httpErrorResponseHandler(res,400,error)
  }
  const {name,email,password,role}=data

  let checkUserExist =await User.findOne({email})
  if(checkUserExist){
    return httpErrorResponseHandler(res,400,"User already Exist")
  }
  const insertUser=await User.create({name,email,password,role})
  if(insertUser && insertUser._id){
    return httpSuccessResponseHandler(res,200,'User Created succesfully')
  }else{
    return httpErrorResponseHandler(res,400,"Something Went Wrong")
  }

    }catch(err){
        console.log(err);
        
    }
}

module.exports.createUser=createUser