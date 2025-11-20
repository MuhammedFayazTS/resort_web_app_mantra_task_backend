import mongoose from "mongoose";

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

        status: { type: String, enum: ["booked", "checkedIn", "checkedOut", "cancelled"], default: "booked" },

        accommodation: { type: Boolean, default: false },
        adventureActivities: { type: Boolean, default: false },
        wellnessSpa: { type: Boolean, default: false },

        specialRequest: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
