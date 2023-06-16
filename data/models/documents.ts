
import { Int32 } from "mongodb";

const mongoose = require("mongoose");

const documentsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    path: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Documents", documentsSchema);