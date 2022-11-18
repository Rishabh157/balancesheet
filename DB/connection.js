const mongoose = require("mongoose");

const connectDb = async () => {

    try {
        await mongoose.connect("mongodb+srv://Rahul:SklvMYPQ8OjA7EYs@cluster0.3z86cw7.mongodb.net/BalanceSheetR")
        console.log("Database Connected")
    } catch (er) {
        console.log("not connected to the database")
    }
}

module.exports = connectDb;   
