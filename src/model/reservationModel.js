const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name is required"],
        minLength:[3,"Name must be at least 3 characters"],
        maxLength:[100,"Name must be less than 100 characters"]

    },
    time:{
        type:String,
        required:[true,"Time is required"],
        match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format'] 
    },
    date:{
        type:String,
        required:[true,"Data is required"],
        match:[/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format']
    },
    userId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

})


module.exports = mongoose.model('Reservation',reservationSchema)