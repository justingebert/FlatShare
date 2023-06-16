import { Int32 } from "mongodb";
const mongoose = require("mongoose"),
//const User = require("./user")
{ Schema } = mongoose;

var expenseSchema = new Schema({
title: {
    type: String,
    required:true
},
amount: {
    type:Number,
    required: true
},
paidBy: {
    type: String,
    required: true
}
});

/*expenseSchema.method.sumUpExpenses = function() {
    return this.model("Expense")
    .find({paidBy: this.paidBy})
    .exec();
};*/

//users:[{type: mongoose.Schema.Types.ObjectId, ref: "User"}]


module.exports = mongoose.model("Expense", expenseSchema);


