// Import the mongoose library
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        select: false, // This prevents the password from being returned in query results
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const User = mongoose.model("User", schema);

module.exports = { User };
