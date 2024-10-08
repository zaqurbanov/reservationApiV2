const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({


    name:{
        type:String,
        required:[true,"Name is required"],

    },
    email:{
        type:String,
        required:[true,"Email is required"],
        match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'],
      unique:[true,"Email is already exists"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[6, 'Password must be at least 6 characters']
    },

    role:{
        type:String,
        enum:['user','admin','manager'],
        default:'user'
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date
    }
})


userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt  = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})


module.exports = mongoose.model("User",userSchema);