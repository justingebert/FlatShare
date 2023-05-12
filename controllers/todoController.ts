import { NextFunction } from "express";

const Todo = require("../data/models/todo");

exports.getAllTodos = (req:any, res:any) => {
    Todo.find({})
        .then((todos:any) => {
            //console.log(todos)
            return res.render("todos", {
                todos: todos
              });
        })
        .catch((error:Error) => {
        console.log(`Error fetching todos: ${error.message}`);

    });
};

exports.saveTodo = async (req:any, res:any) => {
    let newTodo = await Todo.create({
        name: req.body.name,
        completed: false
    });

    console.log(newTodo);
    res.redirect("/todos");

};

