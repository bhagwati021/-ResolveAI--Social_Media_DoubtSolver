const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, default: "Processing..." },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doubt", doubtSchema);
