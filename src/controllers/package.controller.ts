import { Request, Response } from "express";

import PackageModel from "@/models/Package.model.js";

export const getAllPackages = async (req: Request, res: Response) => {
    const packages = await PackageModel.find();
    res.status(200).json({
        success: true,
        data: packages,
        message: "Packages fetched successfully"
    });
}