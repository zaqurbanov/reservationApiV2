const Result = require("../enums/resultGenerate")
const userModel = require("../model/userModel")


const getAllUser = async (req, res, next) => {

    try {
        const data = await userModel.find()
        return Result.success(res, data)
    } catch (error) {
        next(error)
    }

}
const getUserById = async(req,res,next)=>{
    const {id} = req.params || req.body
    try {
        const user = await userModel.findById(id);
        if(!user){
            const error = new Error("User Not found")
            error.statusCode = 404;
            return next(error);
        }       
        else if(req.user.role =="admin"){
            return Result.success(res,user);
        }else if(req.user._id.toString() == user._id.toString()){
                return Result.success(res,user);
        }else{
            const error = new Error("Access denied")
            error.statusCode = 403;
            return next(error);
        }


    } catch (error) {
        next(error)
    }
}
const updateUserById = async(req,res,next)=>{
    const {id} = req.params || req.body
    const {name,email} = req.body
    try {
        
        const user = await userModel.findById(id)
        if(!user){
            const error  = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }else if(user._id.toString() ==req.user._id.toString()){
                const isExistingUser = await userModel.findOne({name,email})
                if(isExistingUser){
                    const error = new Error("username or password already existing")
                    return next(error)

                }
                user.name = name ? name : user.name;
                user.email = email ? email : user.email
                await user.save()
                return Result.success(res,user)
        }
        const error = new Error("Access denied user");
        error.statusCode = 403;
        return next(error)

    } catch (error) {
        next(error)
    }
}
const updateUserRole = async(req,res,next)=>{
    const {id} = req.params || req.body
    const {role} = req.body

    try {
        const user = await userModel.findById(id)
        if(!user){
            const error  = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        
        }else if(["admin","user","manager"].includes(role.trim().toLowerCase())){
            user.role = role
            await user.save();
            return Result.success(res,user);

        }

        const error = new Error("incorrect role value please input correct value")
        error.statusCode = 401
        return next(error)


    } catch (error) {
            next(error)
    }
}
const deleteuserById =async (req,res,next)=>{
    const {id} = req.params || res.body
    

    try {
    const user =await userModel.findById(id)
    if(!user){
        const error  = new Error("user not found");
        error.statusCode = 404;
        return next(error)
    }
    await userModel.findByIdAndDelete(id)
    return Result.success(res,"delete successfully")


    } catch (error) {
        next(error)
    }
}

module.exports =
{
    getAllUser,
    getUserById,
    updateUserById,
    updateUserRole,
    deleteuserById




}