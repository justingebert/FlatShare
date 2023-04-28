import { Request, Response } from "express"

let todos = [
    { id: 1, name: "Learn TypeScript", completed: false },
    { id: 2, name: "Learn Node", completed: true },
    { id: 3, name: "Learn EJS", completed: false },
    { id: 4, name: "Learn Git", completed: false },
    { id: 5, name: "Learn Express", completed: false },
    { id: 6, name: "Learn MongoDB", completed: false },
]

exports.showTodos = (req:Request, res:Response) => {
    res.render("List", { todos: todos })
}