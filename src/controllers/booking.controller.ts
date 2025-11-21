import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { HTTPSTATUS } from '../constants/httpStatus.js';
import BookingModel from '../models/Booking.model.js';
import Booking, { BOOKING_STATUS } from '../models/Booking.model.js';
import PackageModel from '../models/Package.model.js';
import ServicesModel from '../models/Services.model.js';
import {
  bookingValidationSchema,
  bookingValidationSchemaForCheckedOut,
  bookingValidationSchemaForCheckIn,
} from '../validators/booking.validation.js';

export const addNewBooking = async (req: Request, res: Response) => {
  const parsedReqBody = bookingValidationSchema.safeParse(req.body);
  if (!parsedReqBody.success) {
    throw parsedReqBody.error;
  }

  const bookingData = parsedReqBody.data;
  const packageId = bookingData.packageId;
  const serviceIds = bookingData.serviceIds;

  const packageDetails = await PackageModel.findById(packageId)
    .select('_id title services')
    .exec();

  if (!packageDetails) {
    throw new Error('Invalid package ID');
  }

  const packageType = {
    packageId,
    title: packageDetails.title,
  };

  Object.assign(bookingData, { packageType });

  const servicesFromPackage = packageDetails.services;

  let serviceSIdForFetching = serviceIds ?? [];
  // check if package has services
  // TODO:  add the service ids from the frontend as well
  if (servicesFromPackage.length > 0) {
    serviceSIdForFetching =
      servicesFromPackage.length > 0
        ? servicesFromPackage.map((service) => service.toString())
        : [];
  }

  const servicesDetails = await ServicesModel.find({
    _id: { $in: serviceSIdForFetching },
  })
    .select('_id title')
    .exec();

  const services =
    servicesDetails.length > 0
      ? servicesDetails.map((service) => ({
          serviceId: service._id,
          title: service.title,
        }))
      : [];

  Object.assign(bookingData, { services });

  const newBooking = await Booking.create(bookingData);
  res.status(HTTPSTATUS.CREATED).json({
    success: true,
    data: newBooking,
    message: 'Booking created successfully',
  });
};

export const getAllBookings = async (req: Request, res: Response) => {
  const { search = '', status } = req.query;
  const filter: Record<string, unknown> = {};

  if (search && typeof search === 'string') {
    const regex = new RegExp(search, 'i');
    filter.$or = [
      { name: { $regex: regex } },
      { phone: { $regex: regex } },
      { email: { $regex: regex } },
    ];
  }

  if (status) filter.status = status;

  const [bookings, count] = await Promise.all([
    Booking.find(filter),
    Booking.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: bookings,
    count,
    message: 'Bookings fetched successfully',
  });
};

export const getBookingById = async (bookingId: string) => {
  if (!bookingId || !isValidObjectId(bookingId))
    throw new Error('Invalid Booking Id');
  const booking = await BookingModel.findById(bookingId);
  if (!booking) throw new Error('Booking Not Found');

  return booking;
};

export const addCheckIn = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;
  const { actualCheckInDate } = bookingValidationSchemaForCheckIn.parse(
    req.body,
  );
  const booking = await getBookingById(bookingId);
  if (booking.status !== BOOKING_STATUS.BOOKED)
    throw new Error('Check In is for booking only');
  booking.status = BOOKING_STATUS.CHECKED_IN;
  booking.actualCheckInDate = actualCheckInDate;
  await booking.save();
  res.status(HTTPSTATUS.OK).json({
    success: true,
    message: 'Checked in successfully',
  });
};

export const addCheckOut = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;
  const { actualCheckOutDate } = bookingValidationSchemaForCheckedOut.parse(
    req.body,
  );
  const booking = await getBookingById(bookingId);
  if (booking.status !== BOOKING_STATUS.CHECKED_IN)
    throw new Error('Check In is for Checked In transaction only');
  booking.status = BOOKING_STATUS.CHECKED_OUT;
  booking.actualCheckOutDate = actualCheckOutDate;
  await booking.save();
  res.status(HTTPSTATUS.OK).json({
    success: true,
    message: 'Checked out successfully',
  });
};

export const cancelBooking = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;
  const booking = await getBookingById(bookingId);
  if (booking.status !== BOOKING_STATUS.BOOKED)
    throw new Error('Cancellation is allowed for booking only');
  booking.status = BOOKING_STATUS.CANCELLED;
  await booking.save();
  res.status(HTTPSTATUS.OK).json({
    success: true,
    message: 'Booking cancelled successfully',
  });
};
