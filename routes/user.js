const express = require('express');
const { User } = require('../models/user.js');
const {getMyProfile, register, login, logout} = require('../controller/user.js');
const {isAuthenticated} = require('../middlewares/auth.js');
const router = express.Router();

router.use(express.json());  

//getting user details 
router.get('/me',isAuthenticated ,getMyProfile);

router.get('/logout', logout);

//login existing users
router.post('/login', login);

 //create a new user
router.post('/new', register);

//export default router;
module.exports = router;