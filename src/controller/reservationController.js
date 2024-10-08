const { validationResult } = require("express-validator");
const Result = require("../enums/resultGenerate");
const reservationModel = require("../model/reservationModel");
const transporter = require("../nodeemailer/mailer");
const createAuditLog = require("../utils/createAuditLog");


const addReservation =async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error("Validation error")
        error.statusCode = 401;
        error.errors = errors.array();
        return next(error)
    }
    const {name,time,date} = req.body;
    const data = {
        name,
        time,
        date,
        userId:req.user._id
    }
    try {
        const newReservation  = new reservationModel(data);
        await newReservation.save();
        
        // transporter yaratdiqdan sonra nodemailerin email optionsunu yaradiriq.
        const mailOptions = {
            from:"Restoran rezervasiyasi <noreply@restaurant.com>",
            to:req.user.email,
            subject:"rezervasiya tesdiqi",
            text:`Salam sizin rezervasiyaniz tesdiq edildi. Tarix ${date} , Vaxt ${time}`
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error)
                true
            else
                false                
        })
            await createAuditLog({
                action:"CREATE",
                userId:req.user,_id,
                resource:"Reservation",
                resourceId:data._id
            })
        return Result.success(res,data)


        
    } catch (error) {
        next(error)
    }

}

const getAllReservation = async(req,res,next)=>{
    try {
        
         const data = await reservationModel.find().populate('userId');
         if(data.length==0){
            const error = new Error("Data not found");
            error.statusCode = 404;
            return next(error)
            }
            await createAuditLog({
                action:"VIEW",
                userId:req.user,_id,
                resource:"Reservation",
                resourceId:""
            })
         return   Result.success(res,data)  

            
    } catch (error) {
        next(error)
    }
}

const getReservationById = async(req,res,next)=>{
    const {id} = req.params;
    try {
        const data = await reservationModel.findById(id);
        if(!data){
            const error = new Error();
            error.statusCode = 401
            return next(error)
        }
        
        if(req.user.role=='admin'){
            
            await createAuditLog({
                action:"VIEW",
                userId:req.user,_id,
                resource:"Reservation",
                resourceId:data._id
            })
            return Result.success(res,data)

        }else if(data.userId == req.user._id){
            await createAuditLog({
                action:"VIEW",
                userId:req.user,_id,
                resource:"Reservation",
                resourceId:data._id
            })
            return Result.success(res,data)
        }else{
            const error = new Error("Access denied");
            error.statusCode = 401
            return next(error);
        }
        


    } catch (error) {
next(error)
    }
}

const updateReservationById = async(req,res,next)=>{
    const {id} = req.params
    const {name,date,time}=req.body
    try {
        const reservation = await reservationModel.findOne({_id:id,userId:req.user._id});
        if(!reservation){
            const error = new Error("Access denied");
            error.statusCode = 401
            return next(error);

        }
        const updateData = {
            name:name ? name : reservation.name,
            date:date ? date:reservation.date,
            time:time? time:reservation.time
        }
        
        const updateReservation = await reservationModel.findByIdAndUpdate(id,updateData,{
            new:true,
            runValidators:true  
        }) 
        if(!updateReservation){
            const error = new Error("Data not found");
            error.statusCode = 401
            return next(error)
            
        }
        await createAuditLog({
            action:"UPDATE",
            userId:req.user,_id,
            resource:"Reservation",
            resourceId:updateReservation._id
        })
        return Result.success(res,updateReservation);
         
    } catch (error) {
       next(error)
    }
}

const deleteReservationById = async(req,res,next)=>{
    const {id} = req.params
    try {
        const data = await reservationModel.findById(id);
        if(!data){
            const error = new Error("Data not found");
            error.statusCode = 401
            return next(error)
        }
        
        if(req.user.role=='admin'){
            await reservationModel.findByIdAndDelete(id);
            await createAuditLog({
                action:"DELETE",
                userId:req.user,_id,
                resource:"Reservation",
                resourceId:data._id
            })
            return Result.success(res,{message:"deleted successfully"})
        }else if(data.userId == req.user._id){
            await reservationModel.findByIdAndDelete(id);
            await createAuditLog({
                action:"DELETE",
                userId:req.user,_id,
                resource:"Reservation",
                resourceId:data._id
            })
            return Result.success(res,{message:"deleted successfully"})
        }else{
            
            const error = new Error("Access denied");
            error.statusCode = 401
            return next(error);
        }
        

    } catch (error) {
       next(error)
    }
}
module.exports = {
    getAllReservation,
    getReservationById,
    updateReservationById,
    deleteReservationById,
    addReservation
}