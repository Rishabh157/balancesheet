const mongoose = require("mongoose");

const RagisterSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Ragister", RagisterSchema);
