const mongoose = require('mongoose');
const { MONGO_PATH } = require('../env/env');
const connect = async()=>{
    try {
        console.log("Connection");
        await mongoose.connect(MONGO_PATH)
        console.log("Connected");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    connect
}