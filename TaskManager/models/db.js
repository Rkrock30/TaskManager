const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/Task-Managerx").then(()=>{
    console.log("Mongo db Successfully Connected");
    
}).catch((err)=>{
    console.log("getting error while Connecting to mongo",err);
    
})