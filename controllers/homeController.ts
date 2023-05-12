import { Request, Response } from "express"
import { todos, rooms, shoppingList, people, events, bills, tasks} from "../data/data"


exports.showHome = (req:Request, res:Response) => {
    res.render("index",{ 
            todos: todos,
            rooms: rooms,
            shoppingList: shoppingList,
            people: people,
            events: events,
            bills: bills,
            tasks: tasks
    })
}