const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
    //hansi fealiyyet novu oldugunu gosterir.
    
    action:{
        type:String,
        required:true,
        enum:['CREATE', 'UPDATE', 'DELETE', 'READ', 'VIEW', 'LOGIN', 'LOGOUT'],

    },
    // fealiyyeti eden userin idsi
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    // fealiyyetin harada bas verdiyini bildiren id meselen reservasiya
    resource:{
        type:String,
        required:true
    },
    resourceId:{
        type:mongoose.Schema.Types.ObjectId,
        
    }



},{timestamps:true})

module.exports = mongoose.model('AuditLog',auditSchema)