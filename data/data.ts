let todos = [
    { id: 1, name: "Learn TypeScript", completed: false },
    { id: 2, name: "Learn Node", completed: true },
    { id: 3, name: "Learn EJS", completed: false },
    { id: 4, name: "Learn Git", completed: false },
    { id: 5, name: "Learn Express", completed: false },
    { id: 6, name: "Learn MongoDB", completed: false },
]

let rooms = [
    { name: "Room 1", assigne: "John Doe", completed: false },
    { name: "Room 2", assigne: "John Doe", completed: false },
    { name: "Room 3", assigne: "John Doe", completed: false },
]

let shoppingList = [
    { name: "Milk", completed: false },
    { name: "Eggs", completed: false },
    { name: "Bread", completed: false },
    { name: "Butter", completed: false },
    { name: "Cheese", completed: false },
    { name: "Ham", completed: false },
]

let people = [
    { name: "John Doe", status: false },
    { name: "Jane Doe", status: false },
    { name: "John Smith", status: false }
]

let events = [
    { name: "Event 1", date: "2021-01-01", completed: false },
    { name: "Event 2", date: "2021-01-02", completed: false },
    { name: "Event 3", date: "2021-01-03", completed: false },
    { name: "Event 4", date: "2021-01-04", completed: false }
]

let bills = {
    'Overall': 100,
    'owe': [
        { name: "John Doe", amount: 50 },
        { name: "Jane Doe", amount: -50 },
        ]
}

let tasks = [
    { name: "Task 1", date: "2021-01-01", completed: false },
    { name: "Task 2", date: "2021-01-02", completed: false },
    { name: "Task 3", date: "2021-01-03", completed: false },
]

let expenses = [
    { title: "weekly shopping", amount: "23", paidBy: "Nora" },
    { title: "all we need", amount: "210", paidBy: "Jacob" }
]


export {
    todos,
    rooms,
    shoppingList,
    people,
    events,
    bills,
    tasks,
    expenses
}