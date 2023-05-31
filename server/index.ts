import express, { Express, Request, Response } from 'express';
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hi from JS, TS, and express :))))))!');
});

app.listen('3001', () => {
  console.log('Listening to port 3001...');
});
