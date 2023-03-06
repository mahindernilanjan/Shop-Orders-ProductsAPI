const express = require('express');
const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const User = require("../model/userModel")

//Add Order//
exports.addOrder = async(req,res)=>{
    try{
            const addNewOrder = new Order({
                userId : req.body.userId,
                productId : req.body.productId,
                orderCost:req.body.orderCost
            })
            const savedOrder = await addNewOrder.save();
            res.status(201).json({savedOrder, message:"Product ordered successfully"})
    } catch(err){
        res.status(500).json({err, message:"Failed to order.."})
        console.log("14",err);
    }
}

//Get All Orders//
exports.getAllOrders = async(req,res) =>{
    try{
        //1.//
        //const getOrders = await Order.find().populate({path :'userId', select : 'username'});//We can populate
        // userId field with selective data by using path and select. We choose what field we want to show i.e. 
        //populate. If we wantt to populate multiple fields with the same path then only the last one will take
        //effect.

        //2.//
        //But if we want to populate all fields then we use simply populate//
        //const getOrders = await Order.find().populate('userId');
        
        //3.//
        const getOrders = await Order.find().populate('userId').populate({path:'productId', select:'productname'});

        res.status(201).json({getOrders, message:"Orders successfully fetched"})
    } catch(err){
        res.status(500).json(err);
    }
}


//Get orders data by productID using lookup (product)//
exports.getOrderById = async(req,res) =>{
    try{
        const getOrder = await Order.aggregate([
            {
                $lookup :{
                    from : "products", //The table from which we want to join to our main table i.e. Order table//
                    localField: "productId", //Field name in Order table i.e. the source table//
                    foreignField:"_id", //Same field name in Product table//
                    as : "data"
                }

            },
            {
                $unwind : "$data" //Unwind needed for destructuring and break the array//
            },
            {
                $project :{
                    "_id": 1,
                    "userId": 1,
                    "productId":1,
                    //"data": 1 
                    "ProductName":"$data.productname", //By doing this we only show specific field//
                    "SerialNo":"$data.serialno"
                    // "data.productname":1,
                    // "data.serialno":1
                    
                    
                }
            }
            
        ])

        if (getOrder) {
            res.status(201).json(getOrder);
        } else {
            res.status(404).json("Order not found")
        }
    } catch(err){
        res.status(500).json(err)
    }
}


////Get orders data by userID using lookup (User)//
exports.getOrderByUserId = async(req,res) =>{
    try{
        const getOrderByuser = await Order.aggregate([
            {
                $lookup :{
                    from : "users", //The table from which we want to join to our main table i.e. Order table//
                    localField: "userId", //Field name in Order table i.e. the source table//
                    foreignField:"_id", //Same field name in Product table//
                    as : "data"
                }

            },
            {
                $unwind : "$data" //Unwind needed for destructuring and break the array//
            },
            {
                $project :{
                    "_id": 1,
                    "userId": 1,
                    "productId":1,
                    //"data": 1 
                    "UserName":"$data.username", //By doing this we only show specific field//
                    "Email":"$data.email"
                    
                    
                }
            }
            
        ])

        if (getOrderByuser) {
            res.status(201).json(getOrderByuser);
        } else {
            res.status(404).json("Order not found")
        }
    } catch(err){
        res.status(500).json(err)
        console.log("132",err)
    }
}
