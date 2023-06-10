import { NextFunction } from "express"; 

const Expense = require("../data/models/expense");

module.exports = {
    index: (req:any, res:any, next:any) => {
        Expense.find()
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
    create: (req:any,res:any, next:any) => {
        let expenseParams = {
            title: req.body.title,
            amount: req.body.amount,
            paidBy: req.body.paidBy
        };
    Expense.create(expenseParams)
        .then((expense: any) => {
            res.locals.redirect = "/expenses";
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
        .then((expense: any) => {
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
        let expenseId = req.params.expenseid;
        Expense.findById(expenseId)
        .then((expense: any) => {
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
        let expenseId = req.params.id,
        expenseParams = {
            title: req.body.title,
            amount: req.body.amount,
            paidBy: req.body.paydBy
        };
        Expense.findByIdAndUpdate(expenseId, {
        $set: expenseParams
        })
        .then((expense: any) => {
            res.locals.redirect = `/expense/${expenseId}`;
            res.locals.expense = expense;
            next();
        })
        .catch((error:Error) => {
            console.log(`Error updating expense by ID: ${error.message}`);
            next(error);
        });
    },
    delete: (res:any, req: any, next: any) => {
        let expenseId = req.params.id;
        Expense.findByIdAndRemove(expenseId)
        .then(() => {    
            res.locals.redirect = "/expense";
            next();
        })
        .catch((error:Error) => {
            console.log(`Error deleting user by ID: ${error.message}`);
            next();
        });
    },

    sumExpenses: (req:any, res:any) => {
        const userId = req.params.userId;

        Expense.find({ paidBy: userId })
        .then((expenses: any[]) => {
          const totalAmount = expenses.reduce((sum, expense) => {
            return sum + expense.amount;
          }, 0);
          res.status(200).json({ totalAmount });
        })
        .catch((error: { message: any; }) => {
          console.error(`Error fetching expenses for user ${userId}: ${error.message}`);
          res.status(500).json({ error: `Error fetching expenses for user ${userId}` });
        });
    },

    };
