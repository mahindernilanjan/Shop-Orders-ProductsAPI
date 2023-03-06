const mongoose = require('mongoose');

//Making User Schema//
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        Min:3,
        Max:15
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
    date:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true
});
module.exports = mongoose.model("User",UserSchema);