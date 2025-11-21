import mongoose from "mongoose";

export enum BOOKING_STATUS {
    BOOKED = "booked",
    CANCELLED = "cancelled",
    CHECKED_IN = "checkedIn",
    CHECKED_OUT = "checkedOut",
}

const BookingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, index: true },
        email: { type: String, required: true, index: true },
        phone: { type: String, required: true, index: true },
        address: { type: String, required: true },

        checkInDate: { type: Date, required: true },
        actualCheckInDate: { type: Date },
        checkOutDate: { type: Date, required: true },
        actualCheckOutDate: { type: Date },

        adults: { type: Number, required: true },
        children: { type: Number, required: true },

        packageType: {
            packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
            title: { type: String, required: true }
        },

        services: [
            {
                serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
                title: { type: String }
            }
        ],

        status: { type: String, enum: [BOOKING_STATUS.BOOKED, BOOKING_STATUS.CHECKED_IN, BOOKING_STATUS.CHECKED_OUT, BOOKING_STATUS.CANCELLED], default: BOOKING_STATUS.BOOKED },

        specialRequest: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
