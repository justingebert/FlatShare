
import { Int32 } from "mongodb";

const mongoose = require("mongoose");

const shoppingSchema = mongoose.Schema({
    item: {
        type: String, 
        required: true
    }, 
    quantity: {
        type: Number,
        required: true, 
        min: [1, "If it's on the list you must at least need one!"]
    }
});

/*
shoppingSchema.methods.getInfo = function () {
    return ... ;
}
*/

/*
const shoppingSchema = new mongoose.Schema({
    item: String,
    quantity: Number,
});
*/


module.exports = mongoose.model("Shopping", shoppingSchema);

