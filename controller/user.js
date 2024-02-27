const { User } = require('../models/user.js');
const { createCookie } = require('../utils/features.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { } = require('../app.js');

const login = async (req, res, next) => {
        try {
            const{email, password} = req.body;
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return next(new ErrorHandler('User not found',404));
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({
                success: false,
                message: 'Invalid email or password'
            });  
        }
        createCookie(user, res, `Welcome Back ${user.name}`, 200);
        } catch (error) {
            next(error);
        }
    }
        

/* -------------------------------------------------------------------------------------------------------------- */

const register = async(req, res) => {
    try{
    const{name, email, password} = req.body;
    let user = await User.findOne({email});

    if (user){
        return res.status(404).json({
            success: false,
            message: "user already exist"
        })
    }
    const hashesPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email, 
        password: hashesPassword
    });
    createCookie(user, res, "Registred successfully", 201);
    }catch(error){
      next(error);
    }
}

/* -------------------------------------------------------------------------------------------------------------- */

const getMyProfile = async(req, res) => {
    try{
        res.status(200).json({ success: true, user: req.user});
    }catch(error){
        next(error);
    }
}

const logout = async(req, res) => {
    try{
        res.status(200).cookie("token", "", {
            expires:new Date(Date.now()),
            sameSite: process.env.NODE_ENV==="Development" ? "lax": "none",
            secure: process.env.NODE_ENV==="Development" ? false: true,
        })
        .json({ success: true, user: req.user});
    }catch(error){
        next(error);
    }
}

//destructuring the object so we can access evry variables and properties
 module.exports = {
    register, 
    login,
    getMyProfile,
    logout
}; 



/* -------------------------------------------------------------------------------------------------------------- */

//  const updateUser = async(req, res) => {
//     //const {id} = req.query;//static
//     const {id} = req.params;
//     let users = await User.findById(id);

//     users = await User.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         useFindAndModify: false,
//         runValidators: true
//     })
 
//      res.status(200).json({
//          success: true,
//          message:"updated successfully",
//          users
//      })
//  }

//  const deleteUser = async(req, res) => {
   
//     try {
//         let users = await User.findById(req.params.id); // Finding the product by its ID
//         if (!users) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         await users.deleteOne(); // Removing the found product from the database
//         res.status(200).json({ success: true, message: "User id deleted successfully" }); // Sending a success response
//     } catch (error) {
//         console.error(error); // Logging error if there is any
//         res.status(500).json({ success: false, message: "Internal server error" }); // Sending internal server error response
//     }
//  }

