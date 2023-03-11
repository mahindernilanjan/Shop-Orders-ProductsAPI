const mongoose = require('mongoose');

//Create model//
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        Min:3,
        trim:true
    },
    rollNo:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

},{timestamps:true})

module.exports = mongoose.model('Student', studentSchema);