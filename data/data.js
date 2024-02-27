const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017",{
    dbName: 'newUsers'
}).then(()=>{
    console.log("successfully connected to database");
}).catch((err)=>{
    console.log(err);
})}

module.exports = {connectDB};
