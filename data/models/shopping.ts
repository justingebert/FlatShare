
import { Int32 } from "mongodb";

const mongoose = require("mongoose");

const shoppingSchema = new mongoose.Schema({
    item: String,
    quantity: Number,

});

module.exports = mongoose.model("Shopping", shoppingSchema);

