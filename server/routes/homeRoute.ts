import express, { NextFunction, Request, Response } from 'express';

const homeRouter = express.Router();

homeRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Welcome to JelpKemp!');
});

export default homeRouter;
