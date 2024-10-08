const Result = require("../enums/resultGenerate")

const authRole=(...roles)=>{

    return(req,res,next)=>{
            if(!roles.includes(req.user.role)){
                return Result.error(res,"access denied role",null,403)
            }
            next()
    }

}

module.exports = authRole