import { NextFunction, Request, Response } from "express";
import { constants } from "zlib";

const Expense = require("../data/models/expense"),

getExpenseParams = (body:any) => {
    return {
        title: body.title,
        amount: body.amount,
        paidBy: body.paidBy
    };
};


module.exports = {
    index: (req:Request, res:Response, next:NextFunction) => {
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
    indexView: (req:Request, res:Response) => {
        res.render("expense/index");
      },
    new: (req:Request,res:Response) => {
        res.render("expense/new");
    },
    create: (req:Request,res:Response, next:NextFunction) => {
        let expenseParams = getExpenseParams(req.body);
        Expense.create(expenseParams)
        .then((expense: any) => {
            res.locals.redirect = "/expense";
            res.locals.expense = expense;
            next();
        })
        .catch((error:Error) => {
            console.log(`Error saving expense: ${error.message}`);
            next(error);
        });
    },
    redirectView: (req:Request, res:Response, next:NextFunction) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req:Request, res:Response, next:NextFunction) => {
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
    showView: (req:Request, res:Response) => {
        res.render("expense/show");
    },
    edit: (req:Request, res:Response, next:NextFunction) => {
        let expenseId = req.params.id;
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
    update: async (req:Request, res:Response, next:NextFunction) => {
        const expenseId = req.params.id;
        const expenseParams = getExpenseParams(req.body);
        Expense.findByIdAndUpdate(expenseId, {
        $set: expenseParams
        })
        .then((expense: any) => {
            res.locals.redirect = `/expenses/`;
            res.locals.expense = expense;
            next();
        })
        .catch((error:Error) => {
            console.log(`Error updating expense by ID: ${error.message}`);
            next(error);
        });
    },
    delete: async (req: Request, res:Response, next:NextFunction) => {
        const expenseId = req.params.expenseId;
      Expense.findByIdAndRemove(expenseId)
      .then(() => {
        res.locals.redirect = "/expenses"
        next();
      })
    },
    sumExpenses: (req:Request, res:Response) => {
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
    }

    };
