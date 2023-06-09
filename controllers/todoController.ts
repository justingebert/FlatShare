import { NextFunction, Request, Response } from "express";
import { Schema, SchemaOptions } from "mongoose";

const Todo = require("../data/models/todo");

const getTodoParams = (body:any) => {
    return {
        name: body.name,
        description: body.description,
        dueDate: body.dueDate,
        completed: body.completed,
        user: body.user
    }
}

module.exports = {	
    index: async (req:Request, res:Response, next:NextFunction) => {
        console.log("index")
        let todos = await Todo.find({})
            .then((todos:any) => {
                res.locals.todos = todos
                next()
            })
    },
    indexView: (req:Request, res:Response) => {
        res.render("todos/index")
    },
    create: async (req:Request, res:Response, next:NextFunction) => {
        let todo = {
            name: req.body.name,
        }
        Todo.create(todo)
            .then((todo:any) => {
                res.locals.redirect = "/todos"
                res.locals.todo = todo
                next()
            })
            .catch((error:Error) => {
                console.log(`Error saving todo: ${error.message}`);
                next(error);
              })
    },
    update: async (req:Request, res:Response, next:NextFunction) => {
        const todoId = req.params.id;
        const todoParams = getTodoParams(req.body);
        Todo.findByIdAndUpdate(todoId, {
            $set: todoParams
        })
        .then((todo:any) => {
            res.locals.redirect = "/todos"
            res.locals.todo = todo
            next();
        })
        .catch((error:Error) => {
            console.log(`Error updating todo by ID: ${error.message}`);
            next(error);
        });
    },
    delete: async (req:Request, res:Response, next:NextFunction) => {
        const todoId = req.params.id;
        Todo.findByIdAndRemove(todoId)
            .then(() => {
                res.locals.redirect = "/todos"
                next();
            })
            .catch((error:Error) => {
                console.log(`Error deleting todo by ID: ${error.message}`);
                next();
            })
    },
    redirectView: (req:Request, res:Response, next:NextFunction) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }       
}

