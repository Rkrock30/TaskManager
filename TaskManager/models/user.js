const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')

let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role:{type:String,reuired:true,enum: ['Admin', 'Manager', 'User'] },
  email:{type:String,reuired:true},
  password:{type:String,reuired:true}
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

const User=mongoose.model('User',userSchema)
module.exports={User}