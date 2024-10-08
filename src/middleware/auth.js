const Result = require("../enums/resultGenerate");
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require("../env/env");
const userModel = require("../model/userModel");

const auth =async (req,res,next)=>{


    const token  = req.header('Authorization')?.replace("Bearer ","");
    
    if(!token){
        return Result.error(res,"Token Not found","Token Not Found",401);
    }
    try {
        const decoded = jwt.verify(token,JWT_KEY);
        const user = await userModel.findById(decoded.id);

        if(!user)
            return Result.error(res,"User not found","User Not found",401);
        req.user = user
        next();
    } catch (error) {
      return  Result.error(res,null,error)
    }
}
module.exports = auth