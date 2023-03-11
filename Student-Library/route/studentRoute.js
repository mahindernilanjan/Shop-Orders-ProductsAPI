const studentController = require('../controller/studentController');
const express = require('express');
const verifyToken = require('./auth');
const router = require('express').Router();

//New Student register/sign up//
router.post("/signup", studentController.registerstudent);

//Student log in//
router.get("/login", studentController.loginStudent);

//Student data get by id with authorization//
router.get("/getStudent", verifyToken, studentController.getStudent);

//Student data update//
router.put("/updateStudent", studentController.updateStudent);

module.exports = router;