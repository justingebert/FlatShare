import express from 'express';
import { Request, Response,} from 'express';
const homeController = require('./controllers/homeController');


const app = express();
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req:Request, res:Response) => {
    res.send('FlatShare');
    }
);

app.get("/todos", homeController.showTodos)


app.listen(3000, () => {
    console.log('server started');
    }
);

























