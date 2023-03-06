const express = require('express');
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
const http = require("http");
const server = http.createServer(app)
require('dotenv').config();
port = process.env.PORT || 5000;
app.use(express.json());
const verifyToken = require("./route/auth");

//Add Path of route//
const productRoute = require("./route/productRoute");
const userRoute = require("./route/userRoute");
const orderRoute = require("./route/orderRoute");

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connection succesful"))
.catch((err) => console.log("Connection failed"))





app.use("/products",productRoute); //Product Route//
app.use("/user",userRoute); //User Route//
app.use("/order",orderRoute); //Order Route//

server.listen(port, () => {
    console.log(`server successfully connected to port no ${port}`)

});