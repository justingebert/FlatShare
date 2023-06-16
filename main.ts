import express from 'express';
import { Request, Response,} from 'express';
const homeController = require('./controllers/homeController');
const todoController = require('./controllers/todoController');
const shoppingController = require('./controllers/shoppingController');
const userController = require('./controllers/userController');
const documentsController = require('./controllers/documentsController');
const app = express();
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");
const expensesController = require("./controllers/expensesController");
const mongoose = require("mongoose").default;
//const Shopping = require("./models/shopping");  

mongoose.Promise= global.Promise
mongoose.connect(
    "mongodb://localhost:27017/flatshare", 
    {useNewUrlParser: true,}
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
})

const router = express.Router();
app.use("/", router);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(layouts)
app.use(express.static("public"));

//app.get('/', homeController.showHome);

app.get("/users", userController.index, userController.indexView);
app.get("/users/new", userController.new);
app.post("/users/create", userController.create, userController.redirectView);
app.get("/users/:id", userController.show, userController.showView);

//app.get("/todos", homeController.showTodos);
app.get("/chat", (req:Request, res:Response,) => {
    res.render("chat")
    }
);


app.get("/shopping", shoppingController.getAllShopping);
app.post("/shopping", shoppingController.saveShopping);

app.get("/todos", todoController.index, todoController.indexView);
app.post("/todos", todoController.create, todoController.redirectView);

app.get("/expenses/new", expensesController.new);
app.post("/expenses/create", expensesController.create, expensesController.redirectView);
app.get("/expenses/:id/edit", expensesController.edit);
app.put("/expenses/:id/update", expensesController.update, expensesController.redirectView);
app.get("/expenses/:id", expensesController.show, expensesController.showView);
app.delete("/expenses/:id/delete", expensesController.delete, expensesController.redirectView);

app.get("/documents", documentsController.getAllDocuments);
app.post("/documents", documentsController.saveDocuments);


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(3000, () => {
    console.log('server started');
    }
);
