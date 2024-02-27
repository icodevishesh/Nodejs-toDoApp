const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017",{
    dbName: 'newUsers'
}).then((c)=>{
    console.log(`Database connection with ${c.connection.host}`);
}).catch((err)=>{
    console.log(err);
})}

module.exports = {connectDB};
