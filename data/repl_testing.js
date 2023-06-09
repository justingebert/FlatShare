const mongoose = require("mongoose");
const User = require("./models/user");
const Todo = require("./models/todo");
const Expense =require("./models/expense");

let testUser, testTodo, testExpense;

mongoose.Promise = global.Promise;
