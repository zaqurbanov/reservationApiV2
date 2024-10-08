const Result = require("../enums/resultGenerate");


const adminMiddleware = async(req,res,next)=>{


    try {
        if(req.user.role=='admin'){
            next();
        }else{
            return Result.error(res,"access denied",null)
        }
        
    } catch (error) {
        return Result.error(res,null,error)
    }
}

module.exports = adminMiddleware