const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

//Create new Schema//
const ProductSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    producttype:{
        type:String,
        required:true
    },
    serialno:{
            type:Number,
            required:true,
            unique:true
    },
    make:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    unitprice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"In Stock"
    },
    date:{
        type:Date,
        default:Date.now
    },
}, {
    timestamps:true
});

module.exports = mongoose.model("Product",ProductSchema);