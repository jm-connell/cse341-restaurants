import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err.stack);

  if (err instanceof mongoose.Error) {
    // Handle Mongoose errors
    res.status(400).json({ message: err.message });
  }

  // Handle other errors
  res.status(500).json({ message: 'Internal Server Error' });
}
