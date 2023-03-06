//Path requirements as usual//
const UserController = require("../controller/userController");
const User = require("../model/userModel")
const express = require('express');
const app = express();
const router = require('express').Router();
const verifyToken = require("./auth")

//New user sign up(registration)//
router.post("/signup",UserController.register);

//User Login//
router.post("/login",UserController.login);

//Get all Users//
router.get("/getusers",UserController.getAllUsers);

//Get User//
router.get("/getuser",verifyToken, UserController.getUser);

//Update user//
router.put("/updateuser",UserController.updateUser);

//Router export//
module.exports = router;
