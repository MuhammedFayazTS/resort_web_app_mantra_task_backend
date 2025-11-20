import { Request, Response } from "express";

import ServicesModel from "@/models/Services.model.js";

export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await ServicesModel.find();
        return res.status(200).json({
            success: true,
            data: services,
            message: "Services fetched successfully"
        });
    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Error occurred while fetching services"
        });
    }
}