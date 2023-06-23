import express from 'express';
import { Request, Response,} from 'express';

const app = express();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose").default;
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const expressValidator = require("express-validator");
const passport = require("passport");

const errorController = require("./controllers/errorController");
const homeController = require('./controllers/homeController');
const todoController = require('./controllers/todoController');
const shoppingController = require('./controllers/shoppingController');
const userController = require('./controllers/userController');
const documentsController = require('./controllers/documentsController');
const expensesController = require("./controllers/expensesController");

const User = require("./data/models/user");

const router = express.Router();

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


app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(connectFlash());
app.use("/", router);

app.use(layouts)
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret_passcode"));
app.use(expressSession({
    secret: "secret_passcode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req:any, res:Response, next:Function) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});


app.use(expressValidator());

//app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.get('/', homeController.showHome);

app.get("/users", userController.index, userController.indexView);

app.get("/users/new", userController.new);
app.post("/users/create", userController.validate ,userController.create, userController.redirectView);

app.get("/users/login", userController.login);
app.post("/users/login", userController.authenticate);

app.get("/user/:id", userController.show, userController.showView);


app.get("/shopping", shoppingController.index, shoppingController.indexView);
app.get("/shopping/new", shoppingController.new);
app.post("/shopping/create", shoppingController.create, shoppingController.redirectView);
app.get("/shopping/:id", shoppingController.show, shoppingController.showView);
app.get("/shopping/:id/edit", shoppingController.edit); 
app.post("/shopping/:id/update", shoppingController.update, shoppingController.redirectView);
app.get("/shopping/:id/delete", shoppingController.delete, shoppingController.redirectView);

app.get("/documents", documentsController.index, documentsController.indexView);
app.get("/documents/new", documentsController.new);
app.post("/documents/create", documentsController.create, documentsController.redirectView);
app.put("/documents/:id/update", documentsController.update, documentsController.redirectView);
app.get("/documents/:id", documentsController.show, documentsController.showView);
app.delete("/documents/:id/delete", documentsController.delete, documentsController.redirectView);

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

/*
app.get("/documents", documentsController.getAllDocuments);
app.post("/documents", documentsController.saveDocuments);
*/

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(3000, () => {
    console.log('server started');
    }
);
