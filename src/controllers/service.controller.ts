import { Request, Response } from 'express';

import ServicesModel from '../models/Services.model.js';

export const getAllServices = async (req: Request, res: Response) => {
  const services = await ServicesModel.find();
  res.status(200).json({
    success: true,
    data: services,
    message: 'Services fetched successfully',
  });
};
