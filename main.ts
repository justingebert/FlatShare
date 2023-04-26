import express from 'express';
import { Request, Response,} from 'express';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req:Request, res:Response) => {
    res.send('FlatShare');
    }
);


app.listen(3000, () => {
    console.log('server started');
    }
);

























