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
const method = require("method-override");
const connectFlash = require("connect-flash");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session"); 

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
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
router.use(connectFlash());

app.use("/", router);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(layouts)
app.use(express.static("public"));


//app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.get('/', homeController.showHome);

app.get("/users", userController.index, userController.indexView);
app.get("/users/new", userController.new);
app.post("/users/create", userController.create, userController.redirectView);
app.get("/users/:id", userController.show, userController.showView);

app.get("/shopping", shoppingController.index, shoppingController.indexView);
app.get("/shopping/new", shoppingController.new);
app.post("/shopping/create", shoppingController.create, shoppingController.redirectView);
app.get("/shopping/:id", shoppingController.show, shoppingController.showView);
app.get("/shopping/:id/edit", shoppingController.edit); 
app.post("/shopping/:id/update", shoppingController.update, shoppingController.redirectView);
app.get("/shopping/:id/delete", shoppingController.delete, shoppingController.redirectView);

//app.get("/todos", homeController.showTodos);
app.get("/chat", (req:Request, res:Response,) => {
    res.render("chat")
    }
);


/*
app.get("/shopping", shoppingController.getAllShopping);
app.post("/shopping", shoppingController.saveShopping);
*/

app.get("/todos", todoController.index, todoController.indexView);
app.post("/todos", todoController.create, todoController.redirectView);

const methodOverride = require("method-override");
router.use(methodOverride("_method", {
methods: ["POST", "GET"]
}));

router.get("/expenses",expensesController.index, expensesController.indexView);
router.get("/expenses/new", expensesController.new);
router.post("/expenses/create", expensesController.create, expensesController.redirectView);
router.get("/expenses/:id/edit", expensesController.edit);
router.put("/expenses/:id/update", expensesController.update, expensesController.redirectView);
router.get("/expenses/:id", expensesController.show, expensesController.showView);
router.delete("/expenses/:id/delete", expensesController.delete, expensesController.redirectView);

app.get("/documents", documentsController.getAllDocuments);
app.post("/documents", documentsController.saveDocuments);


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(3000, () => {
    console.log('server started');
    }
);
