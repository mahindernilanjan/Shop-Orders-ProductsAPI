const express = require('express');
const Book = require("../model/bookModel");
const app = express();
app.use(express());

//Create a new book//
exports.addNewBook = async(req,res)=>{
    try{
        const addBook = new Book(req.body);
        const savedBook = await addBook.save();
        res.status(201).json({savedBook, message:"New Book added"});
    } catch(err){
        res.status(500).json(err);
    }
   

}

//Get all books data//
exports.getAllBooks = async(req,res) =>{
    try{
        const getBooks = await Book.find();
        res.status(201).json(getBooks);
    } catch(err){
        res.status(500).json(err);
    }
}

//Get book by id//
exports.getBook = async (req,res)=>{
    try{
        const getBook = await Book.findById({
            _id : req.query.id
        })
        res.status(201).json(getBook);

    } catch(err){
        res.status(500).json(err);
    }
}

//Update book by id//
exports.updateBook = async (req,res) =>{
    try{
        const updatebook = await Book.findByIdAndUpdate({
            _id : req.query.id
        },
        {
        $set : {
            Author:req.body.Author,
            Price:req.body.Price,
            booktype:req.body.booktype
        }
        },
        {
            new :true
        })

        res.status(201).json(updatebook);
    } catch(err){
        res.status(500).json(err)
    }
}