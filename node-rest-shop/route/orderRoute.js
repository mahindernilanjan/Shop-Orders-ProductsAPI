const express = require('express');
const app = express();
const router = require('express').Router();
const orderController = require("../controller/orderController");

//Add new order//
router.post("/addOrder", orderController.addOrder);

//Get all orders//
router.get("/getOrders", orderController.getAllOrders);

//Get order by productID//
router.get("/getOrderById", orderController.getOrderById);

//Get order by userID//
router.get("/getOrderByUserId", orderController.getOrderByUserId);


module.exports = router ;