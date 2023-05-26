import express from 'express';
import { Request, Response,} from 'express';
const homeController = require('./controllers/homeController');
const app = express();
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const expensesController = require("./controllers/expensesController");

mongoose.Promise= global.Promise
mongoose.connect(
    "mongodb://localhost:27017/flatshare", 
    {useNewUrlParser: true,}
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
})

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(layouts)
app.use(express.static("public"));

app.get("/expenses",expensesController.getAllExpenses);
app.get("/addexpenses", expensesController.getExpensesPage);
app.post("/saveexpenses", expensesController.saveExpense);

app.get("/todos", homeController.showTodos);
app.get("/chat", (req:Request, res:Response,) => {
    res.render("chat")
    }
);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(3000, () => {
    console.log('server started');
    }
);
