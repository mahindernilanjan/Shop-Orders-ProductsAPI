const express = require('express');
const app =express();
const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require("../route/auth");


//Register new user (Signup)//
exports.register = async(req,res) =>{
    try{
        //We have to encrypt the password. So we use bcrypt. Using bcrypt
        //we hash the password//
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10) //For hashing//
        console.log(hashedPassword);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        const registeredUser = await newUser.save();
        if (registeredUser) {
            res.status(200).send(registeredUser)
        } else {
            res.status(400).send("err")
        }
    } catch (err) {
        res.status(500).send(err);
        console.log("28",err)
    }
}

//Login of existing user//
exports.login = async(req,res,next) =>{
    try{
        //First we check whether the user exists or not//
        const loggedInuser = await User.findOne({
            email:req.body.email
        })
        console.log(loggedInuser);
        //Now we proceed further using if-else statements//
        if(!loggedInuser){ //If email does not exist i.e user not found//
            res.status(401).json("User does not exists!")
        } else if(await bcrypt.compare(req.body.password, loggedInuser.password)){
            //We create token now//
            const accessToken = jwt.sign({
                UserId:loggedInuser._id,
                email:loggedInuser.email
            }, process.env.SEC_KEY,
            {
                expiresIn:"1h"
            })
            res.status(201).json({
                loggedInuser,
                accessToken,
                status:"success"
            })
        } else{
            res.status(400).json({"message":"invalid login credentials"})
        }
    }catch(err){
        res.status(500).json(err)
    }
} 
//After this, go to postman, in body write normal email and password and post it.//


//Get All Users//
exports.getAllUsers = async (req, res) => {
    try {
        const getUsers = await User.find();
        if (getUsers) {
            res.status(201).json(getUsers)
        } else {
            res.status(404).json("Not found")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
//Get User by Id with Token verification//
exports.getUser = async(req,res,next) =>{
    try{
        const getUser = await User.findById({
            _id:req.query.id
        })
        if(getUser){
            next();
            res.status(201).json(getUser);
        }
        
    } catch(err){
        res.status(404).json({err, "message" : "Not found"})
    }
}
//Update User//
exports.updateUser = async(req,res) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate({
            _id:req.query.id
        },
        {
            $set:{
                username:req.body.username,
                email:req.body.email
            }
        },
        {
            new:true
        })
        res.status(201).json({updatedUser, status:"Successfully updated"})
    } catch(err){
        res.status(400).json({err, status:"Failed"})
    }
}
