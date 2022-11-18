const mongoose = require("mongoose");

const TxnSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    remark: String
})

module.exports = mongoose.model("/txn", TxnSchema)
