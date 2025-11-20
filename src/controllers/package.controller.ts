import { Request, Response } from "express";

import PackageModel from "@/models/Package.model.js";

export const getAllPackages = async (req: Request, res: Response) => {
    try {
        const packages = await PackageModel.find();
        return res.status(200).json({
            success: true,
            data: packages,
            message: "Packages fetched successfully"
        });
    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Error occurred while fetching packages"
        });
    }
}