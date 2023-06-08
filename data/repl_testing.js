const mongoose = require("mongoose");
const User = require("./models/user");
const Todo = require("./models/todo");

// connect to mongodb


let testUser, testTodo;

mongoose.Promise = global.Promise;
mongoose.connect(
    "mongodb://localhost:27017/flatshare", 
    {useNewUrlParser: true,}
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
})


// test creating a user with a todo
User.create({
    name:{
        first: "test",
        last: "user",
    },
    password: "testpassword",
    email: "test2@test.com",
    todos: []
})
.then(user => {
    testUser = user;
    return Todo.create({
        name: "test todo",
        user: user._id
    })
})
.then(todo => {
    testTodo = todo;
    testUser.todos.push(todo);
    return testUser.save();
})
.then(() => {
    console.log("test user and todo created");
    console.log(testUser);
})
.catch(err => {
    console.log(err);
})

