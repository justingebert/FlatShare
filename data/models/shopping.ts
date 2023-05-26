
import { Int32 } from "mongodb";

const mongoose = require("mongoose");

const shoppingSchema = new mongoose.Schema({
    item: String,
    quantiy: Number,
    
});

module.exports = mongoose.model("Shopping", shoppingSchema);

