import express from 'express';
import { Request, Response,} from 'express';


const app = express();
const errorController = require("./controllers/errorController");

app.set("view engine", "ejs"); 
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.get('/', (req:Request, res:Response) => {
    res.send('FlatShare');
    }
);


app.listen(3000, () => {
    console.log('server started');
    }
);



























