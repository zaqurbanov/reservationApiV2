class Result{
    constructor(statusCode,error,message,data,res){
            this.statusCode =statusCode
            this.error = error,
            this.message = message,
            this.data = data ,
            this.res = res
    }
  static success=(res,data=null,statusCode=200)=>{
            return res.status(statusCode).send({
                success:true,
                statusCode,
                size:Array.isArray(data)? data.length :undefined,
                data

            })
    }
    static error = (res, message =null,error=null,statusCode=500)=>{
            return res.status(statusCode).send({
                success:false,
                statusCode,
                message:message,
                error:error ||error?.message,
            
            })
    }

}

module.exports = Result;