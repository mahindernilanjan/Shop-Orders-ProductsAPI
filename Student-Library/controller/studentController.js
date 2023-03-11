const express = require('express');
const mongoose = require('mongoose');
const Student = require("../model/studentModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Register new student//
exports.registerstudent = async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        const newStuent = await new Student({
            name:req.body.name,
            rollNo:req.body.rollNo,
            email:req.body.email,
            password:hashedPassword,
            phone:req.body.phone,
            branch:req.body.branch,
            address:req.body.address
        })
        const registeredStudent = await newStuent.save();
        if(registeredStudent){
            res.status(201).json({registeredStudent, message:"Successful"})
        } else{
            res.status(400).json({message:"Error"})
        }
    } catch(err){
        res.status(500).json(err);
        //console.log(err);
    }
}

//Login student//
exports.loginStudent = async(req,res) =>{
    try{
        const loggedInstudent = await Student.findOne({
            email:req.body.email
        })
        console.log(loggedInstudent); 
        if(!loggedInstudent)
        {
            res.status(400).json("Student not found");
        }
        else if(await bcrypt.compare(req.body.password,loggedInstudent.password))
        {
            //Token create//
            const createToken = jwt.sign({
                StudentId:req.body._id,
                email:req.body.email,
                rollNo:req.body.rollNo
            }, process.env.SEC_KEY,
            {
                expiresIn:"50m"
            })
            res.status(201).json({
                loggedInstudent,
                createToken,
                status:"success"
            })
        } else{
            res.status(400).json({"message":"Invalid login credentials"})
        }
         
    }catch(err){
        res.status(500).json(err);
    }
}

//Get student by id with authorization//
exports.getStudent = async(req,res,next) =>{
    try{
        const getStudent = await Student.findById({
            _id:req.query.id
        })
        if(getStudent){
            next();
            res.status(201).json({message:"Authorization successful", getStudent});
        }
        
    } catch(err){
        res.status(404).json({err, "message" : "Not found"})
    }
}

//Update Student data//
exports.updateStudent = async(req,res) =>{
    try{
        const updatedStudent = await Student.findByIdAndUpdate({
            _id:req.query.id
        },
        {
            $set:{
                name:req.body.name,  
                email:req.body.email,
                phone:req.body.phone
            }
        },
        {
            new:true
        })
        res.status(201).json({updatedStudent, status:"Successfully updated"})
    } catch(err){
        res.status(400).json({err, status:"Failed"})
    }
}
