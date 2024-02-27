const jwt = require('jsonwebtoken');

const createCookie = (user, res, message, statusCode=200)=>{
const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET); //it will generate a token 

res.status(statusCode).cookie("token", token, {
    httpOnly: true,
    maxage: 15*60*1000,//15min
    sameSite: process.env.NODE_ENV==="Development" ? "lax": "none",
    secure: process.env.NODE_ENV==="Development" ? false: true,
}).json({
    success: true,
    message
});
}

module.exports = {createCookie};