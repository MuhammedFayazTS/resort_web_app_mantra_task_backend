import { Request, Response } from "express"
import z, { ZodError } from "zod";

import Booking from "@/models/Booking.model.js";
import PackageModel from "@/models/Package.model.js";
import { bookingValidationSchema } from "@/validators/booking.validation.js";

export const addNewBooking = async (req: Request, res: Response) => {
    try {
        const bookingData = bookingValidationSchema.parse(req.body);
        const packageId = bookingData.packageId;

        const packageDetails = await PackageModel.findById(packageId);

        if (!packageDetails) {
            throw new Error("Invalid package ID");
        }

        const packageType = {
            packageId,
            title: packageDetails.title
        }

        Object.assign(bookingData, { packageType });

        const newBooking = await Booking.create(bookingData);
        res.status(201).json({
            success: true,
            data: newBooking,
            message: "Booking created successfully"
        });
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const errorMessage = z.prettifyError(error);
            return res.status(400).json({
                success: false,
                message: errorMessage || "Error occurred while creating booking"
            });
        }

        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Error occurred while creating booking"
        });
    }
}

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({
            success: true,
            data: bookings,
            message: "Bookings fetched successfully"
        });
    } catch (error: unknown) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Error occurred while creating booking"
        });
    }
}