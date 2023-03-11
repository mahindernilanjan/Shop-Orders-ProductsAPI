const Student = require('../model/studentModel')
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; 
        console.log(token);
        decoded = jwt.verify(token, process.env.SEC_KEY);
        console.log(decoded);
        req.studentData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({err,message:'Authorization failed'});
    }
}

module.exports = verifyToken;