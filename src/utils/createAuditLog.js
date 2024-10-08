const auditLogModel = require("../model/auditLogModel");


const createAuditLog = async({action,userId,resource,resourceId})=>{

try {
    const newAuditLog =new auditLogModel  ({
        action,
        userId,
        resource,
        resourceId
    })
    await newAuditLog.save();
    

} catch (error) {
    console.log(error);
}

} 

module.exports = createAuditLog