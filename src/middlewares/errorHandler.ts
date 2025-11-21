import { HTTPSTATUS } from '../constants/httpStatus.js';
import { ErrorRequestHandler, Response } from 'express';
import { ZodError } from 'zod';

const formatZodError = (res: Response, error: ZodError) => {
  const formattedErrors = error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: 'Validation failed',
    errors: formattedErrors,
  });
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`Error occurred on PATH ${req.path}`, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Invalid JSON format, please check your request body',
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Something went wrong',
    error: error?.message ?? 'Unknown error occurred',
  });
};
