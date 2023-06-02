
import { Int32 } from "mongodb";

const mongoose = require("mongoose");

const documentsSchema = new mongoose.Schema({
    name: String,
    path: String,
});

module.exports = mongoose.model("Documents", documentsSchema);