import express, {Request, Response} from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 4000;

app.use(express.static('../client'));
app.use(express.json({limit: '2mb'}));

app.listen(port, ()=> console.log(`running on port ${port}`));

app.post('/weather', async(req:Request, res:Response) => {
    console.log('request received!');
    const data = req.body;
    res.send(data);
})