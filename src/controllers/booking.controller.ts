import { Request, Response } from "express"

import Booking from "@/models/Booking.model.js";
import PackageModel from "@/models/Package.model.js";
import ServicesModel from "@/models/Services.model.js";
import { bookingValidationSchema } from "@/validators/booking.validation.js";

export const addNewBooking = async (req: Request, res: Response) => {
    const parsedReqBody = bookingValidationSchema.safeParse(req.body);
    if (!parsedReqBody.success) {
        throw parsedReqBody.error;
    }

    const bookingData = parsedReqBody.data
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

}

export const getAllBookings = async (req: Request, res: Response) => {
    const { search = '' } = req.query
    const filter: Record<string, unknown> = {};

    if (search && typeof search === "string") {
        const regex = new RegExp(search, "i");
        filter.$or = [
            { name: { $regex: regex } },
            { phone: { $regex: regex } },
            { email: { $regex: regex } }
        ];
    }

    const bookings = await Booking.find(filter);
    res.status(200).json({
        success: true,
        data: bookings,
        message: "Bookings fetched successfully"
    });
} 