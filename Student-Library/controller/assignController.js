const Assign = require("../model/assignModel");
const express = require('express');

//Assign new book//
exports.assignNewBook = async(req,res)=>{
    try{
        const newBookAssign = new Assign({
            StudentId:req.body.StudentId,
            BookId:req.body.BookId,
            issueDuration:req.body.issueDuration
        })
        const assignedBook = await newBookAssign.save();
        res.status(201).json({assignedBook, Message:"Book assigned successfully"})
    } catch(err){
        res.status(500).json({err, message:"Error"})
    }
}

//Get all assign data//
exports.getAllAssign = async(req,res) =>{
    try{
        const getallData = await Assign.find()
        .populate({path:'StudentId', select:'name'})
        .populate('BookId');
        res.status(201).json(getallData);
    } catch(err){
        res.status(500).json(err);
    }
}

//Get assign data from Student ID//
exports.getAssignDataByStudentID = async(req,res)=>{
    try{
        const getAssignDataByStudentID = await Assign.aggregate([
            {
                $lookup:{
                    from:"students",
                    localField:"StudentId",
                    foreignField:"_id",
                    as:"data"
                }
                
            },
            {
                $unwind:"$data"
            },
            {
                $project:{
                    "_id":1,
                    "StudentId":1,
                    "BookId":1,
                    "StudentName":"$data.name",
                    "Email":"$data.email",
                    "RollNo":"$data.rollNo",
                    "Address":"$data.address"
                }
            }
        ])
        if(getAssignDataByStudentID){
            res.status(201).json(getAssignDataByStudentID)
        } else{
            res.status(400).json("Failed to fetch Assign Data by StudentID")
        }
    } catch(err){
        res.status(500).json(err)
    }
}

//Get assign data from Student ID//
exports.getAssignDataByBookID = async(req,res)=>{
    try{
        const getAssignDataByBookID = await Assign.aggregate([
            {
                $lookup:{
                    from:"books",
                    localField:"BookId",
                    foreignField:"_id",
                    as:"data"
                }
                
            },
            {
                $unwind:"$data"
            },
            {
                $project:{
                    "_id":1,
                    "StudentId":1,
                    "BookId":1,
                    "BookName":"$data.Title",
                    "Author":"$data.Author",
                    "Genre":"$data.Genre",
                   
                }
            }
        ])
        if(getAssignDataByBookID){
            res.status(201).json(getAssignDataByBookID)
        } else{
            res.status(400).json("Failed to fetch Assign Data by BookID")
        }
    } catch(err){
        res.status(500).json(err)
    }
}

//Update assign data//
exports.updateAssign = async(req,res)=>{
    try{
        const updatedAssign = await Assign.findByIdAndUpdate({
            _id:req.query.id
        },
        {
            $set:{
                issueDuration:req.body.issueDuration
            }
        },
        {
            new:true
        })
        res.status(201).json({updatedAssign, Message:"Successfuuly Updated"})
    } catch(err){
        res.status(500).json(err)
    }
}