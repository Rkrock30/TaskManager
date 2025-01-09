const {httpErrorResponseHandler,httpSuccessResponseHandler,createToken}=require('../utils/common')
const {bodyValidtion}=require('../utils/bodyValidation')
const {User}=require('../models/user')
async function login(req,res) {
    try{
  const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),

  })
  const {valid,data,error}=await bodyValidtion(res,loginSchema,req.body)
  
  if(!valid){
   return httpErrorResponseHandler(res,400,error)
  }
  let { email}= data
  let checkUserExist =await User.findOne({email})
  const {role,_id}=checkUserExist

  if(!checkUserExist){
    return httpErrorResponseHandler(res,400,"User doesnot Exist")
  }else{
    let createTokenz=await createToken({email,role,userId:_id})
    return httpSuccessResponseHandler(res,200,'Successfully login',createTokenz)
  }


    }catch(err){
        console.log(err);
        
    }
}
module.exports.login=login