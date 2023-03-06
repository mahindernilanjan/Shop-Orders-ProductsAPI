const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required:true
    },
    orderCost:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", productSchema);