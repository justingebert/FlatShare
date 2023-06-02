import { NextFunction } from "express"; 

const Expense = require("../data/models/expense");


exports.getAllExpenses = (req:any, res:any) => {
    Expense.find({})
    .then((expenses:any) => {
        return res.render("expenses", {
            expenses:expenses
        });
    })
    .catch((error:Error) => {
        console.log(error.message);
    })
};

exports.saveExpense = async(req:any, res:any) => {
    let newExpense = await Expense.create({
        title: req.body.title,
        description: req.body.description,
        amount: req.body.amount,
        paidBy: req.body.paidBy
    });
    console.log(newExpense);
    res.redirect("/expenses")
};