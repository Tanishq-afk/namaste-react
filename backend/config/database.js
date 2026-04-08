const mongoose = require("mongoose");

const connectDB = async function() {
    return mongoose.connect(process.env.DB_CONNECTION_SECRET);
}

module.exports = connectDB;