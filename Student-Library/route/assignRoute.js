const express = require('express');
const router = require('express').Router();
const assignController = require("../controller/assignController");

//Assign new book//
router.post("/assignNewBook", assignController.assignNewBook);

//Get all assign records//
router.get("/getAllData", assignController.getAllAssign);

//Get assign data by Student ID//
router.get("/getAssignDataByStudent", assignController.getAssignDataByStudentID)

//Get assign data by Book ID//
router.get("/getAssignDataByBook", assignController.getAssignDataByBookID)

//Update assign data//
router.put("/updateAssign", assignController.updateAssign)

module.exports = router;