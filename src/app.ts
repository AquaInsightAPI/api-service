import express , { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routes';
const app : Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRouter);

export default app;