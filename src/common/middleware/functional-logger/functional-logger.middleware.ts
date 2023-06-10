import { NextFunction } from 'express';

export function FunctionalLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Hello World from functional logger');
  next();
}
