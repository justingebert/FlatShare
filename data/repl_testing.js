const mongoose = require("mongoose");
const User = require("./models/user");
const Todo = require("./models/todo");

let testUser, testTodo;

mongoose.Promise = global.Promise;
