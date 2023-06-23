import { NextFunction } from "express"; 

const Expense = require("../data/models/expense");

module.exports = {
    index: (req:any, res:any, next:any) => {
        Expense.find({})
        .then((expenses:any) => {
            res.locals.expense = expenses;
            next();
        })
        .catch((error:Error) => {
            console.log(`Error fetching subscribers: ${error.message}`);
            next(error);
          });
    },
    indexView: (req:any, res:any) => {
        res.render("expense/index");
      },
    new: (req:any,res:any) => {
        res.render("expense/new");
    },
    create: async (req:any,res:any, next:any) => {
        let expenseParams = {
            title: req.body.title,
            amount: req.body.amount,
            paidBy: req.body.paidBy
        };
    Expense.create(expenseParams)
        .then((expense:any) => {
            res.locals.redirect = "/expense";
            res.locals.expense = expense;
            next();
        })
        .catch((error:Error) => {
            console.log(`Error saving expense: ${error.message}`);
            next(error);
        });
    },
    redirectView: (req:any, res:any, next:any) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req:any, res:any, next:any) => {
        let expenseId = req.params.id;
        Expense.findById(expenseId)
        .then((expense:any) => {
            res.locals.expense = expense;
            next();
        })
        .catch((error:Error) => {
            console.log(`Error fetching expense by ID: ${error.message}`);
            next(error);
        });
    },
    showView: (req:any, res:any) => {
        res.render("expense/show");
    },
    edit: (req:any, res:any, next:any) => {
        console.log("update started");
        const expenseId = req.params.id;
        Expense.findById(expenseId)
        .then((expense:any) => {
            res.render("expense/edit", {
            expense: expense
            });
        })
        .catch((error:Error) => {
            console.log(`Error fetching expense by ID: ${error.message}`);
            next(error);
        });
    },
    update: (req:any, res:any, next:any) => {
        let expenseId = req.params.id;
        let expenseParams = {
            title: req.body.title,
            amount: req.body.amount,
            paidBy: req.body.paydBy
        };
        Expense.findByIdAndUpdate(expenseId, {
        $set: expenseParams
        })
        .then((expense:any) => {
            res.locals.redirect = `/expenses`;
            res.locals.expense = expense;
            next();
        })
        .catch((error:Error) => {
            console.log(`Error updating expense by ID: ${error.message}`);
            next(error);
        });
    },
    delete: ( req: any, res:any, next: any) => {
        const expenseId = req.params.id;
        Expense.findByIdAndRemove(expenseId)
        .then(() => {    
            res.locals.redirect = "/expenses";
            next();
        })
        .catch((error:Error) => {
            console.log(`Error deleting user by ID: ${error.message}`);
            next();
        });
    }

    };
