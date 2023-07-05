import { NextFunction, Request, Response } from "express";
import { Schema, SchemaOptions } from "mongoose";

const Todo = require("../data/models/todo");

const token = process.env.TOKEN || "12345678";

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
        if(req.query.format === "json") {
            return res.json(res.locals.todos);
        } else {
        res.render("todos/index")
        }
    },
    filterUserTodos: async (req:any, res:Response, next:NextFunction) => {
        let currentUser = req.locals.currentUser
        if(currentUser) {
            let mappedTodos = res.locals.todos.map((todo:any) => {
                if(todo.user._id.equals(currentUser._id)){
                    return todo
                }
            })
            res.locals.todos = mappedTodos
            next()
        } else {
            next()
        }
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
    },


    respondJSON: (req:Request, res:Response) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },
    errorJSON: (error:Error, req:Request, res:Response, next:NextFunction) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Unknown Error."
            };
        }
        res.json(errorObject);
    }
    
}

