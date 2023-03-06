//Middleware file creation for Verify token//
const jwt = require('jsonwebtoken');
const User = require("../model/userModel");

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log("6",token);
    let decoded
    try {
        const token = req.headers.authorization.split(" ")[1]; 
        console.log("6",token);
        decoded = jwt.verify(token, process.env.SEC_KEY);
        console.log("13",decoded);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({err,message:'Authentication failed'});
    }
}

module.exports = verifyToken;
