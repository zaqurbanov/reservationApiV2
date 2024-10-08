const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    createdAt: {

        type:Date,
        default:Date.now,
        expires:500000
    }
    ,
    expireAt:{
        type:Date,
        expires:1100000
    }

})
//!! Expire duzeltilmelidir.islemir.  silinmir.  
module.exports = mongoose.model("RefreshToken", refreshTokenSchema)