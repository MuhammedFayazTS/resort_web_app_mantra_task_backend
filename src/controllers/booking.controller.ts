import { Request, Response } from "express"
import z, { ZodError } from "zod";

import Booking from "@/models/Booking.model.js";
import PackageModel from "@/models/Package.model.js";
import ServicesModel from "@/models/Services.model.js";
import { bookingValidationSchema } from "@/validators/booking.validation.js";

export const addNewBooking = async (req: Request, res: Response) => {
    try {
        const bookingData = bookingValidationSchema.parse(req.body);
        const packageId = bookingData.packageId;
        const serviceIds = bookingData.serviceIds;

        const packageDetails = await PackageModel.findById(packageId).select("_id title services").exec();;

        if (!packageDetails) {
            throw new Error("Invalid package ID");
        }

        const packageType = {
            packageId,
            title: packageDetails.title
        }

        Object.assign(bookingData, { packageType });

        const servicesFromPackage = packageDetails.services;

        let serviceSIdForFetching = serviceIds ?? [];
        // check if package has services
        // TODO:  add the service ids from the frontend as well
        if (servicesFromPackage.length > 0) {
            serviceSIdForFetching =
                servicesFromPackage.length > 0 ? servicesFromPackage.map(service => service.toString()) : [];
        }

        const servicesDetails = await ServicesModel.find({
            _id: { $in: serviceSIdForFetching }
        }).select("_id title").exec();

        const services = servicesDetails.length > 0 ? servicesDetails.map(service => ({
            serviceId: service._id,
            title: service.title
        })) : [];

        Object.assign(bookingData, { services })

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