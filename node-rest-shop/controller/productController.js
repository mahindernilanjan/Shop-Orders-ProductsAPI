const express = require('express');
const Product = require('../model/productModel');
const app = express();
app.use(express());


//Add new collection i.e. add new product//
exports.addProduct = async (req,res)=>{
    try{
        const addNewProduct = new Product(req.body); //We write new data in postman now//
        const savedProduct =await  addNewProduct.save(); //We save the model//
        res.status(201).json(savedProduct); //We display the new created document in postman/
        

    }catch(err){
        res.status(400).json({
            message : "Not found"
        })
    }
}

//Get all data//
exports.getAllProducts = async (req, res) => {
    try {
        const getProducts = await Product.find();
        if (getProducts) {
            res.status(201).json(getProducts)
        } else {
            res.status(404).json("Products not found")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

//Get individual product// 
exports.getProduct = async (req,res)=>{
    try{
        const getProduct = await Product.findById({
            _id: req.query.id
        })
        res.status(201).json(getProduct)
    }catch(err){
        res.status(400).json(err)
        //console.log(err)
    }
} //In postman, under Params section, put id = shdgajs i.e. the id we want to find.//


//Update document//
exports.updateProduct = async (req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate({
            _id : req.query.id
        },
        {
            $set:{
                productname:req.body.productname,
                unitprice:req.body.unitprice
            }
        },
        {
            new : true
        }
        );
        res.status(201).json(updatedProduct);
    }catch(err){
        res.status(400).json(err)
    }
    
}


