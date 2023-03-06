const productController = require("../controller/productController"); //We require controller for routing//
const Product = require("../model/productModel") //Model path required//
const router = require('express').Router(); 

//For adding new collcetion i.e. new product//
router.post("/addProduct",productController.addProduct);

//For getting all data//
router.get("/getAllProducts",productController.getAllProducts);

//To get individual data//
router.get("/getProduct",productController.getProduct);

//To update data//
router.patch("/updateProduct",productController.updateProduct)

module.exports = router;