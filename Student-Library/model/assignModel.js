const mongoose=require('mongoose');

//Create new schema for book assign//
const assignSchema = new mongoose.Schema({
    StudentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required:true
    },
    BookId: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
        required:true
    },
    issueDuration:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

module.exports = mongoose.model('Assign', assignSchema);