import { Int32 } from "mongodb";
const mongoose = require("mongoose");
const expenseSchema = mongoose.Schema({
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

expenseSchema.method.sumUpExpenses = function() {
    return this.model("Expense")
    .find({paidBy: this.paidBy})
    .exec();
};



module.exports = mongoose.model("Expense", expenseSchema);


