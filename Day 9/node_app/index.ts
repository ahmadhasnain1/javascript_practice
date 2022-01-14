import express, {Application, Request, Response, NextFunction} from "express";
import userRoutes from './routes/user';
const app : Application  = express();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
});

app.use('/user',userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
}); 