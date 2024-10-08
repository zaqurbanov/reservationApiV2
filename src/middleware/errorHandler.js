const Result = require("../enums/resultGenerate");
const logger = require('../logger');

const errorHandler = (err,req,res,next)=>{

    logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    
    const statusCode = err.statusCode || 500;
    const message = err.message ||"Internal Server Error";
    const error = err.errors || err.message
    return Result.error(res,message,error,statusCode)
} 

module.exports = errorHandler
