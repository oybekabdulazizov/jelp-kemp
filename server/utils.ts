import { NextFunction, Request, Response } from 'express';

export const asyncHandler =
  (func: any) => (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
