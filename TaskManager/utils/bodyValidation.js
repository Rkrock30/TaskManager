

async function  bodyValidtion(res,valSchema,payload){
    try{
      const data=await valSchema.validateAsync(payload,{abortEarly:false})
      return {valid:true,data}
    }catch(err){
       return {valid:false ,error:err.message}
    }
}

module.exports.bodyValidtion=bodyValidtion