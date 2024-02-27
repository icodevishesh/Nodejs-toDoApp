/* -------------------------------------------------------------------------------------------------------------- */
//we will use app.js to use middlewares
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const {config} = require('dotenv');
const app = express();
const userRouter = require('./routes/user.js');
const taskRouter = require('./routes/task.js');
const errorMiddleware = require('./middlewares/error.js');

config({
    path: "./data/config.env"
});

/* -------------------------------------------------------------------------------------------------------------- */

//Middleware to use
app.use(express.json());//always use it first 
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method:["GET","POST","PUT","DELETE"],
    Credential: true
}));

app.use('/api/v1/tasks',taskRouter);
app.use('/api/v1/users',userRouter);//we have added /users so we dont have to give /users routes again and again

//middleware for error handling
app.use(errorMiddleware);

/* -------------------------------------------------------------------------------------------------------------- */

module.exports = {app};