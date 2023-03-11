const express = require('express');
const http = require('http')
const app = express();
require('dotenv').config();
port = process.env.PORT || 5000;
app.use(express.json());
const server = http.createServer(app);
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

//Books path//
const bookRoute = require('./route/bookRoute');
//Student path//
const studentRoute = require("./route/studentRoute");
//Book Assign path//
const assignRoute = require("./route/assignRoute");

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Server is succesfully connected"))
.catch((err)=>console.log("Connection failed"));

app.use("/Books",bookRoute);
app.use("/student", studentRoute);
app.use("/assign", assignRoute);

server.listen(port,()=>{
    console.log(`The server is running on port no ${port}`);
})