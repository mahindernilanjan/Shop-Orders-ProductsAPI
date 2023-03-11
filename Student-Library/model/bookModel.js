const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

//Making Books collection//
const bookSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Author:{
        type:String,
        required:true
    },
    Genre:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Edition:{
        type:String,
        required:true
    },
    booktype:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
}, {timestamps:true});

module.exports = mongoose.model("Book",bookSchema);
//In .env, after mongodb.net write new database name, it will automatically create
//new database and collection as well//