//Now we will use server.js to connect to the database and server
const {app} = require('./app.js');
const {connectDB} = require('./data/data.js');

/* -------------------------------------------------------------------------------------------------------------- */

connectDB();

/* -------------------------------------------------------------------------------------------------------------- */

app.listen(process.env.port, ()=>{
    console.log(`conneted to http://localhost:${process.env.port} in ${process.env.NODE_ENV} mode`);
})